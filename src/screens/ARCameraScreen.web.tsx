import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import PressScale from "../components/PressScale";
import { bearingDegrees, distanceMeters } from "../geofencing/proximityTracker";
import { computeRouteGuidance } from "../geofencing/routeGuide";
import { notifyError, notifySuccess } from "../haptics";
import { identifyLandmark, type LandmarkResult } from "../landmark/identifyLandmark";
import type { RootStackParamList } from "../navigation/types";
import { selectCurrentWaypoint, useTourStore } from "../state/tourStore";
import { useTheme } from "../ThemeContext";

// Tuned in the ar-tour prototype against the real, unrigged penguin export —
// see ar-tour/README.md for how these were derived.
const MODEL_URL = "/models/penguin.glb";
const MODEL_SCALE = 0.28;
const STAND_OFF_M = 3.0;
const MODEL_YAW_OFFSET_DEG = 180;
const GUIDE_LINE_DISTANCE_M = 2.1;

const toRad = (deg: number) => (deg * Math.PI) / 180;

function normalizeAngle(deg: number): number {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

/** Standard deviceorientation-angles-to-quaternion conversion, compensated
 * for current screen rotation (portrait vs landscape). */
function deviceOrientationToQuaternion(alpha: number, beta: number, gamma: number, screenOrientRad: number) {
  const euler = new THREE.Euler(beta, alpha, -gamma, "YXZ");
  const q = new THREE.Quaternion().setFromEuler(euler);
  const worldTransform = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // -PI/2 around X
  q.multiply(worldTransform);
  q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -screenOrientRad));
  return q;
}

function computeGroundOffset(object3d: THREE.Object3D): number {
  const box = new THREE.Box3().setFromObject(object3d);
  return Number.isFinite(box.min.y) ? -box.min.y : 0;
}

function buildPlaceholderPenguin(): THREE.Object3D {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.28, 0.6, 4, 12),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  );
  body.position.y = 0.5;
  const belly = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  belly.position.set(0, 0.45, 0.15);
  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(0.06, 0.16, 8),
    new THREE.MeshStandardMaterial({ color: 0xff9d33 })
  );
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.85, 0.26);
  group.add(body, belly, beak);
  return group;
}

function applyProceduralMotion(model: THREE.Object3D, walking: boolean, dt: number) {
  const t = ((model.userData.t as number) || 0) + dt;
  model.userData.t = t;
  if (walking) {
    model.rotation.z = Math.sin(t * 8) * 0.12;
    model.position.y += Math.abs(Math.sin(t * 8)) * 0.02;
  } else {
    model.rotation.z = Math.sin(t * 1.5) * 0.03;
  }
}

interface HudInfo {
  distanceText: string | null;
  turnText: string | null;
  turnAngle: number;
}

type Nav = NativeStackNavigationProp<RootStackParamList, "ARCamera">;
type RouteProp = { params: RootStackParamList["ARCamera"] };

/** Full-screen AR walking guide: the real camera feed with a 3D penguin
 * standing ~2.5m ahead (back to the user, like someone leading you) and a
 * ground guide-line ribbon pointing toward the current waypoint. Purely a
 * visual layer — it reads live position from the same useTourStore +
 * ProximityTracker that ActiveTourScreen already uses (which keeps running
 * underneath, unaffected, since react-navigation keeps it mounted while this
 * screen sits on top), and never touches narration playback. */
export default function ARCameraScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hud, setHud] = useState<HudInfo>({ distanceText: null, turnText: null, turnAngle: 0 });
  const [errorText, setErrorText] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<LandmarkResult[] | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [photoMessage, setPhotoMessage] = useState<string | null>(null);
  const photoMessageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPhotoMessage = (text: string) => {
    setPhotoMessage(text);
    if (photoMessageTimer.current) clearTimeout(photoMessageTimer.current);
    photoMessageTimer.current = setTimeout(() => setPhotoMessage(null), 3500);
  };

  // Captures a plain photo straight off the live camera feed — deliberately
  // NOT the AR overlay (penguin/ribbon), so it reads as a normal photo of
  // wherever you're standing rather than a screenshot of the app. There's no
  // browser API to silently write to the camera roll, so this hands the
  // image to the OS's native share sheet, whose "Save Image" action is what
  // actually performs that write — the standard, permitted way a web page
  // gets a photo into Photos. Falls back to a normal file download on
  // browsers without share-with-files support.
  const handleTakePhoto = async () => {
    const video = videoRef.current;
    if (!video || capturing) return;
    setCapturing(true);
    try {
      const composite = document.createElement("canvas");
      composite.width = video.videoWidth;
      composite.height = video.videoHeight;
      const ctx = composite.getContext("2d");
      if (!ctx) throw new Error("Couldn't capture the photo.");
      ctx.drawImage(video, 0, 0, composite.width, composite.height);

      const blob: Blob | null = await new Promise((resolve) => composite.toBlob(resolve, "image/jpeg", 0.92));
      if (!blob) throw new Error("Couldn't create the photo.");
      const file = new File([blob], `storystep-${Date.now()}.jpg`, { type: "image/jpeg" });

      const nav = navigator as Navigator & {
        canShare?: (data: { files: File[] }) => boolean;
        share?: (data: { files: File[]; title?: string }) => Promise<void>;
      };

      if (nav.canShare?.({ files: [file] }) && nav.share) {
        await nav.share({ files: [file], title: "StoryStep" });
        notifySuccess();
        showPhotoMessage("Choose “Save Image” to add it to your camera roll.");
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        notifySuccess();
        showPhotoMessage("Photo downloaded.");
      }
    } catch (err) {
      if ((err as any)?.name === "AbortError") return; // user dismissed the share sheet
      console.warn("[ARCameraScreen] photo capture failed:", err);
      notifyError();
      showPhotoMessage("Couldn't save the photo.");
    } finally {
      setCapturing(false);
    }
  };

  // Captures the current camera frame straight off the live <video> feed
  // already driving the AR view — no separate camera session needed, so
  // scanning works without interrupting the penguin/ribbon guide at all.
  const handleScan = async () => {
    const video = videoRef.current;
    if (!video || scanning) return;
    setScanning(true);
    setScanError(null);
    setScanResults(null);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Couldn't capture the camera frame.");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
      const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
      const results = await identifyLandmark(base64);
      setScanResults(results);
      if (results.length > 0) notifySuccess();
      else notifyError();
    } catch (e) {
      notifyError();
      setScanError(e instanceof Error ? e.message : "Couldn't identify this landmark.");
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (photoMessageTimer.current) clearTimeout(photoMessageTimer.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const cleanupFns: Array<() => void> = [];

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((tr) => tr.stop());
          return;
        }
        cleanupFns.push(() => stream.getTracks().forEach((tr) => tr.stop()));

        const video = document.createElement("video");
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.srcObject = stream;
        Object.assign(video.style, {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        });
        containerRef.current?.appendChild(video);
        videoRef.current = video;
        cleanupFns.push(() => {
          video.remove();
          videoRef.current = null;
        });
        await video.play();

        const canvas = document.createElement("canvas");
        Object.assign(canvas.style, { position: "absolute", inset: "0", width: "100%", height: "100%" });
        containerRef.current?.appendChild(canvas);
        cleanupFns.push(() => canvas.remove());

        // --- device orientation (compass) ---
        // Permission (iOS) was already requested and granted from the launch
        // button on ActiveTourScreen, directly in that tap — requesting it
        // again here would fail (no longer inside a fresh user gesture). We
        // just wire up the listeners; they'll simply stay quiet if consent
        // wasn't actually granted (params.orientationGranted === false).
        // `heading` must update on every single orientation event no matter
        // what — freezing it, even briefly, makes the whole guide look dead
        // ("stuck no matter which way you turn"). But a plain "deviceorientation"
        // event's alpha is relative to wherever the phone happened to be
        // pointed when tracking started, not true north, so raw alpha alone
        // isn't a compass reading. The fix: always derive heading live from
        // alpha, and maintain a calibration offset that snaps to true north
        // whenever a real compass reading is available (iOS webkitCompassHeading
        // on every event; Android via the separate "deviceorientationabsolute"
        // event, which can fire far less often than plain "deviceorientation") —
        // so it's live-updating AND accurate, instead of one or the other.
        const orientation = { heading: 0, quaternion: new THREE.Quaternion(), headingOffset: 0 };
        let screenAngle = (screen.orientation && screen.orientation.angle) || (window as any).orientation || 0;
        const handleOrientationChange = () => {
          screenAngle = (screen.orientation && screen.orientation.angle) || (window as any).orientation || 0;
        };
        window.addEventListener("orientationchange", handleOrientationChange);
        cleanupFns.push(() => window.removeEventListener("orientationchange", handleOrientationChange));

        const handleOrientation = (event: DeviceOrientationEvent) => {
          if (typeof event.alpha === "number") {
            const rawHeading = (360 - event.alpha + 360) % 360;
            const webkitHeading = (event as any).webkitCompassHeading;
            const isAbsolute =
              typeof webkitHeading === "number" || (event as any).absolute === true || event.type === "deviceorientationabsolute";
            if (isAbsolute) {
              const trueHeading = typeof webkitHeading === "number" ? webkitHeading : rawHeading;
              orientation.headingOffset = trueHeading - rawHeading;
            }
            orientation.heading = (rawHeading + orientation.headingOffset + 360) % 360;
          }

          const alpha = toRad(event.alpha || 0);
          const beta = toRad(event.beta || 0);
          const gamma = toRad(event.gamma || 0);
          orientation.quaternion = deviceOrientationToQuaternion(alpha, beta, gamma, toRad(screenAngle || 0));
        };
        window.addEventListener("deviceorientationabsolute", handleOrientation as EventListener, true);
        window.addEventListener("deviceorientation", handleOrientation as EventListener, true);
        cleanupFns.push(() => {
          window.removeEventListener("deviceorientationabsolute", handleOrientation as EventListener, true);
          window.removeEventListener("deviceorientation", handleOrientation as EventListener, true);
        });

        // --- three.js scene ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.05, 100);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        cleanupFns.push(() => renderer.dispose());

        scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.1));
        const sun = new THREE.DirectionalLight(0xffffff, 0.9);
        sun.position.set(1, 3, 2);
        scene.add(sun);

        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);
        cleanupFns.push(() => window.removeEventListener("resize", handleResize));

        const guideLine = new THREE.Mesh(
          new THREE.PlaneGeometry(0.28, 3.2),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(colors.primary),
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide,
            depthWrite: false,
          })
        );
        guideLine.rotation.x = -Math.PI / 2;
        scene.add(guideLine);

        let penguin: THREE.Object3D;
        let mixer: THREE.AnimationMixer | null = null;
        const actions: Record<string, THREE.AnimationAction> = {};
        let groundOffset = 0;
        try {
          const gltf = await new GLTFLoader().loadAsync(MODEL_URL);
          penguin = gltf.scene;
          penguin.scale.setScalar(MODEL_SCALE);
          scene.add(penguin);
          groundOffset = computeGroundOffset(penguin);

          if (gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(penguin);
            const findClip = (pattern: RegExp) => gltf.animations.find((c) => pattern.test(c.name));
            const idleClip = findClip(/idle/i) ?? gltf.animations[0];
            const walkClip = findClip(/walk/i) ?? idleClip;
            if (idleClip) actions.idle = mixer.clipAction(idleClip);
            if (walkClip) actions.walk = mixer.clipAction(walkClip);
          }
        } catch (err) {
          console.warn("[ARCameraScreen] model failed to load, using placeholder:", err);
          penguin = buildPlaceholderPenguin();
          scene.add(penguin);
          groundOffset = computeGroundOffset(penguin);
        }

        let currentAction: THREE.AnimationAction | null = null;
        const playAnim = (name: string) => {
          if (!mixer) return;
          const next = actions[name];
          if (!next || next === currentAction) return;
          next.reset().fadeIn(0.35).play();
          currentAction?.fadeOut(0.35);
          currentAction = next;
        };

        if (cancelled) return;
        setReady(true);

        // Route guidance (nearest-point projection + turn scan over a
        // 100-300 point path) is recomputed at the same cadence as the HUD
        // below, not every animation frame — the render loop just reads
        // this cached value each frame, since it doesn't meaningfully
        // change within 400ms of walking.
        let cachedWalkBearing: number | null = null;

        const clock = new THREE.Clock();
        let rafId = 0;
        const tick = () => {
          const dt = clock.getDelta();
          if (mixer) mixer.update(dt);
          camera.quaternion.copy(orientation.quaternion);

          const state = useTourStore.getState();
          const walking = state.status === "touring";
          const relativeBearing =
            cachedWalkBearing != null ? normalizeAngle(cachedWalkBearing - orientation.heading) : 0;

          // Deriving placement from the camera's OWN current forward vector
          // (rather than an independent absolute-compass calculation) is
          // what guarantees the penguin always ends up exactly STAND_OFF_M
          // in front of wherever the camera is actually looking, regardless
          // of how device-orientation angles map to its quaternion.
          const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
          forward.y = 0;
          if (forward.lengthSq() < 1e-6) forward.set(0, 0, -1);
          forward.normalize();
          const targetDir = forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), -toRad(relativeBearing));
          const rad = Math.atan2(targetDir.x, -targetDir.z);

          const groundY = -0.9 + groundOffset;
          penguin.position.set(targetDir.x * STAND_OFF_M, groundY, targetDir.z * STAND_OFF_M);
          penguin.rotation.y = -rad + toRad(MODEL_YAW_OFFSET_DEG);

          playAnim(walking ? "walk" : "idle");
          if (!mixer) applyProceduralMotion(penguin, walking, dt);

          guideLine.position.set(targetDir.x * GUIDE_LINE_DISTANCE_M, -0.95, targetDir.z * GUIDE_LINE_DISTANCE_M);
          guideLine.rotation.z = -rad;
          // Until there's an actual GPS-derived bearing to guide toward,
          // showing the penguin/ribbon planted in front of the camera reads
          // as a real direction when it isn't one yet — hide both instead.
          const hasGuidance = cachedWalkBearing != null;
          guideLine.visible = hasGuidance && state.status !== "complete";
          penguin.visible = hasGuidance;

          renderer.render(scene, camera);
          rafId = requestAnimationFrame(tick);
        };
        tick();
        cleanupFns.push(() => cancelAnimationFrame(rafId));

        // HUD + route-guidance recompute at a human-readable cadence rather
        // than every frame — no need to re-render React 60x/sec, and the
        // path projection is too expensive to redo every animation frame.
        const hudInterval = setInterval(() => {
          const state = useTourStore.getState();
          const waypoint = selectCurrentWaypoint(state);
          const userCoords = state.lastKnownLocation;
          const path = state.area?.path;

          if (!waypoint) {
            cachedWalkBearing = null;
            setHud({ distanceText: null, turnText: null, turnAngle: 0 });
            return;
          }
          if (!userCoords) {
            cachedWalkBearing = null;
            setHud({ distanceText: "Getting your location…", turnText: null, turnAngle: 0 });
            return;
          }

          // Prefer the real street-following path (routed from a mapping
          // service, same polyline the map uses) for both "which way to
          // walk right now" and distance — a straight line to the next
          // waypoint can cut straight through a building. Falls back to the
          // direct bearing/distance for the handful of tours with no path
          // data yet.
          const guidance = path && path.length > 1 ? computeRouteGuidance(path, userCoords) : null;
          const walkBearing = guidance?.walkBearing ?? bearingDegrees(userCoords, waypoint.coordinates);
          const d = guidance?.pathDistanceTo(waypoint.coordinates) ?? distanceMeters(userCoords, waypoint.coordinates);
          cachedWalkBearing = walkBearing;

          const rel = normalizeAngle(walkBearing - orientation.heading);
          const abs = Math.abs(rel);

          // An upcoming sharp bend in the path takes priority over the
          // general "which way am I facing" correction — that's the actual
          // "turn left/right as part of the route" instruction, called out
          // as it approaches rather than only once you're already on top
          // of it.
          const turn = guidance?.upcomingTurn;
          let turnText: string;
          let turnAngle: number;
          if (turn && turn.distanceMeters <= 15) {
            const dir = turn.turnAngleDeg > 0 ? "right" : "left";
            turnText = turn.distanceMeters <= 4 ? `Turn ${dir} now` : `Turn ${dir} in ${Math.round(turn.distanceMeters)}m`;
            turnAngle = Math.sign(turn.turnAngleDeg) * 60;
          } else {
            turnText = abs < 18 ? "Straight ahead" : rel > 0 ? "Turn right" : "Turn left";
            turnAngle = abs < 18 ? 0 : Math.min(abs, 90) * Math.sign(rel);
          }

          setHud({
            distanceText: `${Math.round(d)}m to ${waypoint.name}`,
            turnText,
            turnAngle,
          });
        }, 400);
        cleanupFns.push(() => clearInterval(hudInterval));
      } catch (err) {
        console.warn("[ARCameraScreen] failed to start AR view:", err);
        const message = err instanceof Error ? err.message : String(err);
        const denied = message.includes("denied") || (err as any)?.name === "NotAllowedError";
        setErrorText(
          denied
            ? "Camera access was denied — you can still follow the narration without the camera view."
            : "Couldn't open the camera on this device."
        );
      }
    })();

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

      <SafeAreaView style={styles.hud} pointerEvents="box-none">
        <View style={styles.topRow} pointerEvents="box-none">
          <Pressable style={styles.closeButton} onPress={() => navigation.goBack()} hitSlop={8}>
            <Ionicons name="close" size={22} color="#fff" />
          </Pressable>
          {!params?.orientationGranted && ready && (
            <View style={styles.compassWarning}>
              <Text style={styles.compassWarningText}>Compass unavailable — guide may not track turns</Text>
            </View>
          )}
        </View>

        {hud.turnText && (
          <View style={styles.turnPrompt}>
            <Text style={[styles.turnArrow, { transform: [{ rotate: `${hud.turnAngle}deg` }] }]}>↑</Text>
            <Text style={styles.turnText}>{hud.turnText}</Text>
          </View>
        )}

        <View style={styles.bottomGroup} pointerEvents="box-none">
          {scanResults && scanResults.length > 0 && (
            <View style={styles.resultCard}>
              <Text style={styles.resultName}>{scanResults[0].name}</Text>
              <Text style={styles.resultScore}>{Math.round(scanResults[0].score * 100)}% match</Text>
              {scanResults[0].ourScript && (
                <Text style={styles.resultBody} numberOfLines={4}>
                  {scanResults[0].ourScript}
                </Text>
              )}
            </View>
          )}
          {scanResults && scanResults.length === 0 && !scanError && (
            <View style={styles.resultCard}>
              <Text style={styles.resultHint}>Couldn't identify a landmark — try centering it in view.</Text>
            </View>
          )}
          {scanError && (
            <View style={styles.resultCard}>
              <Text style={styles.resultHint}>{scanError}</Text>
            </View>
          )}
          {photoMessage && (
            <View style={styles.resultCard}>
              <Text style={styles.resultHint}>{photoMessage}</Text>
            </View>
          )}

          {hud.distanceText && (
            <View style={styles.distancePill}>
              <Text style={styles.distanceText}>{hud.distanceText}</Text>
            </View>
          )}

          <View style={styles.actionRow}>
            <PressScale style={styles.scanButton} scaleTo={0.94} onPress={handleScan} disabled={scanning || !ready}>
              {scanning ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="camera" size={16} color="#fff" />
                  <Text style={styles.scanButtonText}>Scan landmark</Text>
                </>
              )}
            </PressScale>

            <PressScale
              style={styles.shutterButton}
              scaleTo={0.9}
              onPress={handleTakePhoto}
              disabled={capturing || !ready}
            >
              {capturing ? <ActivityIndicator color="#000" /> : <View style={styles.shutterInner} />}
            </PressScale>
          </View>
        </View>
      </SafeAreaView>

      {errorText && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorTitle}>{errorText}</Text>
          <Pressable style={styles.errorBackButton} onPress={() => navigation.goBack()}>
            <Text style={styles.errorBackButtonText}>Back to tour</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  hud: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  compassWarning: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  compassWarningText: { color: "#ffd9a8", fontSize: 11, textAlign: "right" },
  turnPrompt: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(10,10,10,0.6)",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  turnArrow: { fontSize: 34, color: "#fff" },
  turnText: { fontSize: 13, fontWeight: "700", color: "#fff", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 2 },
  distancePill: {
    alignSelf: "center",
    backgroundColor: "rgba(10,10,10,0.55)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  distanceText: { color: "#d9dfdc", fontSize: 13 },
  bottomGroup: { alignItems: "center", gap: 10 },
  resultCard: {
    alignSelf: "stretch",
    backgroundColor: "rgba(10,10,10,0.75)",
    borderRadius: 16,
    padding: 14,
    gap: 4,
  },
  resultName: { color: "#fff", fontSize: 17, fontWeight: "700" },
  resultScore: { color: "rgba(255,255,255,0.6)", fontSize: 12 },
  resultBody: { color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 18, marginTop: 4 },
  resultHint: { color: "rgba(255,255,255,0.8)", fontSize: 13, textAlign: "center" },
  actionRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  scanButtonText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  shutterButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
  },
  shutterInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
  },
  errorOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.92)",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  errorTitle: { color: "#fff", fontSize: 16, textAlign: "center", lineHeight: 22 },
  errorBackButton: { backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 14, paddingVertical: 14, paddingHorizontal: 28 },
  errorBackButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});

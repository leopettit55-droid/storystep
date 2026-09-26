import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import LandmarkResultCard from "../components/LandmarkResultCard";
import PressScale from "../components/PressScale";
import { type Coordinates } from "../content";
import { bearingDegrees, distanceMeters } from "../geofencing/proximityTracker";
import { RouteProgress, type LocalOffset } from "../geofencing/routeGuide";
import { notifyError, notifySuccess } from "../haptics";
import { primeLandmarkAudio, stopLandmarkSpeech, useLandmarkSpeech } from "../landmark/landmarkSpeech";
import { describeMatch, scanLandmark, speakMatch, type ScanOutcome } from "../landmark/scan";
import type { LandmarkMatch } from "../landmark/recognize";
import type { RootStackParamList } from "../navigation/types";
import { selectCurrentWaypoint, useTourStore } from "../state/tourStore";
import { useTheme } from "../ThemeContext";

// Tuned in the ar-tour prototype against the real, unrigged penguin export —
// see ar-tour/README.md for how these were derived.
const MODEL_URL = "/models/penguin.glb";
const MODEL_SCALE = 0.28;
const STAND_OFF_M = 3.0;
const MODEL_YAW_OFFSET_DEG = 180;
/** The ribbon starts just ahead of the walker's feet and follows the path. */
const RIBBON_START_M = 0.8;
const RIBBON_HALF_WIDTH_M = 0.16;
const RIBBON_Y = -0.95;
const RIBBON_MAX_POINTS = 64;
/** Per-second rate at which the drawn ribbon/penguin glide to a new GPS fix,
 * instead of jumping every time guidance is recomputed. */
const GUIDE_EASE_PER_S = 4;

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** The point and unit direction `at` metres along a polyline (clamped to its end). */
function walkPolyline(points: LocalOffset[], at: number): { point: LocalOffset; dir: LocalOffset } | null {
  let travelled = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const len = Math.hypot(b.east - a.east, b.north - a.north);
    if (len <= 0) continue;
    if (travelled + len >= at || i === points.length - 2) {
      const t = Math.min(1, (at - travelled) / len);
      return {
        point: { east: a.east + (b.east - a.east) * t, north: a.north + (b.north - a.north) * t },
        dir: { east: (b.east - a.east) / len, north: (b.north - a.north) / len },
      };
    }
    travelled += len;
  }
  return null;
}

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

/** Full-screen camera view with two modes.
 *
 * "tour": the live camera with a 3D penguin ~3m ahead (back to the user, like
 * someone leading you) and a ground ribbon along the tour's real path, plus
 * turn prompts. A purely visual layer over the tour ActiveTourScreen keeps
 * running underneath (react-navigation keeps it mounted).
 *
 * "scanner": just the camera, position and compass — for the free landmark
 * scanner, which needs no tour and no purchase.
 *
 * In both, "Scan landmark" reads the picture together with GPS position and
 * compass heading, pauses any tour narration, speaks what it found, and
 * resumes the tour afterwards. */
export default function ARCameraScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const mode = params?.mode ?? "tour";
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const userRef = useRef<Coordinates | null>(null);
  const headingRef = useRef<{ deg: number; absolute: boolean }>({ deg: 0, absolute: false });
  const [hud, setHud] = useState<HudInfo>({ distanceText: null, turnText: null, turnAngle: 0 });
  const [errorText, setErrorText] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [outcome, setOutcome] = useState<ScanOutcome | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [photoMessage, setPhotoMessage] = useState<string | null>(null);
  const photoMessageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speaking = useLandmarkSpeech((s) => s.speaking);

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

  // Reads the picture off the live <video> feed already driving this view —
  // no separate camera session, so scanning never interrupts the guide.
  const handleScan = async () => {
    // Must run synchronously inside the tap so the browser lets audio and
    // speech start once the network calls below have finished.
    primeLandmarkAudio();
    const video = videoRef.current;
    if (!video || scanning) return;
    setScanning(true);
    setScanError(null);
    setOutcome(null);
    try {
      const canvas = document.createElement("canvas");
      // Vision doesn't need full resolution; smaller uploads answer faster on mobile data.
      const scale = Math.min(1, 1024 / Math.max(video.videoWidth, video.videoHeight));
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Couldn't capture the camera frame.");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
      const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);

      const user = useTourStore.getState().lastKnownLocation ?? userRef.current;
      const heading = headingRef.current.absolute ? headingRef.current.deg : null;
      const result = await scanLandmark({ base64, areaId: params?.areaId, user, headingDeg: heading });
      setOutcome(result);
      if (result.shown) notifySuccess();
      else notifyError();
    } catch (e) {
      notifyError();
      setScanError(e instanceof Error ? e.message : "Couldn't identify this landmark.");
    } finally {
      setScanning(false);
    }
  };

  const handlePickAlternative = (id: string) => {
    if (!outcome) return;
    const { best, alternatives } = outcome.recognition;
    const picked: LandmarkMatch | undefined = alternatives.find((a) => a.landmark.id === id);
    if (!picked) return;
    const rest = alternatives.filter((a) => a.landmark.id !== id);
    setOutcome({
      ...outcome,
      recognition: { ...outcome.recognition, best: picked, alternatives: best ? [best, ...rest] : rest },
      shown: describeMatch(picked),
    });
    void speakMatch(picked);
  };

  useEffect(() => {
    return () => {
      if (photoMessageTimer.current) clearTimeout(photoMessageTimer.current);
      // Never leave the tour paused if the visitor leaves mid-narration.
      stopLandmarkSpeech();
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

        // --- device orientation (compass) ---
        // Permission (iOS) was already requested and granted from the launch
        // button, directly in that tap — requesting it again here would fail
        // (no longer inside a fresh user gesture). We just wire up the
        // listeners; they'll simply stay quiet if consent wasn't granted.
        // `heading` must update on every single orientation event — freezing
        // it makes the whole guide look dead. But a plain "deviceorientation"
        // event's alpha is relative to wherever the phone was pointed when
        // tracking started, not true north, so we derive heading live from
        // alpha and keep a calibration offset that snaps to true north
        // whenever a real compass reading arrives (iOS webkitCompassHeading
        // on every event; Android via the sparser "deviceorientationabsolute").
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
              headingRef.current.absolute = true;
            }
            orientation.heading = (rawHeading + orientation.headingOffset + 360) % 360;
            headingRef.current.deg = orientation.heading;
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

        if (mode === "scanner") {
          // No tour is running, so nothing else is tracking position — watch it
          // here, straight through the browser (expo-location's web watcher
          // drops updates; see ProximityTracker).
          const watchId = navigator.geolocation?.watchPosition(
            (pos) => {
              userRef.current = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            },
            (err) => console.warn("[ARCameraScreen] geolocation error:", err.message),
            { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 }
          );
          if (watchId != null) cleanupFns.push(() => navigator.geolocation.clearWatch(watchId));
          if (!cancelled) setReady(true);
          return;
        }

        const canvas = document.createElement("canvas");
        Object.assign(canvas.style, { position: "absolute", inset: "0", width: "100%", height: "100%" });
        containerRef.current?.appendChild(canvas);
        cleanupFns.push(() => canvas.remove());

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

        // The ribbon is a flat strip laid along the real path ahead (rebuilt
        // every frame from the latest guidance), so it bends round corners
        // and through gateways exactly where the path does.
        const ribbonGeometry = new THREE.BufferGeometry();
        const ribbonPositions = new Float32Array(RIBBON_MAX_POINTS * 2 * 3);
        ribbonGeometry.setAttribute("position", new THREE.BufferAttribute(ribbonPositions, 3));
        const ribbonIndex: number[] = [];
        for (let i = 0; i < RIBBON_MAX_POINTS - 1; i++) {
          const a = i * 2;
          ribbonIndex.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
        }
        ribbonGeometry.setIndex(ribbonIndex);
        const guideLine = new THREE.Mesh(
          ribbonGeometry,
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(colors.primary),
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide,
            depthWrite: false,
          })
        );
        guideLine.frustumCulled = false;
        scene.add(guideLine);
        cleanupFns.push(() => ribbonGeometry.dispose());

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

        // Route guidance (path projection + turn scan) is recomputed at the
        // HUD's cadence, not every animation frame — the render loop just
        // reads this cached bearing, which doesn't change meaningfully
        // within 400ms of walking.
        let cachedWalkBearing: number | null = null;
        /** The path ahead from the latest guidance (east/north metres from the walker). */
        let targetAhead: LocalOffset[] | null = null;
        /** What's actually drawn — eased towards targetAhead so the ribbon and
         * penguin glide on each GPS update instead of jumping. */
        let shownAhead: LocalOffset[] | null = null;

        // Converts a walker-relative east/north offset into the scene, using
        // the camera's own horizontal forward vector plus the compass heading —
        // the same frame the penguin has always been placed in.
        const up = new THREE.Vector3(0, 1, 0);
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();
        const toScene = (o: LocalOffset, out: THREE.Vector3) => {
          const h = toRad(orientation.heading);
          const ahead = o.north * Math.cos(h) + o.east * Math.sin(h);
          const side = o.east * Math.cos(h) - o.north * Math.sin(h);
          return out.copy(forward).multiplyScalar(ahead).addScaledVector(right, side);
        };
        const tmpA = new THREE.Vector3();
        const tmpB = new THREE.Vector3();

        const clock = new THREE.Clock();
        let rafId = 0;
        const tick = () => {
          const dt = clock.getDelta();
          if (mixer) mixer.update(dt);
          camera.quaternion.copy(orientation.quaternion);

          const state = useTourStore.getState();
          const walking = state.status === "touring";

          // Deriving placement from the camera's OWN current forward vector
          // (rather than an independent absolute-compass calculation) is
          // what keeps the penguin and ribbon anchored to wherever the camera
          // is actually looking, regardless of how device-orientation angles
          // map to its quaternion.
          forward.set(0, 0, -1).applyQuaternion(camera.quaternion);
          forward.y = 0;
          if (forward.lengthSq() < 1e-6) forward.set(0, 0, -1);
          forward.normalize();
          right.copy(forward).applyAxisAngle(up, -Math.PI / 2);

          // Ease the drawn path towards the latest guidance.
          if (targetAhead) {
            if (!shownAhead || shownAhead.length !== targetAhead.length) {
              shownAhead = targetAhead.map((o) => ({ ...o }));
            } else {
              const f = 1 - Math.exp(-GUIDE_EASE_PER_S * dt);
              for (let i = 0; i < shownAhead.length; i++) {
                shownAhead[i].east += (targetAhead[i].east - shownAhead[i].east) * f;
                shownAhead[i].north += (targetAhead[i].north - shownAhead[i].north) * f;
              }
            }
          }

          // Penguin: stands on the path STAND_OFF_M ahead, facing along it —
          // so round a corner it's round the corner, not in the wall.
          const groundY = -0.9 + groundOffset;
          const stand = shownAhead ? walkPolyline(shownAhead, STAND_OFF_M) : null;
          if (stand) {
            toScene(stand.point, tmpA);
            toScene(stand.dir, tmpB);
            penguin.position.set(tmpA.x, groundY, tmpA.z);
            penguin.rotation.y = -Math.atan2(tmpB.x, -tmpB.z) + toRad(MODEL_YAW_OFFSET_DEG);
          }

          playAnim(walking ? "walk" : "idle");
          if (!mixer) applyProceduralMotion(penguin, walking, dt);

          // Ribbon: a strip laid along the path ahead, skipping the first bit
          // under the walker's feet.
          let count = 0;
          if (shownAhead) {
            let travelled = 0;
            for (let i = 0; i < shownAhead.length && count < RIBBON_MAX_POINTS; i++) {
              if (i > 0) {
                travelled += Math.hypot(
                  shownAhead[i].east - shownAhead[i - 1].east,
                  shownAhead[i].north - shownAhead[i - 1].north
                );
              }
              if (travelled < RIBBON_START_M) continue;
              const prev = shownAhead[Math.max(0, i - 1)];
              const next = shownAhead[Math.min(shownAhead.length - 1, i + 1)];
              toScene(shownAhead[i], tmpA);
              toScene({ east: next.east - prev.east, north: next.north - prev.north }, tmpB);
              tmpB.y = 0;
              if (tmpB.lengthSq() < 1e-9) continue;
              tmpB.normalize();
              // Perpendicular on the ground plane.
              const nx = -tmpB.z * RIBBON_HALF_WIDTH_M;
              const nz = tmpB.x * RIBBON_HALF_WIDTH_M;
              const o = count * 6;
              ribbonPositions[o] = tmpA.x + nx;
              ribbonPositions[o + 1] = RIBBON_Y;
              ribbonPositions[o + 2] = tmpA.z + nz;
              ribbonPositions[o + 3] = tmpA.x - nx;
              ribbonPositions[o + 4] = RIBBON_Y;
              ribbonPositions[o + 5] = tmpA.z - nz;
              count++;
            }
          }
          ribbonGeometry.attributes.position.needsUpdate = true;
          ribbonGeometry.setDrawRange(0, Math.max(0, count - 1) * 6);

          // Until there's an actual GPS-derived path to guide along, showing
          // the penguin/ribbon planted in front of the camera reads as a real
          // direction when it isn't one yet — hide both instead.
          const hasGuidance = cachedWalkBearing != null && !!stand;
          guideLine.visible = hasGuidance && count > 1 && state.status !== "complete";
          penguin.visible = hasGuidance;

          renderer.render(scene, camera);
          rafId = requestAnimationFrame(tick);
        };
        tick();
        cleanupFns.push(() => cancelAnimationFrame(rafId));

        const tourArea = useTourStore.getState().area;
        const routeProgress =
          tourArea?.path && tourArea.path.length > 1 ? new RouteProgress(tourArea.path, tourArea.route) : null;

        // HUD + route guidance recompute at a human-readable cadence rather
        // than every frame.
        const hudInterval = setInterval(() => {
          const state = useTourStore.getState();
          const area = state.area;
          const current = selectCurrentWaypoint(state);
          const userCoords = state.lastKnownLocation;

          if (!area || !current) {
            cachedWalkBearing = null;
            targetAhead = null;
            setHud({ distanceText: null, turnText: null, turnAngle: 0 });
            return;
          }
          if (!userCoords) {
            cachedWalkBearing = null;
            targetAhead = null;
            setHud({ distanceText: "Getting your location…", turnText: null, turnAngle: 0 });
            return;
          }

          // Aim at the stop the walker is actually heading to — by progress
          // along the real path, not the tour store's "current stop", which is
          // simply the last one whose narration started (the one just left).
          let target = current;
          let walkBearing: number;
          let distance: number;
          let turn: { distanceMeters: number; turnAngleDeg: number } | null = null;
          let offPath = false;
          if (routeProgress) {
            const g = routeProgress.update(userCoords, state.visitedWaypointIds);
            target = area.route[g.targetIndex] ?? current;
            walkBearing = g.walkBearing;
            distance = g.distanceToTarget;
            turn = g.upcomingTurn;
            offPath = g.offPath;
            targetAhead = g.pathAhead;
          } else {
            if (state.visitedWaypointIds.includes(current.id)) {
              target = area.route[state.currentWaypointIndex + 1] ?? current;
            }
            walkBearing = bearingDegrees(userCoords, target.coordinates);
            distance = distanceMeters(userCoords, target.coordinates);
            const b = toRad(walkBearing);
            targetAhead = [0, 4, 8].map((d) => ({ east: Math.sin(b) * d, north: Math.cos(b) * d }));
          }
          cachedWalkBearing = walkBearing;

          const rel = normalizeAngle(walkBearing - orientation.heading);
          const abs = Math.abs(rel);

          // An upcoming sharp bend in the path takes priority over the
          // general "which way am I facing" correction — called out as it
          // approaches rather than once you're already on top of it.
          let turnText: string;
          let turnAngle: number;
          if (offPath) {
            // Further from the route than GPS error explains: lead them back
            // to it first, rather than calling turns on a path they're not on.
            turnText = abs < 18 ? "Back to the route" : rel > 0 ? "Turn right to rejoin" : "Turn left to rejoin";
            turnAngle = abs < 18 ? 0 : Math.min(abs, 90) * Math.sign(rel);
          } else if (turn && turn.distanceMeters <= 15) {
            const dir = turn.turnAngleDeg > 0 ? "right" : "left";
            turnText = turn.distanceMeters <= 4 ? `Turn ${dir} now` : `Turn ${dir} in ${Math.round(turn.distanceMeters)}m`;
            turnAngle = Math.sign(turn.turnAngleDeg) * 60;
          } else {
            turnText = abs < 18 ? "Straight ahead" : rel > 0 ? "Turn right" : "Turn left";
            turnAngle = abs < 18 ? 0 : Math.min(abs, 90) * Math.sign(rel);
          }

          setHud({
            distanceText: `${Math.round(distance)}m to ${target.name}`,
            turnText,
            turnAngle,
          });
        }, 400);
        cleanupFns.push(() => clearInterval(hudInterval));
      } catch (err) {
        console.warn("[ARCameraScreen] failed to start camera view:", err);
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

  const rec = outcome?.recognition;
  const hint = outcome
    ? outcome.visionError
      ? "Couldn't read the picture, so this is based on where you're standing."
      : !rec?.usedPosition
        ? "No GPS fix yet — with location on, this gets more accurate."
        : rec?.best && rec.best.score < 0.45
          ? "Best guess — try standing a little closer and centring it."
          : undefined
    : undefined;

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

      <SafeAreaView style={styles.hud} pointerEvents="box-none">
        <View style={styles.topRow} pointerEvents="box-none">
          <Pressable style={styles.closeButton} onPress={() => navigation.goBack()} hitSlop={8}>
            <Ionicons name="close" size={22} color="#fff" />
          </Pressable>
          {mode === "scanner" && (
            <View style={styles.modePill}>
              <Text style={styles.modePillText}>Landmark scanner · free</Text>
            </View>
          )}
          {!params?.orientationGranted && ready && (
            <View style={styles.compassWarning}>
              <Text style={styles.compassWarningText}>
                Compass unavailable — {mode === "scanner" ? "identifying by picture and location only" : "guide may not track turns"}
              </Text>
            </View>
          )}
        </View>

        {mode === "tour" && hud.turnText && (
          <View style={styles.turnPrompt}>
            <Text style={[styles.turnArrow, { transform: [{ rotate: `${hud.turnAngle}deg` }] }]}>↑</Text>
            <Text style={styles.turnText}>{hud.turnText}</Text>
          </View>
        )}

        <View style={styles.bottomGroup} pointerEvents="box-none">
          {outcome?.shown && (
            <LandmarkResultCard
              title={outcome.shown.title}
              body={outcome.shown.body}
              note={outcome.shown.note}
              speaking={speaking}
              onStop={stopLandmarkSpeech}
              alternatives={(rec?.alternatives ?? []).map((a) => ({ id: a.landmark.id, name: a.landmark.name }))}
              onPickAlternative={handlePickAlternative}
              hint={hint}
            />
          )}
          {outcome && !outcome.shown && (
            <View style={styles.simpleCard}>
              <Text style={styles.simpleCardText}>
                Couldn't identify that. Try a building, tree or feature, stand a little closer, and keep it in the middle of the picture.
              </Text>
            </View>
          )}
          {scanError && (
            <View style={styles.simpleCard}>
              <Text style={styles.simpleCardText}>{scanError}</Text>
            </View>
          )}
          {photoMessage && (
            <View style={styles.simpleCard}>
              <Text style={styles.simpleCardText}>{photoMessage}</Text>
            </View>
          )}

          {mode === "tour" && hud.distanceText && (
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
            <Text style={styles.errorBackButtonText}>Back</Text>
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
  modePill: {
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  modePillText: { color: "#fff", fontSize: 12, fontWeight: "700" },
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
  simpleCard: {
    alignSelf: "stretch",
    backgroundColor: "rgba(10,10,10,0.75)",
    borderRadius: 16,
    padding: 14,
  },
  simpleCardText: { color: "rgba(255,255,255,0.85)", fontSize: 13, textAlign: "center", lineHeight: 18 },
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

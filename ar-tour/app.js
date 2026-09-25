import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// ---------------------------------------------------------------------------
// Geo math (haversine distance + initial bearing) — same formulas the main
// StoryStep app uses in src/geofencing/proximityTracker.ts, ported to plain JS.
// ---------------------------------------------------------------------------
const EARTH_RADIUS_M = 6371000;
const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;

function distanceMeters(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Compass bearing in degrees (0-360, true north) from `a` to `b`. */
function bearingDegrees(a, b) {
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Signed difference target-minus-current, normalized to -180..180. */
function normalizeAngle(deg) {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

// ---------------------------------------------------------------------------
// DOM
// ---------------------------------------------------------------------------
const videoEl = document.getElementById("camera-feed");
const canvasEl = document.getElementById("three-canvas");
const backgroundCanvasEl = document.getElementById("background-canvas");
const startScreenEl = document.getElementById("start-screen");
const startButtonEl = document.getElementById("start-button");
const tourTitleEl = document.getElementById("tour-title");
const tourSubtitleEl = document.getElementById("tour-subtitle");
const hudEl = document.getElementById("hud");
const waypointLabelEl = document.getElementById("waypoint-label");
const cameraToggleButtonEl = document.getElementById("camera-toggle-button");
const muteButtonEl = document.getElementById("mute-button");
const turnPromptEl = document.getElementById("turn-prompt");
const turnArrowEl = document.getElementById("turn-arrow");
const turnTextEl = document.getElementById("turn-text");
const arrivalBannerEl = document.getElementById("arrival-banner");
const distanceReadoutEl = document.getElementById("distance-readout");
const completeBannerEl = document.getElementById("tour-complete-banner");
const toastEl = document.getElementById("toast");
const audioEl = document.getElementById("narration-audio");

let toastTimer = null;
function showToast(text, ms = 4000) {
  toastEl.textContent = text;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toastEl.hidden = true), ms);
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
async function loadConfig() {
  const res = await fetch("./tour-config.json");
  if (!res.ok) throw new Error(`Couldn't load tour-config.json (${res.status})`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Tour state machine — owns waypoint index, walking/idle/talking/complete
// state, and narration audio. Completely independent of whether the AR
// camera view is open; it runs the same way whether the user is looking at
// the flat background view or the camera.
// ---------------------------------------------------------------------------
class TourController {
  constructor(waypoints, { onStateChange, onComplete }) {
    this.waypoints = waypoints;
    this.index = 0;
    this.state = "walking"; // 'walking' | 'idle' | 'talking' | 'complete'
    this.onStateChange = onStateChange;
    this.onComplete = onComplete;
    this.muted = false;

    audioEl.addEventListener("ended", () => this.handleAudioEnded());
  }

  get currentWaypoint() {
    return this.waypoints[this.index];
  }

  /** Call whenever something (real GPS proximity, or the no-GPS timer
   * fallback) decides the user has reached the current waypoint. */
  triggerArrival() {
    if (this.state !== "walking") return;
    this.state = "idle";
    this.onStateChange();

    // Brief idle beat before "talking" starts — mirrors a guide taking a
    // breath before speaking rather than snapping straight into narration.
    setTimeout(() => {
      if (this.state !== "idle") return;
      this.state = "talking";
      this.onStateChange();
      this.playCurrentAudio();
    }, 400);
  }

  playCurrentAudio() {
    const wp = this.currentWaypoint;
    audioEl.src = wp.audioFile;
    audioEl.muted = this.muted;
    audioEl.currentTime = 0;
    audioEl.play().catch((err) => {
      console.warn("[AR tour] audio play failed, skipping ahead:", err);
      this.handleAudioEnded();
    });
  }

  handleAudioEnded() {
    if (this.state !== "talking") return;
    if (this.index >= this.waypoints.length - 1) {
      this.state = "complete";
      this.onStateChange();
      this.onComplete();
      return;
    }
    this.index += 1;
    this.state = "walking";
    this.onStateChange();
  }

  setMuted(muted) {
    this.muted = muted;
    audioEl.muted = muted;
  }
}

// ---------------------------------------------------------------------------
// LocationTracker — the single source of truth for "where is the user, and
// how far/which way is the next waypoint." Runs continuously from the moment
// the tour begins, independent of the AR camera view. If geolocation is
// unavailable or denied, it transparently switches to a fixed-timer advance
// so the tour (and narration) still completes without GPS.
// ---------------------------------------------------------------------------
class LocationTracker {
  constructor(controller) {
    this.controller = controller;
    this.userCoords = null;
    this.accuracy = null;
    this.distance = null; // meters to current waypoint, or null if unknown
    this.bearingToTarget = null; // degrees true north, or null if unknown
    this.usingTimerFallback = false;
    this.watchId = null;
    this.timerHandle = null;
  }

  start() {
    if (!navigator.geolocation) {
      this.startTimerFallback("no geolocation API");
      return;
    }
    this.watchId = navigator.geolocation.watchPosition(
      (pos) => this.handlePosition(pos),
      (err) => {
        console.warn("[AR tour] geolocation error:", err);
        // Permission denial is permanent for this session — fall back for
        // good. A timeout or a momentarily-unavailable fix isn't; the watch
        // stays active and can recover on its own on the next update.
        if (err.code === err.PERMISSION_DENIED && !this.usingTimerFallback) {
          this.startTimerFallback(err.message);
        }
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 }
    );
  }

  handlePosition(pos) {
    this.userCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    this.accuracy = pos.coords.accuracy;

    const wp = this.controller.currentWaypoint;
    if (!wp) return;
    this.distance = distanceMeters(this.userCoords, { lat: wp.lat, lng: wp.lng });
    this.bearingToTarget = bearingDegrees(this.userCoords, { lat: wp.lat, lng: wp.lng });

    if (this.controller.state === "walking" && this.distance <= wp.radiusMeters) {
      this.controller.triggerArrival();
    }
  }

  /** No reliable GPS — advance on a fixed walking interval instead, so
   * narration still plays through the whole tour. Distance/bearing stay
   * null in this mode; the HUD and AR view both handle that gracefully. */
  startTimerFallback(reason) {
    this.usingTimerFallback = true;
    if (this.watchId != null) navigator.geolocation.clearWatch(this.watchId);
    console.warn("[AR tour] using timer-based fallback pacing:", reason);
    this.scheduleTimerAdvance();
  }

  scheduleTimerAdvance() {
    if (this.controller.state === "complete") return;
    if (this.controller.state !== "walking") return;
    const WALK_SECONDS_BETWEEN_STOPS = 20;
    this.timerHandle = setTimeout(() => {
      this.controller.triggerArrival();
    }, WALK_SECONDS_BETWEEN_STOPS * 1000);
  }

  /** Call after every controller state change so the timer fallback (if
   * active) reschedules itself for the next waypoint. */
  onControllerStateChange() {
    if (this.usingTimerFallback && this.controller.state === "walking") {
      this.scheduleTimerAdvance();
    }
  }

  stop() {
    if (this.watchId != null) navigator.geolocation.clearWatch(this.watchId);
    if (this.timerHandle != null) clearTimeout(this.timerHandle);
  }
}

// ---------------------------------------------------------------------------
// OrientationTracker — device compass heading + a full quaternion for the AR
// camera. Requested once, up front, so it's ready the moment the user opens
// the camera view (no second permission prompt at that point).
// ---------------------------------------------------------------------------
class OrientationTracker {
  constructor() {
    this.heading = 0; // degrees, 0 = true north
    this.quaternion = new THREE.Quaternion();
    this.available = false;
  }

  async start() {
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      const result = await DeviceOrientationEvent.requestPermission();
      if (result !== "granted") throw new Error("orientation-denied");
    }

    let screenAngle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
    window.addEventListener("orientationchange", () => {
      screenAngle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
    });

    const handle = (event) => {
      let heading;
      if (typeof event.webkitCompassHeading === "number") {
        heading = event.webkitCompassHeading;
      } else if (typeof event.alpha === "number") {
        heading = 360 - event.alpha;
      } else {
        return;
      }
      this.available = true;
      this.heading = (heading + 360) % 360;

      const alpha = toRad(event.alpha || 0);
      const beta = toRad(event.beta || 0);
      const gamma = toRad(event.gamma || 0);
      const orient = toRad(screenAngle || 0);
      this.quaternion = deviceOrientationToQuaternion(alpha, beta, gamma, orient);
    };

    window.addEventListener("deviceorientationabsolute", handle, true);
    window.addEventListener("deviceorientation", handle, true);
  }
}

/** Standard deviceorientation-angles-to-quaternion conversion, compensated
 * for current screen rotation (portrait vs landscape). */
const EULER_ORDER = "YXZ";
function deviceOrientationToQuaternion(alpha, beta, gamma, screenOrientRad) {
  const euler = new THREE.Euler(beta, alpha, -gamma, EULER_ORDER);
  const q = new THREE.Quaternion().setFromEuler(euler);
  const worldTransform = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // -PI/2 around X
  q.multiply(worldTransform);
  q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -screenOrientRad));
  return q;
}

// ---------------------------------------------------------------------------
// HUD
// ---------------------------------------------------------------------------
function updateHud(controller, location) {
  const wp = controller.currentWaypoint;

  if (controller.state === "complete") {
    waypointLabelEl.textContent = "Tour complete";
    turnPromptEl.hidden = true;
    arrivalBannerEl.hidden = true;
    distanceReadoutEl.hidden = true;
    completeBannerEl.hidden = false;
    return;
  }

  waypointLabelEl.textContent = wp.name;
  distanceReadoutEl.hidden = false;

  if (controller.state === "idle" || controller.state === "talking") {
    turnPromptEl.hidden = true;
    arrivalBannerEl.hidden = false;
    distanceReadoutEl.textContent = controller.state === "talking" ? `Now playing: ${wp.name}` : "You've arrived";
    return;
  }

  arrivalBannerEl.hidden = true;

  distanceReadoutEl.textContent =
    typeof location.distance === "number" ? `${Math.round(location.distance)}m to ${wp.name}` : `Heading to ${wp.name}`;

  const relativeBearing =
    typeof location.bearingToTarget === "number" && typeof location.heading === "number"
      ? normalizeAngle(location.bearingToTarget - location.heading)
      : null;

  if (relativeBearing !== null) {
    turnPromptEl.hidden = false;
    const abs = Math.abs(relativeBearing);
    if (abs < 18) {
      turnArrowEl.style.transform = "rotate(0deg)";
      turnTextEl.textContent = "Straight ahead";
    } else if (relativeBearing > 0) {
      turnArrowEl.style.transform = `rotate(${Math.min(abs, 90)}deg)`;
      turnTextEl.textContent = "Turn right";
    } else {
      turnArrowEl.style.transform = `rotate(-${Math.min(abs, 90)}deg)`;
      turnTextEl.textContent = "Turn left";
    }
  } else {
    turnPromptEl.hidden = true;
  }
}

// ---------------------------------------------------------------------------
// ARView — camera passthrough + three.js penguin + ground guide line. Purely
// a visual layer: it reads live data from `location`/`orientation` but does
// not own GPS or narration. Can be opened and closed freely; the tour keeps
// running underneath either way.
// ---------------------------------------------------------------------------
class ARView {
  constructor(cfg, controller, location, orientation) {
    this.cfg = cfg;
    this.controller = controller;
    this.location = location;
    this.orientation = orientation;
    this.isOpen = false;
    this.sceneReady = false;
    this.mixer = null;
    this.actions = {};
    this.currentAction = null;
    this.penguin = null;
    this.guideLine = null;
    this.stream = null;
  }

  async open() {
    if (this.isOpen) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    this.stream = stream;
    videoEl.srcObject = stream;
    await videoEl.play();

    if (!this.sceneReady) {
      this.setupScene();
      await this.loadModel();
      this.buildGuideLine();
      this.sceneReady = true;
    }

    videoEl.hidden = false;
    canvasEl.hidden = false;
    backgroundCanvasEl.hidden = true;
    this.isOpen = true;
    this.applyState();
    if (!this.looping) {
      this.looping = true;
      this.renderLoop();
    }
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    if (this.stream) this.stream.getTracks().forEach((t) => t.stop());
    videoEl.hidden = true;
    canvasEl.hidden = true;
    backgroundCanvasEl.hidden = false;
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.05, 100);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 0.9);
    sun.position.set(1, 3, 2);
    this.scene.add(sun);

    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  async loadModel() {
    const loader = new GLTFLoader();
    try {
      const gltf = await loader.loadAsync(this.cfg.model.url);
      this.penguin = gltf.scene;
      const scale = this.cfg.model.scale ?? 1;
      this.penguin.scale.setScalar(scale);
      this.scene.add(this.penguin);
      this.groundOffset = computeGroundOffset(this.penguin);

      if (gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.penguin);
        const clipNames = this.cfg.model.clipNames || {};
        const findClip = (wanted) => {
          if (!wanted) return null;
          const exact = gltf.animations.find((c) => c.name === wanted);
          if (exact) return exact;
          return gltf.animations.find((c) => c.name.toLowerCase() === wanted.toLowerCase()) || null;
        };
        const idleClip = findClip(clipNames.idle) || gltf.animations[0] || null;
        const walkClip = findClip(clipNames.walk) || idleClip;
        const talkClip = findClip(clipNames.talk) || idleClip;

        if (idleClip) this.actions.idle = this.mixer.clipAction(idleClip);
        if (walkClip) this.actions.walk = this.mixer.clipAction(walkClip);
        if (talkClip) this.actions.talk = this.mixer.clipAction(talkClip);
      } else {
        // No animation clips in this model (common for AI-generated meshes —
        // they're rarely rigged) — fall back to a simple procedural
        // waddle/bob instead of a skeletal walk cycle. See applyProceduralMotion.
        console.warn("[AR tour] model has no animation clips — using procedural motion instead.");
        this.mixer = null;
      }
    } catch (err) {
      console.warn("[AR tour] model failed to load, using a placeholder capsule:", err);
      this.penguin = buildPlaceholderPenguin();
      this.scene.add(this.penguin);
      this.groundOffset = computeGroundOffset(this.penguin);
    }
  }

  /** A bright ribbon on the ground running from just in front of the user's
   * feet out toward the next waypoint's bearing — the "AR line guiding them
   * around the pavement." Reoriented every frame to match the live bearing. */
  buildGuideLine() {
    const geometry = new THREE.PlaneGeometry(0.28, 3.2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff7a3d,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.guideLine = new THREE.Mesh(geometry, material);
    this.guideLine.rotation.x = -Math.PI / 2; // lie flat on the ground
    this.scene.add(this.guideLine);
  }

  playAnimationState(name) {
    if (!this.mixer) return;
    const next = this.actions[name];
    if (!next || next === this.currentAction) return;
    const prev = this.currentAction;
    next.reset().fadeIn(0.35).play();
    if (prev) prev.fadeOut(0.35);
    this.currentAction = next;
  }

  applyState() {
    const s = this.controller.state;
    if (s === "walking") this.playAnimationState("walk");
    else if (s === "idle") this.playAnimationState("idle");
    else if (s === "talking") this.playAnimationState("talk");
  }

  renderLoop() {
    const clock = new THREE.Clock();

    const tick = () => {
      const dt = clock.getDelta();

      if (this.isOpen) {
        if (this.mixer) this.mixer.update(dt);

        // Camera rotation follows the phone's orientation directly, so the
        // real-world video underneath visually pans as the user turns.
        this.camera.quaternion.copy(this.orientation.quaternion);

        // How far left/right of "where the camera is currently pointing" the
        // target waypoint is — computed once, shared by the penguin and the
        // guide line below.
        const relativeBearing =
          typeof this.location.bearingToTarget === "number"
            ? normalizeAngle(this.location.bearingToTarget - this.orientation.heading)
            : 0;

        // Deriving the placement direction from the camera's OWN current
        // forward vector (rather than from an independent absolute-compass
        // calculation) is the key fix here: it guarantees the penguin always
        // ends up exactly `standOff` meters in front of wherever the camera
        // is actually looking, no matter how the raw device-orientation
        // angles map to the camera's quaternion. Getting that mapping's
        // absolute reference frame slightly wrong (very possible — compass
        // conventions differ across iOS/Android/browsers) would otherwise
        // put the penguin anywhere in world space, including behind or
        // right on top of the camera, which reads as "I'm inside it."
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
        forward.y = 0;
        if (forward.lengthSq() < 1e-6) forward.set(0, 0, -1);
        forward.normalize();
        // Positive relativeBearing = target is to the right = clockwise from
        // above = negative rotation around three.js's (CCW, right-handed) Y axis.
        const targetDir = forward.applyAxisAngle(new THREE.Vector3(0, 1, 0), -toRad(relativeBearing));
        const rad = Math.atan2(targetDir.x, -targetDir.z);

        // Penguin: always visible, fixed stand-off in the direction of the
        // waypoint — reads as "just ahead of you," never receding toward a
        // target that might be 150m away, and never hidden between stops.
        if (this.penguin) {
          const standOff = this.cfg.model.standOffMeters ?? 2.5;
          const groundY = -0.9 + (this.groundOffset || 0);
          this.penguin.position.set(targetDir.x * standOff, groundY, targetDir.z * standOff);
          // -rad points the model's local -Z axis along targetDir (away from
          // the user) — the standard glTF "forward" convention. This
          // particular model was exported with its face toward local +Z
          // instead (confirmed by testing: without the +PI, its face pointed
          // at the user), so an extra 180° flip is needed to actually get its
          // back toward the camera. modelYawOffsetDeg in tour-config.json
          // lets this be tuned per-model instead of hardcoded, in case a
          // future replacement model uses the standard convention.
          const yawOffset = toRad(this.cfg.model.modelYawOffsetDeg ?? 0);
          this.penguin.rotation.y = -rad + yawOffset;
          if (!this.mixer) applyProceduralMotion(this.penguin, this.controller.state, dt);
        }

        // Ground guide line: a ribbon from just past the user's feet out
        // toward the same direction, so it visually leads from you to the
        // penguin and beyond, along the pavement.
        if (this.guideLine) {
          const lineDistance = 2.1;
          this.guideLine.position.set(targetDir.x * lineDistance, -0.95, targetDir.z * lineDistance);
          this.guideLine.rotation.z = -rad;
          this.guideLine.visible = this.controller.state !== "complete";
        }

        this.renderer.render(this.scene, this.camera);
      }

      requestAnimationFrame(tick);
    };

    tick();
  }
}

function buildPlaceholderPenguin() {
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

/** How far to lift a model's pivot so its lowest point sits at local y=0 —
 * handles both feet-pivoted exports and center-pivoted ones (e.g. most
 * AI-generated meshes) the same way, without hardcoding per-model numbers. */
function computeGroundOffset(object3d) {
  const box = new THREE.Box3().setFromObject(object3d);
  return Number.isFinite(box.min.y) ? -box.min.y : 0;
}

/** Gives an unrigged model some life — a side-to-side waddle plus a little
 * hop while walking, a gentle sway while idling/talking — since there's no
 * skeletal walk/idle/talk clip to play. Purely additive on top of the
 * position/rotation already set for this frame. */
function applyProceduralMotion(model, state, dt) {
  model.userData.t = (model.userData.t || 0) + dt;
  const t = model.userData.t;
  if (state === "walking") {
    model.rotation.z = Math.sin(t * 8) * 0.12;
    model.position.y += Math.abs(Math.sin(t * 8)) * 0.02;
  } else if (state === "talking") {
    model.rotation.z = Math.sin(t * 3) * 0.05;
  } else {
    model.rotation.z = Math.sin(t * 1.5) * 0.03;
  }
}

// ---------------------------------------------------------------------------
// BackgroundView — the default flat view when the camera isn't open: a
// simple top-down route map with a walking penguin icon. Uses real GPS
// progress along the route when available, otherwise just a gentle bob.
// ---------------------------------------------------------------------------
class BackgroundView {
  constructor(cfg, controller, location) {
    this.cfg = cfg;
    this.controller = controller;
    this.location = location;
    this.ctx = backgroundCanvasEl.getContext("2d");
    this.t = 0;
  }

  start() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.projectWaypoints();
    this.renderLoop();
  }

  resize() {
    backgroundCanvasEl.width = window.innerWidth * devicePixelRatio;
    backgroundCanvasEl.height = window.innerHeight * devicePixelRatio;
  }

  /** Simple equirectangular projection around the first waypoint, just to lay
   * the route out on screen — not a real map, just relative positions. */
  projectWaypoints() {
    const origin = this.cfg.waypoints[0];
    const metersPerDegLat = 111320;
    const metersPerDegLng = 111320 * Math.cos(toRad(origin.lat));
    const pts = this.cfg.waypoints.map((wp) => ({
      x: (wp.lng - origin.lng) * metersPerDegLng,
      y: (wp.lat - origin.lat) * metersPerDegLat,
    }));
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    this.points = pts.map((p) => ({
      nx: maxX === minX ? 0.5 : (p.x - minX) / (maxX - minX),
      ny: maxY === minY ? 0.5 : (p.y - minY) / (maxY - minY),
    }));
  }

  renderLoop() {
    const draw = () => {
      this.t += 1 / 60;
      const ctx = this.ctx;
      const w = backgroundCanvasEl.width;
      const h = backgroundCanvasEl.height;
      ctx.clearRect(0, 0, w, h);

      const pad = w * 0.12;
      const usable = { w: w - pad * 2, h: h * 0.5 };
      const top = h * 0.22;
      const toScreen = (p) => ({ x: pad + p.nx * usable.w, y: top + p.ny * usable.h });

      ctx.strokeStyle = "#c9d3ce";
      ctx.lineWidth = 4 * devicePixelRatio;
      ctx.beginPath();
      this.points.forEach((p, i) => {
        const s = toScreen(p);
        if (i === 0) ctx.moveTo(s.x, s.y);
        else ctx.lineTo(s.x, s.y);
      });
      ctx.stroke();

      this.points.forEach((p, i) => {
        const s = toScreen(p);
        const done = i < this.controller.index;
        const active = i === this.controller.index;
        ctx.beginPath();
        ctx.arc(s.x, s.y, (active ? 10 : 7) * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = done || active ? "#ff7a3d" : "#aab5b0";
        ctx.fill();
        ctx.fillStyle = "#33403a";
        ctx.font = `${12 * devicePixelRatio}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(this.cfg.waypoints[i].name, s.x, s.y + 26 * devicePixelRatio);
      });

      const cur = toScreen(this.points[this.controller.index]);
      let px = cur.x;
      let py = cur.y;
      if (this.controller.state === "walking" && this.controller.index > 0) {
        const prev = toScreen(this.points[this.controller.index - 1]);
        const bob = (Math.sin(this.t * 6) + 1) / 2;
        px = prev.x + (cur.x - prev.x) * 0.5;
        py = prev.y + (cur.y - prev.y) * 0.5 - bob * 6 * devicePixelRatio;
      }
      ctx.font = `${34 * devicePixelRatio}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("🐧", px, py);

      requestAnimationFrame(draw);
    };
    draw();
  }
}

// ---------------------------------------------------------------------------
// Boot sequence
// ---------------------------------------------------------------------------
async function boot() {
  const config = await loadConfig();
  tourTitleEl.textContent = config.tourName || "StoryStep AR Walk";
  if (config.tourSubtitle) tourSubtitleEl.textContent = config.tourSubtitle;

  const controller = new TourController(config.waypoints, {
    onStateChange: () => {
      arView.applyState();
      location.onControllerStateChange();
    },
    onComplete: () => {},
  });
  const location = new LocationTracker(controller);
  const orientation = new OrientationTracker();
  const arView = new ARView(config, controller, location, orientation);
  const backgroundView = new BackgroundView(config, controller, location);

  muteButtonEl.addEventListener("click", () => {
    const nowMuted = !controller.muted;
    controller.setMuted(nowMuted);
    muteButtonEl.textContent = nowMuted ? "🔇" : "🔊";
  });

  cameraToggleButtonEl.addEventListener("click", async () => {
    if (arView.isOpen) {
      arView.close();
      cameraToggleButtonEl.classList.remove("active");
      cameraToggleButtonEl.textContent = "📷";
      return;
    }
    try {
      await arView.open();
      cameraToggleButtonEl.classList.add("active");
      cameraToggleButtonEl.textContent = "✕";
    } catch (err) {
      console.warn("[AR tour] couldn't open camera:", err);
      const denied = err.name === "NotAllowedError" || String(err.message).includes("denied");
      showToast(
        denied
          ? "Camera access was denied — you can still follow along with narration and the map."
          : "Couldn't open the camera on this device. Narration keeps playing in the background."
      );
    }
  });

  startButtonEl.addEventListener("click", async () => {
    startScreenEl.hidden = true;
    hudEl.hidden = false;

    // Orientation permission (iOS) has to be requested from this direct tap;
    // geolocation doesn't strictly require a gesture but is requested here
    // too so both are ready before the tour visuals appear.
    try {
      await orientation.start();
    } catch (err) {
      console.warn("[AR tour] orientation permission denied:", err);
      showToast("Compass access was denied — turn-by-turn prompts won't be directional, but the tour still runs.");
    }

    location.start();
    backgroundView.start();

    // Continuously refresh the HUD regardless of which view is open.
    const hudLoop = () => {
      updateHud(controller, {
        distance: location.distance,
        bearingToTarget: location.bearingToTarget,
        heading: orientation.heading,
      });
      requestAnimationFrame(hudLoop);
    };
    hudLoop();
  });
}

boot().catch((err) => {
  console.error("[AR tour] fatal boot error:", err);
  tourTitleEl.textContent = "Couldn't load the tour";
  tourSubtitleEl.textContent = "Check your connection and reload.";
  startButtonEl.hidden = true;
});

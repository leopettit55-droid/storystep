# StoryStep AR Walk

A standalone, single-page browser AR walking tour. The tour itself — GPS
tracking, narration, waypoint progression — runs the moment you tap "Begin
the tour," independent of the camera. A camera icon in the HUD lets you open
an AR overlay at any time: a 3D penguin guide walking just ahead of you, plus
a guide line on the pavement pointing toward the next stop. Close the camera
and the tour keeps going exactly where it was — narration doesn't pause or
restart.

This is intentionally separate from the main StoryStep Expo app — it's plain
HTML/CSS/JS with Three.js loaded from a CDN, no build step, so it runs as-is
in mobile Safari and Chrome. No WebXR, no third-party AR service, no app
install: the camera is a plain `<video>` background, the "AR" is GPS bearing +
device compass driving where a Three.js model sits in view.

## Running it locally

From the repo root:

```bash
npx serve -l 5050 .
```

Then open `http://localhost:5050/ar-tour/` — or on a real phone, `http://<your-computer's-LAN-IP>:5050/ar-tour/`, since camera/geolocation require a secure context (`https://`, or `localhost`/a LAN IP is usually treated as trusted enough for local testing, but for a real phone test over Wi-Fi you'll likely need HTTPS — an ngrok/Cloudflare tunnel or a real deployment works for that).

To actually test the AR camera view, GPS, and compass, it has to run on a
**physical phone outdoors** — none of that is emulatable in a desktop browser
or an automated preview sandbox. What *is* fully testable anywhere is
everything else: tapping "Begin the tour" starts real GPS tracking (or, if
that's unavailable/denied, an automatic 20-second-per-stop timer instead),
and the flat background map + narration state machine run identically either
way — that whole loop, including the camera-denied toast, was verified in a
sandboxed browser with no camera/GPS access at all.

## Configuring a tour — `tour-config.json`

```json
{
  "tourName": "...",
  "model": {
    "url": "path/or/url/to/your-penguin.glb",
    "scale": 0.55,
    "clipNames": { "idle": "Idle", "walk": "Walk", "talk": "Talk" }
  },
  "waypoints": [
    { "id": "...", "name": "...", "lat": 0, "lng": 0, "radiusMeters": 35, "audioFile": "path/to/clip.mp3" }
  ]
}
```

- `radiusMeters` is how close (in meters) the user needs to be for that stop
  to trigger.
- `audioFile` paths are relative to `ar-tour/index.html` — the shipped config
  points at the real Mayfair tour audio in `../assets/audio/mayfair/`.
- `clipNames` maps the engine's three states to your model's actual animation
  clip names (case-sensitive first, falls back to case-insensitive). Only
  `idle` is strictly required — `walk`/`talk` fall back to `idle` if missing
  or not found.

## The model

`assets/models/penguin.glb` is the real penguin, ~0.66m tall in-scene. Checked
with `inspect-glb.cjs` (run `node inspect-glb.cjs assets/models/penguin.glb`
on any GLB to see this): **0 animations, 0 skins** — a static mesh with no
rig, which is normal for an AI-generated 3D export rather than something
hand-rigged in Blender/Maya. The engine detects that automatically and plays
a procedural waddle-and-hop (`applyProceduralMotion` in app.js) instead of a
skeletal walk cycle, so it's not just standing frozen. If you later get a
rigged version with real Idle/Walk/Talk clips, drop it in and update
`clipNames` if the clip names differ — no other change needed, the engine
prefers real clips automatically when `gltf.animations.length > 0`.

Ground alignment (`computeGroundOffset`) uses the model's actual bounding box
rather than assuming its pivot is at its feet — this one's pivot is at its
vertical center, which the engine compensates for automatically. If a model
fails to load entirely, it falls back to a simple procedural capsule shape
rather than breaking the tour.

## How it's structured

Three independent pieces, wired together but none of them owning the others:

- **`TourController`** — waypoint index, walking/idle/talking/complete state,
  narration audio. Doesn't know or care whether the camera is open.
- **`LocationTracker`** — the single GPS watcher, started once at "Begin the
  tour." Computes live distance/bearing to the current waypoint and tells the
  controller when to advance. If geolocation is unavailable or denied, it
  transparently switches to a fixed 20-second-per-stop timer so narration
  still plays through the whole tour.
- **`ARView`** — a pure visual layer, opened/closed independently via the HUD
  camera button. Reads live position from `LocationTracker` and compass data
  from `OrientationTracker`; doesn't own GPS itself. Closing it just hides the
  camera/canvas and shows the flat `BackgroundView` again — the tour
  underneath never stops or resets.

## How the AR placement works

No SLAM/plane-detection, no WebXR — Apple has never shipped WebXR in Safari,
so any approach requiring it doesn't run cross-platform. Instead:

- The device compass (`deviceorientation`) drives the Three.js camera's
  rotation every frame, so turning the phone turns the "world."
- The penguin is **always visible** while the camera is open (not just near a
  waypoint) at a **fixed 1.5m stand-off**, in the real compass direction of
  the next waypoint. It doesn't recede toward the literal remaining distance
  (which could be 100+ meters — visually meaningless at that scale); instead
  it reads as a guide walking just ahead of you, the same way Pokémon GO's
  buddy or similar AR-companion experiences work.
- A bright ribbon (`ARView.buildGuideLine`) lies flat on the ground a couple
  of meters out, oriented along that same bearing each frame — the "AR line
  on the pavement" pointing where to go.
- GPS distance/radius is used only to decide *when* to switch from walking to
  idle→talk and trigger audio — not for visual placement distance.

## Known limitations

- Android's compass heading (`alpha` from `deviceorientationabsolute`) can
  drift without a proper calibration figure-8 gesture — this doesn't attempt
  sensor fusion/calibration beyond what the browser gives it.
- Screen-orientation compensation (portrait vs landscape) is handled, but has
  only been reasoned through against the standard W3C algorithm, not verified
  against a real device in every orientation.
- No offline/service-worker caching — needs a live connection for the model
  CDN and audio files.

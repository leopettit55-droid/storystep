-- Leaderboards and tour photos (Cloudflare D1). Photo files live in the PHOTOS KV namespace.

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  -- SHA-256 of the user's secret key; the key itself is never stored.
  key_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

-- One row per finished tour. sec is null when the walk doesn't count for speed.
CREATE TABLE IF NOT EXISTS completions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid TEXT NOT NULL,
  name TEXT NOT NULL,
  tour TEXT NOT NULL,
  sec INTEGER,
  at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS completions_at ON completions (at);
CREATE INDEX IF NOT EXISTS completions_user_tour ON completions (uid, tour, at);

CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,
  uid TEXT NOT NULL,
  name TEXT NOT NULL,
  tour TEXT NOT NULL,
  tour_name TEXT NOT NULL,
  stop TEXT NOT NULL,
  stop_name TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  is_public INTEGER NOT NULL,
  seconds INTEGER,
  completed_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  content_type TEXT NOT NULL,
  hidden INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS photos_tour ON photos (tour, created_at);
CREATE INDEX IF NOT EXISTS photos_user ON photos (uid, created_at);

-- One report per person per photo.
CREATE TABLE IF NOT EXISTS photo_reports (
  photo_id TEXT NOT NULL,
  uid TEXT NOT NULL,
  reason TEXT NOT NULL,
  at INTEGER NOT NULL,
  PRIMARY KEY (photo_id, uid)
);

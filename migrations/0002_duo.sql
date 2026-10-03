-- Walk with a friend: one row per tour two people finished together.
-- uid_a / uid_b are stored in sorted order, so a pair is always the same (uid_a, uid_b).

CREATE TABLE IF NOT EXISTS duo_completions (
  id TEXT PRIMARY KEY,
  tour TEXT NOT NULL,
  uid_a TEXT NOT NULL,
  name_a TEXT NOT NULL,
  uid_b TEXT NOT NULL,
  name_b TEXT NOT NULL,
  -- Start-to-finish seconds, or null when the walk doesn't count for speed (a stop was skipped).
  sec INTEGER,
  at INTEGER NOT NULL,
  rating_a INTEGER,
  rating_b INTEGER
);
CREATE INDEX IF NOT EXISTS duo_completions_at ON duo_completions (at);
CREATE INDEX IF NOT EXISTS duo_completions_tour ON duo_completions (tour, at);
CREATE INDEX IF NOT EXISTS duo_completions_pair ON duo_completions (uid_a, uid_b);

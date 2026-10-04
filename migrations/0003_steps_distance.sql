-- Distance and steps for each finished walk (Distance and Steps leaderboards).
-- meters: walked, from GPS or Apple Health. steps: from Apple Health (steps_health = 1)
-- or estimated from the distance. duo = 1: walked with a friend, which counts for
-- distance and steps but not the solo speed and "most tours" boards.
ALTER TABLE completions ADD COLUMN meters INTEGER;
ALTER TABLE completions ADD COLUMN steps INTEGER;
ALTER TABLE completions ADD COLUMN steps_health INTEGER NOT NULL DEFAULT 0;
ALTER TABLE completions ADD COLUMN duo INTEGER NOT NULL DEFAULT 0;

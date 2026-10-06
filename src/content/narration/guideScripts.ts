/**
 * What a guide says in their own recording of a stop, when it isn't the
 * stop's standard script — keyed like the cues: "<waypoint id>@<guide id>".
 * The subtitles for that recording show these lines (in English: the
 * translated subtitles follow the standard script), and
 * scripts/build-narration-cues.ts times them against the recording.
 * Re-run that script after changing a line here.
 */
// Empty since every guide's recordings are made from the stops' own scripts
// (scripts/build-guide-voices.ts). Add an entry if a guide records their own words.
export const GUIDE_SCRIPTS: Record<string, string> = {};

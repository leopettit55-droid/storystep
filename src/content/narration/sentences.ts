/** Abbreviations whose full stop doesn't end a sentence ("St. Mary's"). */
const ABBREVIATIONS = new Set(["st", "dr", "mr", "mrs", "ms", "prof", "rev", "no", "vs", "etc"]);

/**
 * Splits an English narration script into subtitle-sized sentences. Shared
 * by the app (to show captions) and scripts/build-narration-cues.ts (to time
 * them against the recording), so both always agree on sentence N. A
 * translation's subtitles must have exactly one line per sentence here.
 */
export function splitSentences(script: string): string[] {
  const sentences: string[] = [];
  for (const paragraph of script.split(/\n\s*\n/)) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    let current: string[] = [];
    words.forEach((word, i) => {
      current.push(word);
      const endsSentence = /[.!?]["'”’)]*$/.test(word);
      const bare = word.replace(/[.!?"'”’)]+$/, "").toLowerCase();
      // "C. S. Lewis": a lone capital letter with a full stop is an initial.
      const isInitial = /^[A-Z]\.$/.test(word);
      const isLast = i === words.length - 1;
      if (isLast || (endsSentence && !isInitial && !ABBREVIATIONS.has(bare))) {
        sentences.push(current.join(" "));
        current = [];
      }
    });
  }
  return sentences;
}

/** Index of the paragraph-opening sentences (used to anchor timings to the recording's long pauses). */
export function paragraphStarts(script: string): Set<number> {
  const starts = new Set<number>();
  let count = 0;
  for (const paragraph of script.split(/\n\s*\n/)) {
    if (!paragraph.trim()) continue;
    starts.add(count);
    count += splitSentences(paragraph).length;
  }
  return starts;
}

/**
 * Writes each tour guide's avatar to assets/guides/avatar-<name>.svg, for
 * design tools, marketing and the website. The app draws the guides from
 * src/guides/guides.ts — edit them there and re-run this so the files match:
 *   npx tsx scripts/export-guide-avatars.ts
 */
import fs from "node:fs";
import path from "node:path";
import { GUIDES } from "../src/guides/guides";

const OUT_DIR = path.resolve(__dirname, "..", "assets/guides");
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const guide of GUIDES) {
  const slug = guide.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const file = path.join(OUT_DIR, `avatar-${slug}.svg`);
  const svg =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<!-- ${guide.name} — StoryStep tour guide. Generated from src/guides/guides.ts. -->\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="200" height="240">${guide.svg}\n</svg>\n`;
  fs.writeFileSync(file, svg);
  console.log(`Wrote ${path.relative(process.cwd(), file)}`);
}

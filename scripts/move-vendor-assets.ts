/**
 * Post-build step for the web export (run after `npx expo export -p web`).
 *
 * Expo copies assets that come from packages (the Ionicons font and the other
 * icon fonts, React Navigation's back icons) to dist/assets/node_modules/.
 * `wrangler pages deploy` never uploads a folder called node_modules, so on
 * Cloudflare those URLs fell through to index.html and every icon drew as an
 * empty box. This moves them to dist/assets/vendor/ and points the bundle there.
 *
 * Usage: npx tsx scripts/move-vendor-assets.ts
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve(__dirname, "..", "dist");
const FROM = path.join(DIST, "assets", "node_modules");
const TO = path.join(DIST, "assets", "vendor");

if (fs.existsSync(FROM)) {
  fs.rmSync(TO, { recursive: true, force: true });
  fs.renameSync(FROM, TO);

  let rewritten = 0;
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(file);
      } else if (/\.(js|html|css|json)$/.test(entry.name)) {
        const text = fs.readFileSync(file, "utf8");
        if (text.includes("/assets/node_modules/")) {
          fs.writeFileSync(file, text.replaceAll("/assets/node_modules/", "/assets/vendor/"));
          rewritten++;
        }
      }
    }
  };
  walk(DIST);
  console.log(`Moved package assets to dist/assets/vendor and updated ${rewritten} file(s).`);
}

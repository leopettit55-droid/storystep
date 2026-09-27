/**
 * Post-build step for the web export (run after `npx expo export -p web`).
 *
 * The site is a single-page app, so every address serves the same
 * dist/index.html. This writes a static copy per tour at
 * dist/tour/<id>/index.html with that tour's own <title>, description,
 * canonical link, Open Graph/Twitter tags and TouristTrip structured data, so
 * each tour can be found and previewed on its own. The app still loads on top
 * of the page as normal. It also regenerates dist/sitemap.xml.
 *
 * Usage: npx tsx scripts/build-tour-pages.ts
 */
import fs from "node:fs";
import path from "node:path";

const SITE = "https://storystep.site";
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

// The tour files `require()` images and audio for the bundler. Here we only
// need to know which file each one is, so a require of an asset returns its path.
for (const ext of [".jpg", ".jpeg", ".png", ".webp", ".mp3", ".m4a", ".wav", ".glb"]) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require.extensions[ext] = (module, filename) => {
    module.exports = filename;
  };
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { areas } = require("../src/content") as typeof import("../src/content");

type Area = (typeof areas)[number];

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Replaces an existing tag matched by `pattern`, or adds `tag` before </head>. */
function setTag(html: string, pattern: RegExp, tag: string): string {
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setMeta(html: string, attr: "name" | "property", key: string, content: string): string {
  const pattern = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  return setTag(html, pattern, `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`);
}

function removeMeta(html: string, attr: "name" | "property", key: string): string {
  return html.replace(new RegExp(`\\s*<meta ${attr}="${key}" content="[^"]*"\\s*/?>`), "");
}

function tourUrl(area: Area): string {
  return `${SITE}/tour/${area.id}`;
}

/** Copies the tour's photo to a stable address for link previews. */
function publishImage(area: Area): string | null {
  const source = typeof area.image === "string" ? (area.image as string) : null;
  if (!source || !fs.existsSync(source)) return null;
  const name = `${area.id}${path.extname(source).toLowerCase()}`;
  fs.mkdirSync(path.join(DIST, "og"), { recursive: true });
  fs.copyFileSync(source, path.join(DIST, "og", name));
  return `${SITE}/og/${name}`;
}

/** schema.org TouristTrip: the stops in order, and a free Offer. No ratings or reviews. */
function structuredData(area: Area, imageUrl: string | null): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: area.name,
    description: area.description,
    url: tourUrl(area),
    ...(imageUrl ? { image: imageUrl } : {}),
    touristType: "Walkers",
    provider: { "@type": "Organization", name: "StoryStep", url: `${SITE}/` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: tourUrl(area),
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: area.route.length,
      itemListElement: area.route.map((stop, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristAttraction",
          name: stop.name,
          geo: { "@type": "GeoCoordinates", latitude: stop.coordinates.lat, longitude: stop.coordinates.lng },
        },
      })),
    },
  };
  // "<" is escaped so nothing in the data can close the <script> tag early.
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

function tourPage(template: string, area: Area): string {
  const title = `${area.name}: free audio walking tour of ${area.city} | StoryStep`;
  const description = area.description;
  const url = tourUrl(area);
  const imageUrl = publishImage(area);

  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);

  html = setMeta(html, "property", "og:type", "website");
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  if (imageUrl) {
    html = setMeta(html, "property", "og:image", imageUrl);
    html = setMeta(html, "name", "twitter:image", imageUrl);
    // The site-wide size tags describe og-image.jpg, not the tour photo.
    html = removeMeta(html, "property", "og:image:width");
    html = removeMeta(html, "property", "og:image:height");
  }

  html = html.replace(
    "</head>",
    `    <script type="application/ld+json">\n${structuredData(area, imageUrl)}\n    </script>\n  </head>`
  );
  return html;
}

function sitemap(tours: Area[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const entry = (loc: string, changefreq: string, priority: string) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    entry(`${SITE}/`, "weekly", "1.0"),
    entry(`${SITE}/tours`, "weekly", "0.9"),
    ...tours.map((a) => entry(tourUrl(a), "monthly", "0.8")),
    `</urlset>`,
    ``,
  ].join("\n");
}

function main() {
  const templatePath = path.join(DIST, "index.html");
  if (!fs.existsSync(templatePath)) {
    throw new Error("dist/index.html not found. Run `npx expo export -p web` first.");
  }
  const template = fs.readFileSync(templatePath, "utf8");

  // Only tours people can actually take (finished, and not scanner-only).
  const tours = areas.filter((a) => a.isContentComplete && !a.scannerOnly);
  for (const area of tours) {
    const dir = path.join(DIST, "tour", area.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), tourPage(template, area));
  }
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap(tours));
  console.log(`Wrote ${tours.length} tour pages and sitemap.xml (${tours.length + 2} URLs).`);
}

main();

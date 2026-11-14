// Runs after `vite build` (see package.json "build"). Renders every public route to static HTML so
// crawlers (and visitors without JavaScript) get real text, title, description, canonical, Open Graph
// and JSON-LD. The browser still loads the normal React app, which hydrates over this HTML.
//
// Output in dist/:  index.html (home) and <route>/index.html per page, sitemap.xml, app-shell.html
// (the empty SPA shell: vercel.json serves it for any URL that is not a real page).
import { build } from "vite";
import { pathToFileURL } from "node:url";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

await build({
  logLevel: "warn",
  build: { ssr: "src/entry-server.jsx", outDir: ssrDir, emptyOutDir: true, copyPublicDir: false },
});
const { render, ROUTES, SITE } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html has no empty <div id="root"></div>');

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

// React 19 puts the <title>, <meta> and <link> tags from <Helmet> at the very start of the output.
function splitHead(html) {
  const re = /^(?:<title>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*>)/;
  const tags = [];
  let rest = html;
  for (let m; (m = rest.match(re)); rest = rest.slice(m[0].length)) tags.push(m[0]);
  return { tags, body: rest };
}

// Per-page tags replace the template's home-page ones; generic ones (og:type, og:image, twitter:card ...) are kept unless the page sets them.
const PAGE_KEYS = ["title", "meta:description", "link:canonical", "meta:og:url", "meta:og:title", "meta:og:description", "meta:twitter:title", "meta:twitter:description"];
function keyOf(tag) {
  if (tag.startsWith("<title")) return "title";
  const kind = tag.startsWith("<meta") ? "meta" : "link";
  const id = attr(tag, "name") ?? attr(tag, "property") ?? attr(tag, "rel");
  return id && `${kind}:${id}`;
}

function buildPage(route, rendered) {
  const split = splitHead(rendered);
  const body = split.body;
  // React preloads every <img> it renders; keep only the first high-priority one (the hero) so the page does not fetch a pile of images up front.
  let heroKept = false;
  const tags = split.tags.filter((t) => {
    if (!/rel="preload"/.test(t) || !/as="image"/.test(t)) return true;
    if (heroKept || !/fetchPriority="high"/i.test(t)) return false;
    return (heroKept = true);
  });
  const keys = new Set(tags.map(keyOf));
  const title = tags.find((t) => t.startsWith("<title"))?.replace(/<\/?title>/g, "");
  const desc = attr(tags.find((t) => keyOf(t) === "meta:description") ?? "", "content");
  if (!title || desc === undefined) throw new Error(`${route}: page has no <title> or meta description`);
  const extra = [];
  if (!keys.has("link:canonical")) extra.push(`<link rel="canonical" href="${SITE}${route === "/" ? "/" : route}"/>`);
  if (!keys.has("meta:og:url")) extra.push(`<meta property="og:url" content="${SITE}${route === "/" ? "/" : route}"/>`);
  if (!keys.has("meta:og:title")) extra.push(`<meta property="og:title" content="${title}"/>`);
  if (!keys.has("meta:og:description")) extra.push(`<meta property="og:description" content="${esc(desc)}"/>`);
  if (!keys.has("meta:twitter:title")) extra.push(`<meta name="twitter:title" content="${title}"/>`);
  if (!keys.has("meta:twitter:description")) extra.push(`<meta name="twitter:description" content="${esc(desc)}"/>`);

  let head = template;
  const drop = new Set([...PAGE_KEYS, ...keys]);
  head = head.replace(/<title>[\s\S]*?<\/title>\s*/, "");
  head = head.replace(/[ \t]*<(meta|link)\b[^>]*>\s*/g, (m) => (drop.has(keyOf(m.trim())) ? "" : m));
  head = head.replace("</head>", `    ${[...tags, ...extra].join("\n    ")}\n  </head>`);
  return head.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const report = [];
for (const route of ROUTES) {
  const html = buildPage(route, await render(route));
  const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, route, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  report.push(`${route} ${(html.length / 1024).toFixed(1)} KB`);
}

// SPA shell for URLs that are not real pages: no canonical, and noindex so they never compete with real pages.
const shell = template
  .replace(/[ \t]*<link rel="canonical"[^>]*>\s*/, "")
  .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, follow" />');
await writeFile(path.join(dist, "app-shell.html"), shell);

const urls = ROUTES.map((r) => `  <url><loc>${SITE}${r === "/" ? "/" : r}</loc></url>`).join("\n");
await writeFile(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${ROUTES.length} pages + app-shell.html + sitemap.xml\n  ${report.join("\n  ")}`);

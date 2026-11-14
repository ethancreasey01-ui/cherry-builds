// Checks the built dist/ (run `npm run build` first): every page in sitemap.xml has real text, one <title>, a
// meta description, a canonical equal to its own URL, Open Graph tags and JSON-LD that parses and has the
// schema.org basics. Also checks robots.txt points at the sitemap. Exit code 1 on any problem.
import { readFile } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const origin = new URL(urls[0]).origin;
const problems = [];
const bad = (route, msg) => problems.push(`${route}: ${msg}`);
const TYPES = new Set(["LocalBusiness", "Plumber", "GeneralContractor", "HomeAndConstructionBusiness", "Service", "ItemList", "FAQPage", "Organization"]);

function checkLd(route, node) {
  if (node["@context"] !== "https://schema.org") bad(route, "JSON-LD missing @context https://schema.org");
  const types = [].concat(node["@type"] ?? []);
  if (!types.length || !types.every((t) => TYPES.has(t))) bad(route, `JSON-LD unexpected @type ${JSON.stringify(node["@type"])}`);
  if (types.includes("LocalBusiness")) {
    for (const k of ["name", "telephone", "address", "url", "areaServed"]) if (!node[k]) bad(route, `LocalBusiness missing ${k}`);
    for (const k of ["aggregateRating", "openingHoursSpecification", "geo", "priceRange"]) if (k in node) bad(route, `LocalBusiness has ${k}, which is not shown on the site`);
  }
  if (types.includes("FAQPage") && !node.mainEntity?.length) bad(route, "FAQPage has no questions");
  if (types.includes("ItemList") && !node.itemListElement?.length) bad(route, "ItemList is empty");
  const str = JSON.stringify(node);
  if (/\bundefined\b|\bNaN\b|https?:\/\/(?!www\.)(?:cherrybuilds|aquatightwaterproofing)\./.test(str)) bad(route, "JSON-LD has undefined/NaN or a non-www URL");
}

for (const url of urls) {
  const route = new URL(url).pathname;
  const file = path.join(dist, route === "/" ? "index.html" : `${route}/index.html`);
  const html = await readFile(file, "utf8").catch(() => null);
  if (!html) { bad(route, "no prerendered file"); continue; }
  const count = (re) => (html.match(re) ?? []).length;
  const get = (re) => html.match(re)?.[1];
  if (count(/<title>/g) !== 1) bad(route, `${count(/<title>/g)} <title> tags`);
  const desc = get(/<meta name="description" content="([^"]*)"/);
  if (!desc || desc.length < 50 || desc.length > 320) bad(route, `meta description length ${desc?.length}`);
  if (count(/<meta name="description"/g) !== 1) bad(route, "duplicate meta description");
  if (get(/<link rel="canonical" href="([^"]*)"/) !== url) bad(route, `canonical is ${get(/<link rel="canonical" href="([^"]*)"/)}, expected ${url}`);
  if (count(/<link rel="canonical"/g) !== 1) bad(route, "duplicate canonical");
  for (const p of ["og:title", "og:description", "og:url", "og:image", "og:type"]) {
    if (count(new RegExp(`<meta property="${p}"`, "g")) !== 1) bad(route, `${p} should appear exactly once`);
  }
  if (get(/<meta property="og:url" content="([^"]*)"/) !== url) bad(route, "og:url is not the page URL");
  if (count(/<h1[ >]/g) !== 1) bad(route, `${count(/<h1[ >]/g)} <h1> tags`);
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ").replace(/\s+/g, " ");
  if (text.length < 600) bad(route, `only ${text.length} characters of visible text`);
  if (!html.includes("AW-")) bad(route, "Google tag missing");
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { checkLd(route, JSON.parse(m[1])); } catch (e) { bad(route, `JSON-LD does not parse: ${e.message}`); }
  }
}
const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) bad("robots.txt", `does not point at ${origin}/sitemap.xml`);
const shell = await readFile(path.join(dist, "app-shell.html"), "utf8");
if (!shell.includes("noindex") || shell.includes('rel="canonical"')) bad("app-shell.html", "should be noindex with no canonical");

if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(`seo check OK: ${urls.length} pages (${origin})`);

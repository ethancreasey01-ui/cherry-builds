// Build-time only: renders a route to static HTML for scripts/prerender.mjs. Never shipped to the browser.
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { SERVICES, PROJECTS } from "./data/index.js";

export const SITE = "https://www.cherrybuilds.com.au";

// Every public URL (also becomes sitemap.xml). Keep in step with the <Routes> in App.jsx.
export const ROUTES = [
  "/",
  ...SERVICES.map((s) => `/services/${s.slug}`),
  "/service-areas",
  ...PROJECTS.map((p) => `/projects/${p.slug}`),
];

async function toString(stream) {
  const decoder = new TextDecoder();
  let out = "";
  for await (const chunk of stream) out += decoder.decode(chunk, { stream: true });
  return out + decoder.decode();
}

export async function render(url) {
  const { prelude } = await prerender(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  return toString(prelude);
}

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App.jsx";
import { initCallTracking, captureClickIds } from "./tracking.js";

captureClickIds();
initCallTracking();

const tree = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Pages are prerendered at build time (scripts/prerender.mjs): take over that HTML. The empty app shell
// (used for unknown URLs) has no content to hydrate, so it renders from scratch.
const rootEl = document.getElementById("root");
if (rootEl.hasChildNodes()) hydrateRoot(rootEl, tree);
else createRoot(rootEl).render(tree);

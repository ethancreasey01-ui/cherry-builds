import { useSyncExternalStore } from "react";
import { WEBSITE_CALL_LABEL, PHONE_DISPLAY, PHONE_TEL } from "./tracking.js";

// Shared phone state. Starts as the real number; swapped for Google's forwarding number if one is returned.
let current = { display: PHONE_DISPLAY, tel: PHONE_TEL };
const listeners = new Set();
let started = false;

function start() {
  started = true;
  if (!WEBSITE_CALL_LABEL) return;
  let tries = 0;
  const attempt = () => {
    if (typeof window._googWcmGet === "function") {
      window._googWcmGet((formatted, mobile) => {
        const display = formatted || mobile;
        if (!display) return;
        current = { display, tel: (mobile || formatted).replace(/[^\d+]/g, "") };
        listeners.forEach((l) => l());
      }, PHONE_DISPLAY);
    } else if (tries++ < 20) {
      setTimeout(attempt, 500);
    }
  };
  attempt();
}

function subscribe(listener) {
  if (!started) start();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Returns { display, tel } - the number to show and the digits for the tel: link
export default function usePhoneNumber() {
  return useSyncExternalStore(subscribe, () => current);
}

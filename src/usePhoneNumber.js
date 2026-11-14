import { useSyncExternalStore } from "react";
import { getPhone, subscribePhone, PHONE_DISPLAY, PHONE_TEL } from "./tracking.js";

// Server/prerender and first hydration pass use `initial` (the real number), so the static HTML matches.
const initial = { display: PHONE_DISPLAY, tel: PHONE_TEL };

// Returns { display, tel } - the number to show and the digits for the tel: link
export default function usePhoneNumber() {
  return useSyncExternalStore(subscribePhone, getPhone, () => initial);
}

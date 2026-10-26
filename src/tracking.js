export const ADS_ID = "AW-17973575816";
// Google Ads "Website call" conversion label (the part after the slash). Empty = forwarding number disabled.
export const WEBSITE_CALL_LABEL = "8HspCKXeiKodEIiBvPpC";
export const PHONE_DISPLAY = "0408 827 996";
export const PHONE_TEL = "0408827996";

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"];
const CLICK_ID_TTL_MS = 90 * 24 * 60 * 60 * 1000;

// Enable Google's website-call forwarding number (no-op until a label is set)
export function initCallTracking() {
  if (!WEBSITE_CALL_LABEL || !window.gtag) return;
  window.gtag("config", `${ADS_ID}/${WEBSITE_CALL_LABEL}`, { phone_conversion_number: PHONE_TEL });
}

// Remember ad click IDs from the landing URL for 90 days
export function captureClickIds() {
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of CLICK_ID_KEYS) {
      const value = params.get(key);
      if (value) {
        localStorage.setItem(`ct_${key}`, JSON.stringify({ value, expires: Date.now() + CLICK_ID_TTL_MS }));
      }
    }
  } catch {
    // storage unavailable
  }
}

export function getClickId(key) {
  try {
    const stored = JSON.parse(localStorage.getItem(`ct_${key}`));
    if (stored && stored.expires > Date.now()) return stored.value;
    if (stored) localStorage.removeItem(`ct_${key}`);
  } catch {
    // storage unavailable or corrupt
  }
  return "";
}

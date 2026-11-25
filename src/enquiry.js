import { getClickId } from "./tracking.js";

// The one enquiry endpoint (Formspree) and send path, shared by the full form (Home) and the quick form (service pages).
export const ENQUIRY_URL = "https://formspree.io/f/meewklkk";
export const ENQUIRY_SUBJECT = "New enquiry from Cherry Builds website";

// Fields every enquiry carries, whichever form it came from (ad click IDs let Google Ads match the lead)
export const hiddenEnquiryFields = () => ({
  _subject: ENQUIRY_SUBJECT,
  gclid: getClickId("gclid"),
  gbraid: getClickId("gbraid"),
  wbraid: getClickId("wbraid"),
});

// POST a form's data to Formspree; throws if it didn't go through. Fires the Google Ads "Form Enquiry"
// conversion only on a real successful send.
export async function sendEnquiry(form) {
  const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Form send failed");
  if (window.gtag) {
    window.gtag("event", "conversion", { send_to: "AW-17973575816/eCcUCJqgsLQcEIiBvPpC" });
  }
}

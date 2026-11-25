import React from "react";
import { Phone, Send, Check } from "lucide-react";
import usePhoneNumber from "../usePhoneNumber.js";
import { ENQUIRY_URL, hiddenEnquiryFields, sendEnquiry } from "../enquiry.js";

// Short version of the Home contact form for phones landing on a service page: same endpoint, same field names
// (name goes in first_name; last_name, email and suburb are sent empty). The full form stays on the home page.
const inputClass = "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-neutral-800 text-base focus:outline-none focus:ring-2 focus:ring-cherry-600";
const labelClass = "block text-xs font-semibold text-neutral-600 mb-1";

export default function QuickEnquiry({ service }) {
  const phone = usePhoneNumber();
  const [status, setStatus] = React.useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendEnquiry(e.target);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
      <a
        href={`tel:${phone.tel}`}
        className="flex items-center justify-center gap-2 text-white font-semibold text-base px-5 py-3 rounded-xl transition-colors hover:brightness-90"
        style={{ backgroundColor: "#a3343e" }}
      >
        <Phone className="w-4 h-4" />
        Call now · {phone.display}
      </a>
      <div className="flex items-center gap-3 my-3 text-xs text-neutral-500">
        <span className="flex-1 h-px bg-neutral-200" />
        or get a free {service.title.toLowerCase()} quote
        <span className="flex-1 h-px bg-neutral-200" />
      </div>

      {status === "sent" ? (
        <div role="status" className="flex flex-col items-center text-center gap-2 py-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fdf2f3", border: "1px solid #fce4e5" }}>
            <Check className="w-5 h-5" style={{ color: "#a3343e" }} />
          </div>
          <h3 className="font-semibold text-neutral-900">Enquiry sent!</h3>
          <p className="text-sm text-neutral-500">Thanks. We'll be in touch shortly with your obligation-free quote.</p>
        </div>
      ) : (
        <form action={ENQUIRY_URL} method="POST" onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
          {Object.entries({ ...hiddenEnquiryFields(), last_name: "", email: "", suburb: "" }).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="qe-name" className={labelClass}>Name</label>
              <input id="qe-name" type="text" name="first_name" required autoComplete="given-name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="qe-phone" className={labelClass}>Phone</label>
              <input id="qe-phone" type="tel" name="phone" required autoComplete="tel" className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="qe-message" className={labelClass}>What do you need?</label>
            <input id="qe-message" type="text" name="message" maxLength={200} placeholder="A few words, e.g. new ensuite" className={inputClass} />
          </div>
          {status === "error" && (
            <p role="alert" className="text-sm" style={{ color: "#a3343e" }}>
              Sorry, that didn't send. Please call us on {phone.display} instead.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 text-white font-semibold text-base py-3 rounded-xl transition-colors hover:brightness-90 disabled:opacity-60"
            style={{ backgroundColor: "#a3343e" }}
          >
            <Send className="w-4 h-4" />
            {status === "sending" ? "Sending…" : "Get My Free Quote"}
          </button>
        </form>
      )}
    </div>
  );
}

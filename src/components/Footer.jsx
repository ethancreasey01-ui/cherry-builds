import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a1a1a" }} className="text-neutral-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img
                src="/logos/cherry-builds-footer.png"
                alt="Cherry Builds"
                className="h-16 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="text-xs leading-relaxed mb-3">
              Melbourne's trusted renovation specialists: kitchens, bathrooms, full home renovations,
              decking, landscaping, and waterproofing.
            </p>
            <div className="text-xs space-y-0.5">
              <div>ABN: 60 122 151 679</div>
              <div>VBA Licence: DB-71349</div>
            </div>
          </div>

          <div>
            <div className="font-semibold text-white mb-3 text-sm">Services</div>
            <ul className="space-y-1.5 text-xs">
              {[
                { label: "Full Home Renovations",  slug: "full-home-renovations" },
                { label: "Bathroom Renovations",   slug: "bathroom-renovations" },
                { label: "Kitchen Renovations",    slug: "kitchen-renovations" },
                { label: "Decking & Landscaping",  slug: "decking-landscaping" },
                { label: "Tiling & Flooring",      slug: "tiling-flooring" },
                { label: "Waterproofing",          slug: "waterproofing" },
              ].map(({ label, slug }) => (
                <li key={slug}>
                  <a href={`/services/${slug}`} className="hover:text-cherry-400 transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-3 text-sm">Contact</div>
            <div className="space-y-2 text-xs">
              <a href="tel:0408827996" className="flex items-center gap-2 hover:text-cherry-400 transition-colors">
                <Phone className="w-3.5 h-3.5" /> 0408 827 996
              </a>
              <a href="mailto:info@cherrybuilds.com.au" className="flex items-center gap-2 hover:text-cherry-400 transition-colors">
                <Mail className="w-3.5 h-3.5" /> info@cherrybuilds.com.au
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>PO BOX 3109, Mentone East VIC 3194</span>
              </div>
              <a
                href="https://www.aquatightwaterproofing.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cherry-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Aquatight Waterproofing
              </a>
              <div className="pt-2 border-t border-white/10">
                <div className="text-white text-xs font-semibold mb-2">Follow us</div>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/cherrybuilds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-cherry-400 transition-colors text-xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/cherrybuildsmelb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-cherry-400 transition-colors text-xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="18.5" cy="5.5" r="1.5" fill="currentColor"/></svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>© {new Date().getFullYear()} Cherry Building and Construction Services. All rights reserved.</div>
          <div className="text-neutral-600">Master Builders Association of Victoria Member</div>
        </div>
      </div>
    </footer>
  );
}

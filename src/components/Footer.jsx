import { Phone, Mail, MapPin, ExternalLink, Hammer } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a1a1a" }} className="text-neutral-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-cherry-600 flex items-center justify-center">
                <Hammer className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white">Cherry Builds</span>
            </div>
            <p className="text-xs leading-relaxed mb-3">
              Melbourne's trusted renovation specialists — kitchens, bathrooms, full home renovations,
              decking, landscaping, and waterproofing.
            </p>
            <div className="text-xs space-y-0.5">
              <div>ABN: 60 122 151 679</div>
              <div>VBA Licence: DB – 71349</div>
            </div>
          </div>

          <div>
            <div className="font-semibold text-white mb-3 text-sm">Services</div>
            <ul className="space-y-1.5 text-xs">
              {["Full Home Renovations","Bathroom Renovations","Kitchen Renovations","Decking & Landscaping","Tiling & Flooring","Waterproofing"].map((s) => (
                <li key={s}>
                  <a href="/#services" className="hover:text-cherry-400 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-3 text-sm">Contact</div>
            <div className="space-y-2 text-xs">
              <a href="tel:0438499146" className="flex items-center gap-2 hover:text-cherry-400 transition-colors">
                <Phone className="w-3.5 h-3.5" /> 0438 499 146
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
                <ExternalLink className="w-3.5 h-3.5" /> Aqua Tight Waterproofing
              </a>
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

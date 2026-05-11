import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, Clock, Star } from "lucide-react";

const BADGES = [
  { icon: Award,        text: "Master Builders Member" },
  { icon: Shield,       text: "VBA Licence DB-71349" },
  { icon: CheckCircle,  text: "Fully Insured" },
  { icon: Clock,        text: "30+ Years Experience" },
  { icon: Star,         text: "Canteen Australia Sponsor" },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-b border-neutral-100">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-center flex-wrap gap-x-6 gap-y-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {BADGES.map((badge, i) => (
          <div key={badge.text} className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 whitespace-nowrap">
              <badge.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#a3343e" }} />
              {badge.text}
            </div>
            {i < BADGES.length - 1 && (
              <div className="hidden sm:block w-px h-3 bg-neutral-200" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

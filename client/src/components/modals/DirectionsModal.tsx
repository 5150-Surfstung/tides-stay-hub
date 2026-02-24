import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

interface DirectionsModalProps {
  onClose: () => void;
}

export default function DirectionsModal({ onClose }: DirectionsModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0d2a3a] border border-border rounded-2xl p-5 w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-base font-extrabold text-white">Leaving Stay Hub</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          This will open <span className="text-white font-semibold">Google Maps</span> for turn-by-turn directions back to Tides. To come back here, just tap the <span className="text-white font-semibold">Stay Hub icon</span> on your home screen.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-bold text-white hover:bg-white/5 transition-colors"
            data-testid="button-directions-cancel"
          >
            Stay Here
          </button>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Tides+Folly+Beach,+1+Center+Street,+Folly+Beach,+SC+29439"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-bold text-center hover:bg-primary/90 transition-colors"
            data-testid="button-directions-confirm"
          >
            Get Directions <ExternalLink className="w-3 h-3 opacity-50 inline ml-1" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

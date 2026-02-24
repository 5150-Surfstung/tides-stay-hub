import { motion } from "framer-motion";
import { Bell, X } from "lucide-react";

interface PushPromptBannerProps {
  onAccept: () => void;
  onDismiss: () => void;
}

export default function PushPromptBanner({ onAccept, onDismiss }: PushPromptBannerProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto z-50"
      data-testid="push-prompt"
    >
      <div className="bg-[#0d2a3a] border border-primary/30 rounded-2xl p-4 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-white text-sm">Get flash deals & specials?</div>
            <div className="text-xs text-muted-foreground mt-0.5">We'll send you exclusive deals during your stay. No spam — just savings.</div>
          </div>
          <button
            onClick={onDismiss}
            className="text-white/40 hover:text-white/60 shrink-0"
            data-testid="button-push-dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={onAccept}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
            data-testid="button-push-accept"
          >
            Yes, notify me
          </button>
          <button
            onClick={onDismiss}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-border text-white/60 font-bold text-sm hover:bg-white/10 transition-all active:scale-[0.98]"
            data-testid="button-push-reject"
          >
            No thanks
          </button>
        </div>
      </div>
    </motion.div>
  );
}

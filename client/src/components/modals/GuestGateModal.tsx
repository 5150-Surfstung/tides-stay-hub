import { motion } from "framer-motion";
import { Shield, Phone, CalendarCheck, ExternalLink } from "lucide-react";

interface GuestGateModalProps {
  guestName: string;
  guestRoom: string;
  onGuestNameChange: (value: string) => void;
  onGuestRoomChange: (value: string) => void;
  onVerify: () => void;
  onClose: () => void;
}

export default function GuestGateModal({
  guestName,
  guestRoom,
  onGuestNameChange,
  onGuestRoomChange,
  onVerify,
  onClose,
}: GuestGateModalProps) {
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
        className="bg-[#0d2a3a] border-2 border-border rounded-2xl p-5 w-full max-w-sm mb-safe"
        style={{ maxHeight: "calc(100vh - 2rem)", overflowY: "auto", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">Guest Verification</h3>
            <p className="text-xs text-muted-foreground">Quick check — for hotel guests only</p>
          </div>
        </div>
        <div className="space-y-4 mb-5">
          <div>
            <label className="text-sm font-bold text-white/70 mb-1.5 block">Last Name</label>
            <input
              type="text"
              autoComplete="family-name"
              enterKeyHint="next"
              value={guestName}
              onChange={(e) => onGuestNameChange(e.target.value)}
              placeholder="Last name on reservation"
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border-2 border-border text-white text-base placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              data-testid="input-guest-name"
              autoFocus
            />
          </div>
          <div>
            <label className="text-sm font-bold text-white/70 mb-1.5 block">Room Number</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              enterKeyHint="go"
              value={guestRoom}
              onChange={(e) => onGuestRoomChange(e.target.value)}
              placeholder="e.g. 301"
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border-2 border-border text-white text-base placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              data-testid="input-guest-room"
              onKeyDown={(e) => { if (e.key === "Enter") onVerify(); }}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border-2 border-border text-base font-bold text-white hover:bg-white/5 transition-colors active:scale-[0.97]"
            data-testid="button-guest-gate-cancel"
          >
            Cancel
          </button>
          <button
            onClick={onVerify}
            disabled={!guestName.trim() || !guestRoom.trim()}
            className="flex-1 py-3.5 rounded-xl bg-primary border-2 border-primary text-white text-base font-bold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
            data-testid="button-guest-gate-verify"
          >
            Continue
          </button>
        </div>
        <a
          href="tel:+18885280730"
          className="flex items-center justify-center gap-2 w-full py-3.5 mt-3 rounded-xl bg-primary/15 border-2 border-primary/30 text-primary font-bold text-base hover:bg-primary/25 transition-all active:scale-[0.97]"
          data-testid="link-call-frontdesk-gate"
        >
          <Phone className="w-5 h-5" />
          Call Front Desk
        </a>
        <div className="mt-5 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center mb-2.5">Not a guest?</p>
          <a
            href="https://www.tidesfollybeach.com/offers/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border-2 border-border text-primary font-bold text-sm hover:bg-white/10 transition-all active:scale-[0.97]"
            data-testid="link-book-stay"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Your Stay at Tides
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

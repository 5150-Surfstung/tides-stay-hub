import { motion } from "framer-motion";
import { Smartphone, X, Share, Plus, Download, MoreVertical, CheckCircle2 } from "lucide-react";

interface InstallGuideModalProps {
  onClose: () => void;
}

export default function InstallGuideModal({ onClose }: InstallGuideModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0d2a3a] border border-border rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#0d2a3a] border-b border-border/50 px-5 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-white font-display">Save to Home Screen</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors p-1" data-testid="button-close-install-guide">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Add this app to your home screen for instant access — just like a regular app. No download from the app store needed!
          </p>

          <PlatformInstructions
            icon={<svg viewBox="0 0 24 24" className="w-4 h-4 text-[#007AFF]" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>}
            iconBg="bg-[#007AFF]/20"
            title="iPhone / iPad (Safari)"
            steps={[
              <span key="1">Tap the <span className="inline-flex items-center gap-1 text-[#007AFF] font-semibold"><Share className="w-3.5 h-3.5" /> Share</span> button at the bottom of Safari</span>,
              <span key="2">Scroll down and tap <span className="inline-flex items-center gap-1 text-white font-semibold"><Plus className="w-3.5 h-3.5" /> Add to Home Screen</span></span>,
              <span key="3">Tap <span className="text-white font-semibold">Add</span> in the top right corner</span>,
            ]}
          />

          <div className="border-t border-border/30" />

          <PlatformInstructions
            icon={<svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3DDC84]" fill="currentColor"><path d="M17.523 2.592l1.487-2.574a.3.3 0 00-.521-.302L17 2.295A8.042 8.042 0 0012 1.058a8.04 8.04 0 00-5 1.237L5.511-.28a.3.3 0 00-.521.302l1.487 2.574A7.588 7.588 0 003 10.408h18a7.591 7.591 0 00-3.477-7.816zM8.5 7.908a1 1 0 110-2 1 1 0 010 2zm7 0a1 1 0 110-2 1 1 0 010 2zM3 11.908v8a2 2 0 002 2h1v3a1.5 1.5 0 003 0v-3h6v3a1.5 1.5 0 003 0v-3h1a2 2 0 002-2v-8H3zm-2.5 0a1.5 1.5 0 00-1.5 1.5v5a1.5 1.5 0 003 0v-5a1.5 1.5 0 00-1.5-1.5zm23 0a1.5 1.5 0 00-1.5 1.5v5a1.5 1.5 0 003 0v-5a1.5 1.5 0 00-1.5-1.5z"/></svg>}
            iconBg="bg-[#3DDC84]/20"
            title="Android / Samsung (Chrome)"
            steps={[
              <span key="1">Tap the <span className="inline-flex items-center gap-1 text-white font-semibold"><MoreVertical className="w-3.5 h-3.5" /> three dots</span> menu in the top right of Chrome</span>,
              <span key="2">Tap <span className="inline-flex items-center gap-1 text-white font-semibold"><Download className="w-3.5 h-3.5" /> Add to Home screen</span> or <span className="text-white font-semibold">Install app</span></span>,
              <span key="3">Tap <span className="text-white font-semibold">Add</span> or <span className="text-white font-semibold">Install</span> to confirm</span>,
            ]}
          />

          <div className="border-t border-border/30" />

          <PlatformInstructions
            icon={<svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FF6600]" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5S3.5 16.687 3.5 12 7.313 3.5 12 3.5zM8 10.5L12 6l4 4.5h-3V15H11v-4.5H8z"/></svg>}
            iconBg="bg-[#FF6600]/20"
            title="Samsung Internet Browser"
            steps={[
              <span key="1">Tap the <span className="text-white font-semibold">menu icon</span> (three lines) at the bottom right</span>,
              <span key="2">Tap <span className="inline-flex items-center gap-1 text-white font-semibold"><Plus className="w-3.5 h-3.5" /> Add page to</span> then select <span className="text-white font-semibold">Home screen</span></span>,
              <span key="3">Tap <span className="text-white font-semibold">Add</span> to confirm</span>,
            ]}
          />

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Once saved, the app will appear on your home screen like any other app. It loads instantly and works even without Wi-Fi!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
            data-testid="button-got-it-install"
          >
            Got It!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PlatformInstructions({
  icon,
  iconBg,
  title,
  steps,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  steps: React.ReactNode[];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <h3 className="font-bold text-white text-sm">{title}</h3>
      </div>
      <div className="space-y-3 pl-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary text-xs font-bold">{i + 1}</span>
            </div>
            <div className="text-sm text-muted-foreground">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

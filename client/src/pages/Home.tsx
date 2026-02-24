import { useState, useEffect, useRef } from "react";
import { 
  Phone, MessageCircle, AlertTriangle, Utensils, Building2, X,
  ExternalLink, ChevronRight, Anchor, Sailboat, Music, Sunrise,
  Fish, PawPrint, Coffee, Umbrella, BedDouble, Bath, Sparkles,
  CheckCircle2, Download, Share, MoreVertical, Plus, Smartphone,
  Star, Gift, Clock, Mail, CalendarCheck, Wifi, Trophy, Shield,
  MapPin, Video, Tag, Flame, Sun, Cloud, CloudRain, CloudDrizzle,
  CloudLightning, CloudSun, CloudFog, Snowflake, Wind, Droplets,
  Thermometer, ArrowUp, ArrowDown, Eye, Bell, Waves, Heart,
  Car, Compass, Shell, Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { weddingPackages, weddingAddOns, navItems, avocetProperties } from "@/data/constants";
import tidesHero from "@assets/IMG_2823_1771852254855.jpeg";

export default function Home() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [openRestaurant, setOpenRestaurant] = useState<string | null>(null);
  const [frontDeskSent, setFrontDeskSent] = useState<string | null>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [insiderEmail, setInsiderEmail] = useState("");
  const [insiderSent, setInsiderSent] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [pkgInquiry, setPkgInquiry] = useState<{ name: string; email: string; guests: string; date: string; notes: string }>({ name: "", email: "", guests: "", date: "", notes: "" });
  const [weddingsTab, setWeddingsTab] = useState<"weddings" | "meetings">("weddings");
  const [showGlance, setShowGlance] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [showBeachConditions, setShowBeachConditions] = useState(false);
  const [showPushPrompt, setShowPushPrompt] = useState(false);
  const [pushStatus, setPushStatus] = useState<"idle" | "subscribed" | "denied" | "dismissed">("idle");
  const [kidsTab, setKidsTab] = useState<"kids" | "teens">("kids");
  const [scavengerItems, setScavengerItems] = useState<Record<string, boolean>>(() => {
    try { const s = localStorage.getItem("tides_scavenger"); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [bingoItems, setBingoItems] = useState<Record<string, boolean>>(() => {
    try { const s = localStorage.getItem("tides_bingo"); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [sandcastleParts, setSandcastleParts] = useState<Record<string, boolean>>(() => {
    try { const s = localStorage.getItem("tides_sandcastle"); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [shellCollection, setShellCollection] = useState<Record<string, boolean>>(() => {
    try { const s = localStorage.getItem("tides_shells"); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [photoChallenge, setPhotoChallenge] = useState<Record<string, boolean>>(() => {
    try { const s = localStorage.getItem("tides_photos"); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [teenChallenges, setTeenChallenges] = useState<Record<string, boolean>>(() => {
    try { const s = localStorage.getItem("tides_teen_challenges"); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const toggleState = (state: Record<string, boolean>, setter: (v: Record<string, boolean>) => void, lsKey: string, item: string) => {
    const next = { ...state, [item]: !state[item] };
    setter(next);
    try { localStorage.setItem(lsKey, JSON.stringify(next)); } catch {}
  };
  const toggleScavenger = (item: string) => toggleState(scavengerItems, setScavengerItems, "tides_scavenger", item);
  const toggleBingo = (item: string) => toggleState(bingoItems, setBingoItems, "tides_bingo", item);
  const toggleSandcastle = (item: string) => toggleState(sandcastleParts, setSandcastleParts, "tides_sandcastle", item);
  const toggleShell = (item: string) => toggleState(shellCollection, setShellCollection, "tides_shells", item);
  const togglePhoto = (item: string) => toggleState(photoChallenge, setPhotoChallenge, "tides_photos", item);
  const toggleTeenChallenge = (item: string) => toggleState(teenChallenges, setTeenChallenges, "tides_teen_challenges", item);
  const totalActivities = Object.values(scavengerItems).filter(Boolean).length + Object.values(bingoItems).filter(Boolean).length + Object.values(sandcastleParts).filter(Boolean).length + Object.values(shellCollection).filter(Boolean).length + Object.values(photoChallenge).filter(Boolean).length + Object.values(teenChallenges).filter(Boolean).length;
  const badgeLevel = totalActivities >= 21 ? { name: "Tides Legend", emoji: "👑" } : totalActivities >= 13 ? { name: "Beach Captain", emoji: "⚓" } : totalActivities >= 6 ? { name: "Sand Dollar Explorer", emoji: "🏖️" } : { name: "Tide Scout", emoji: "🐚" };
  const resetAllKids = () => {
    setScavengerItems({}); setBingoItems({}); setSandcastleParts({}); setShellCollection({}); setPhotoChallenge({}); setTeenChallenges({});
    try { ["tides_scavenger","tides_bingo","tides_sandcastle","tides_shells","tides_photos","tides_teen_challenges"].forEach(k => localStorage.removeItem(k)); } catch {}
  };
  const [guestVerified, setGuestVerified] = useState(() => {
    try { return localStorage.getItem("tides_guest_verified") === "true"; } catch { return false; }
  });
  const [showGuestGate, setShowGuestGate] = useState(false);
  const [guestGateAction, setGuestGateAction] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestRoom, setGuestRoom] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    if (activePanel && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activePanel]);

  useEffect(() => {
    fetch("/api/weather")
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setWeather(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const pushChoice = localStorage.getItem("tides_push_choice");
    if (pushChoice) {
      setPushStatus(pushChoice as any);
      return;
    }
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;
    if (Notification.permission === "denied") {
      setPushStatus("denied");
      return;
    }
    if (Notification.permission === "granted") {
      subscribeToPush();
      return;
    }
    const timer = setTimeout(() => setShowPushPrompt(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const subscribeToPush = async () => {
    try {
      const vapidRes = await fetch("/api/push/vapid-key");
      if (!vapidRes.ok) return;
      const { publicKey } = await vapidRes.json();
      if (!publicKey) return;

      const urlBase64ToUint8Array = (base64String: string) => {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      };

      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      const sub = subscription.toJSON();
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: sub.endpoint,
          keys: sub.keys,
        }),
      });

      setPushStatus("subscribed");
      localStorage.setItem("tides_push_choice", "subscribed");
      setShowPushPrompt(false);
    } catch (e) {
      console.error("Push subscription failed:", e);
    }
  };

  const handlePushAccept = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await subscribeToPush();
    } else {
      setPushStatus("denied");
      localStorage.setItem("tides_push_choice", "denied");
      setShowPushPrompt(false);
    }
  };

  const handlePushDismiss = () => {
    setPushStatus("dismissed");
    localStorage.setItem("tides_push_choice", "dismissed");
    setShowPushPrompt(false);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const WeatherIcon = ({ icon, className }: { icon: string; className?: string }) => {
    const iconMap: Record<string, any> = {
      "sun": Sun, "cloud-sun": CloudSun, "cloud": Cloud, "cloud-fog": CloudFog,
      "cloud-drizzle": CloudDrizzle, "cloud-rain": CloudRain, "snowflake": Snowflake,
      "cloud-lightning": CloudLightning,
    };
    const IconComp = iconMap[icon] || Sun;
    return <IconComp className={className} />;
  };

  const requireGuest = (actionUrl: string) => {
    if (guestVerified) {
      window.location.href = actionUrl;
      return;
    }
    setGuestGateAction(actionUrl);
    setShowGuestGate(true);
  };

  const handleGuestVerify = () => {
    if (guestName.trim() && guestRoom.trim()) {
      try { localStorage.setItem("tides_guest_verified", "true"); } catch {}
      setGuestVerified(true);
      setShowGuestGate(false);
      if (guestGateAction) {
        window.location.href = guestGateAction;
      }
      setGuestName("");
      setGuestRoom("");
      setGuestGateAction(null);
    }
  };

  const handleInsiderSignup = () => {
    if (!insiderEmail.trim()) return;
    const subject = encodeURIComponent("Tides Insiders — New Signup");
    const body = encodeURIComponent(`New Tides Insider signup!\n\nEmail: ${insiderEmail}\n\nThis guest would like to receive exclusive return-guest rates and early access to specials.\n\nSource: Tides Stay Hub`);
    window.location.href = `mailto:reservations@tidesfollybeach.com?subject=${subject}&body=${body}`;
    setInsiderSent(true);
    setInsiderEmail("");
    setTimeout(() => setInsiderSent(false), 5000);
  };

  const handleFrontDeskRequest = (item: string) => {
    setFrontDeskSent(item);
    setTimeout(() => setFrontDeskSent(null), 4000);
  };

  return (
    <div className="max-w-[860px] mx-auto min-h-screen pb-12">
      <header className="sticky top-0 z-50 bg-[#0b2230]/90 backdrop-blur-md border-b border-border px-4 py-3 flex justify-center items-center relative">
        <div className="flex flex-col items-center">
          <svg width="40" height="8" viewBox="0 0 40 8" fill="none" className="mb-0.5">
            <path d="M2 2 C10 8, 30 8, 38 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
          <div className="text-base font-display font-extrabold text-white tracking-widest uppercase">Tides Stay Hub</div>
        </div>
        {isInstallable && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleInstallClick}
            className="absolute right-4 bg-white/5 border-border hover:bg-white/10 text-xs rounded-full h-8"
            data-testid="button-install"
          >
            Add to Home
          </Button>
        )}
      </header>

      <main className="p-4 space-y-3">
        <section className="relative rounded-[20px] overflow-hidden border border-border bg-card">
          <img src={tidesHero} alt="Tides Folly Beach" className="w-full h-auto object-cover rounded-[20px]" />
        </section>

        <div className="w-full overflow-hidden h-4 opacity-30">
          <svg className="animate-wave-drift" width="200%" height="16" viewBox="0 0 800 16" fill="none" preserveAspectRatio="none">
            <path d="M0 8 Q25 2 50 8 T100 8 T150 8 T200 8 T250 8 T300 8 T350 8 T400 8 T450 8 T500 8 T550 8 T600 8 T650 8 T700 8 T750 8 T800 8" stroke="#2aa9b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        <section className="text-center py-6 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <svg className="mx-auto" width="60" height="12" viewBox="0 0 60 12" fill="none">
              <path d="M5 2 Q30 14 55 2" stroke="#2aa9b8" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-[1.15] mb-3"
          >
            Welcome to<br /><span className="text-primary">Tides Folly Beach</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm text-white/60 leading-relaxed max-w-[300px] mx-auto mb-4"
          >
            Charleston's oceanfront escape — where barefoot luxury meets the laid-back charm of Folly Beach.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 6 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold">
              <Waves className="w-3 h-3" /> Oceanfront
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold">
              <Sunrise className="w-3 h-3" /> Ocean Views
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-[11px] font-bold">
              <Utensils className="w-3 h-3" /> 3 Restaurants
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <a href="https://www.instagram.com/tidesfb/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-all active:scale-95" data-testid="link-instagram-hero" aria-label="Instagram">
              <svg className="w-4.5 h-4.5 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/TidesFollyBeach/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] transition-all active:scale-95" data-testid="link-facebook-hero" aria-label="Facebook">
              <svg className="w-4.5 h-4.5 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => setShowInstallGuide(true)}
            className="flex items-center justify-center gap-2 mx-auto py-2.5 px-5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-[0.97] shadow-lg shadow-primary/20"
            data-testid="button-save-home-screen-top"
          >
            <Download className="w-4 h-4" />
            Save to Home Screen
          </motion.button>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-white/[0.03] border border-border rounded-[20px] overflow-hidden"
        >
          <button
            onClick={() => setShowGlance(!showGlance)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition-colors active:scale-[0.99]"
            data-testid="button-glance-toggle"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Your Stay at a Glance</span>
            </div>
            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${showGlance ? 'rotate-90' : ''}`} />
          </button>
          <AnimatePresence>
            {showGlance && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                  {[
                    { icon: Clock, label: "Check-In", value: "4:00 PM" },
                    { icon: Clock, label: "Check-Out", value: "11:00 AM" },
                    { icon: Wifi, label: "Wi-Fi", value: "Included · See front desk" },
                    { icon: Waves, label: "Pool Hours", value: "10 AM – 10 PM" },
                    { icon: Coffee, label: "Roasted Coffee", value: "6 AM – 7 PM" },
                    { icon: Umbrella, label: "Beach Chairs", value: "Ask front desk" },
                  ].map(item => (
                    <div key={item.label} className="bg-black/20 rounded-xl p-3 flex items-start gap-2.5">
                      <item.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] text-muted-foreground font-medium">{item.label}</div>
                        <div className="text-xs font-bold text-white leading-tight">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="w-full rounded-2xl bg-white/[0.03] border-2 border-primary/30 overflow-hidden"
            data-testid="widget-beach-conditions"
          >
            <button
              onClick={() => setShowBeachConditions(!showBeachConditions)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
              data-testid="button-toggle-beach-conditions"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <WeatherIcon icon={weather.icon} className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">Beach Conditions</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-white">{weather.temp}°F</span>
                    <span className="text-[11px] text-white/50">·</span>
                    <span className="text-[11px] text-white/60 font-bold">{weather.condition}</span>
                    {weather.waterTemp != null && (
                      <>
                        <span className="text-[11px] text-white/50">·</span>
                        <span className="text-[11px] text-white/60 font-bold">Water {weather.waterTemp}°F</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-primary transition-transform duration-200 ${showBeachConditions ? "rotate-90" : ""}`} />
            </button>

            <AnimatePresence>
              {showBeachConditions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-right space-y-0.5 w-full">
                        <div className="flex items-center gap-4 justify-between">
                          <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                            <Thermometer className="w-3 h-3" />
                            Feels {weather.feelsLike}°F
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                            <Wind className="w-3 h-3" />
                            {weather.windSpeed} mph
                            {weather.windGusts > weather.windSpeed && <span className="text-white/50">· gusts {weather.windGusts}</span>}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                            <Droplets className="w-3 h-3" />
                            {weather.humidity}%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {weather.waterTemp != null && (
                        <div className="bg-white/[0.04] rounded-xl p-2.5 text-center">
                          <Waves className="w-4 h-4 text-primary mx-auto mb-1" />
                          <div className="text-[15px] font-extrabold text-white">{weather.waterTemp}°F</div>
                          <div className="text-[9px] text-white/50 uppercase tracking-wider font-bold mt-0.5">Water Temp</div>
                        </div>
                      )}
                      {weather.uvIndex != null && (
                        <div className="bg-white/[0.04] rounded-xl p-2.5 text-center">
                          <Sun className="w-4 h-4 mx-auto mb-1" style={{ color: weather.uvLevel?.color === "green" ? "#22c55e" : weather.uvLevel?.color === "yellow" ? "#eab308" : weather.uvLevel?.color === "orange" ? "#f97316" : weather.uvLevel?.color === "red" ? "#ef4444" : "#a855f6" }} />
                          <div className="text-[15px] font-extrabold text-white">{weather.uvIndex}</div>
                          <div className="text-[9px] uppercase tracking-wider font-bold mt-0.5" style={{ color: weather.uvLevel?.color === "green" ? "#22c55e" : weather.uvLevel?.color === "yellow" ? "#eab308" : weather.uvLevel?.color === "orange" ? "#f97316" : weather.uvLevel?.color === "red" ? "#ef4444" : "#a855f6" }}>{weather.uvLevel?.label} UV</div>
                        </div>
                      )}
                      {weather.waveHeight != null && (
                        <div className="bg-white/[0.04] rounded-xl p-2.5 text-center">
                          <Anchor className="w-4 h-4 text-primary mx-auto mb-1" />
                          <div className="text-[15px] font-extrabold text-white">{weather.waveHeight} ft</div>
                          <div className="text-[9px] text-white/50 uppercase tracking-wider font-bold mt-0.5">Waves{weather.wavePeriod ? ` · ${weather.wavePeriod}s` : ""}</div>
                        </div>
                      )}
                    </div>

                    {weather.tides && (
                      <div className="bg-white/[0.04] rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sailboat className="w-4 h-4 text-primary" />
                          <span className="text-[11px] font-bold text-white/80">{weather.tides.current}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[11px] text-white/60">
                            <ArrowUp className="w-3 h-3 text-primary" />
                            <span className="font-bold">High {weather.tides.nextHigh}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-white/60">
                            <ArrowDown className="w-3 h-3 text-primary" />
                            <span className="font-bold">Low {weather.tides.nextLow}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex border-t border-primary/20">
                    <a
                      href="https://www.tidesfollybeach.com/surf-cam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-primary hover:bg-primary/10 transition-colors border-r border-primary/20"
                      data-testid="link-surf-cam"
                    >
                      <Eye className="w-4 h-4" />
                      Watch Surf Cam <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                    <a
                      href="tel:+18882798383"
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                      data-testid="link-deal-cta"
                    >
                      <Phone className="w-4 h-4" />
                      Book Direct
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => requireGuest("sms:+18882798383")}
            className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-primary border-2 border-primary text-white hover:bg-primary/90 transition-all active:scale-[0.98]"
            data-testid="link-text-us"
          >
            <MessageCircle className="w-5 h-5" />
            <div className="font-extrabold text-xs">Text Us</div>
            <div className="text-white/70 text-[9px] font-medium">(888) 279-8383</div>
          </button>

          <a
            href="https://www.tidesfollybeach.com/surf-cam/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-[#1a1a2e] border-2 border-red-500/40 hover:bg-[#1a1a2e]/80 transition-all active:scale-[0.98]"
            data-testid="link-live-cam"
          >
            <div className="relative">
              <Video className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </div>
            <div className="font-extrabold text-xs text-white flex items-center gap-1">Live Cam <ExternalLink className="w-2.5 h-2.5 opacity-50" /></div>
            <div className="text-red-400 text-[9px] font-bold uppercase tracking-wider">Surf Check</div>
          </a>

          <button
            onClick={() => setShowDirections(true)}
            className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-white/[0.05] border-2 border-white/25 hover:bg-white/[0.08] transition-all active:scale-[0.98]"
            data-testid="button-directions"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <div className="font-extrabold text-xs text-white">Directions</div>
            <div className="text-muted-foreground text-[9px] font-medium">Google Maps</div>
          </button>
        </div>

        <button
          onClick={() => setActivePanel(activePanel === "dining" ? null : "dining")}
          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all active:scale-[0.98] ${
            activePanel === "dining"
              ? "bg-primary/20 border-primary ring-1 ring-primary/40"
              : "bg-primary/10 border-primary/30 hover:bg-primary/20 animate-shimmer-border"
          }`}
          data-testid="button-nav-dining"
        >
          <div className="flex items-center gap-3">
            <Utensils className="w-6 h-6 text-primary" />
            <div>
              <div className="font-extrabold text-base text-white">Dining & Menus</div>
              <div className="text-xs font-bold text-primary">Order Online</div>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-primary transition-transform ${activePanel === "dining" ? "rotate-90" : ""}`} />
        </button>

        <section className="bg-white/[0.03] border-2 border-white/20 rounded-xl p-2.5 animate-soft-glow">
          <div className="grid grid-cols-4 gap-1.5">
            {navItems.map((item) => {
              const isWeddings = item.id === "weddings";
              const isMeetings = item.id === "meetings";
              const isHighlight = isWeddings || isMeetings;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isMeetings) {
                      setWeddingsTab("meetings");
                      setActivePanel(activePanel === "weddings" && weddingsTab === "meetings" ? null : "weddings");
                    } else if (isWeddings) {
                      setWeddingsTab("weddings");
                      setActivePanel(activePanel === item.id ? null : item.id);
                    } else {
                      setActivePanel(activePanel === item.id ? null : item.id);
                    }
                  }}
                  data-testid={`button-nav-${item.id}`}
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-1 rounded-xl border transition-all active:scale-[0.96] ${
                    (isMeetings ? activePanel === "weddings" && weddingsTab === "meetings" : activePanel === item.id)
                      ? "bg-white/10 ring-1 ring-white/20 border-white/20"
                      : isHighlight
                        ? "bg-primary/10 border-primary/30 hover:bg-primary/20"
                        : "bg-white/[0.03] border-transparent hover:bg-white/[0.06]"
                  }`}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className={`text-[10px] font-bold leading-tight text-center ${isHighlight ? "text-primary" : "text-white/80"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <div ref={panelRef} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            {activePanel && (
              <motion.section
                key={activePanel}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="bg-white/[0.04] border border-border rounded-[20px] p-5 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6 border-b border-border/50 pb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    {navItems.find(i => i.id === activePanel)?.label}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setActivePanel(null)}
                    className="rounded-full hover:bg-white/10 h-8 w-8"
                    data-testid="button-close-panel"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {activePanel === "frontdesk" && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-sm text-muted-foreground">Need something? Tap a button below and we'll get it to your room.</p>

                    <AnimatePresence>
                      {frontDeskSent && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-green-900/40 border border-green-500/30 rounded-xl p-4 flex items-center gap-3"
                        >
                          <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                          <div>
                            <div className="font-bold text-green-300 text-[15px]">Request Sent</div>
                            <div className="text-sm text-green-400/80 mt-0.5">Your request for {frontDeskSent} has been sent to the front desk. We'll take care of it shortly.</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Extra Towels", icon: Bath },
                        { label: "Extra Pillows", icon: BedDouble },
                        { label: "Housekeeping", icon: Sparkles },
                        { label: "Room Service", icon: Utensils },
                        { label: "Maintenance", icon: AlertTriangle },
                        { label: "Late Checkout", icon: Sunrise },
                      ].map(item => (
                        <button
                          key={item.label}
                          onClick={() => handleFrontDeskRequest(item.label)}
                          className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-white/5 border border-border hover:bg-white/[0.08] transition-all active:scale-[0.96]"
                          data-testid={`button-request-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                        >
                          <item.icon className="w-7 h-7 text-primary" />
                          <span className="text-white font-semibold text-sm">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-border/50 pt-4">
                      <p className="text-xs text-muted-foreground mb-3">Need something else? Send a custom message or call the front desk directly.</p>
                      <div className="flex flex-col gap-3">
                        <button onClick={() => requireGuest("sms:+18882798383")} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-border text-white font-semibold text-sm hover:bg-white/10 transition-all" data-testid="link-text-frontdesk">
                          <MessageCircle className="w-4 h-4 text-primary" /> Text Front Desk
                        </button>
                        <button onClick={() => requireGuest("tel:+18885280730")} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/20 border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/30 transition-all" data-testid="link-call-frontdesk">
                          <Phone className="w-4 h-4" /> Call (888) 528-0730
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activePanel === "dining" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-sm text-muted-foreground mb-1">The only true oceanfront dining in Charleston. Tap a restaurant to see its full menu.</p>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=c2dbb408-92bb-4fd3-bedd-0b6f26d5ab45&client_is_mobile=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-1 py-3.5 px-3 rounded-2xl bg-primary text-white font-extrabold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
                        data-testid="link-order-food-blu"
                      >
                        <Umbrella className="w-5 h-5" />
                        Order Pinky's
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                      <a
                        href="https://www.foodbooking.com/ordering/restaurant/menu?restaurant_uid=5310dec2-3dba-4d94-b016-90ca4f3663fb&client_is_mobile=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-1 py-3.5 px-3 rounded-2xl bg-primary text-white font-extrabold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
                        data-testid="link-order-food-coffee"
                      >
                        <Coffee className="w-5 h-5" />
                        Order Coffee
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>

                    {/* Pinky's on the Beach */}
                    <button
                      onClick={() => setOpenRestaurant(openRestaurant === "pinkys" ? null : "pinkys")}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border border-border transition-all active:scale-[0.98] text-left ${openRestaurant === "pinkys" ? "bg-white/10 ring-1 ring-white/20" : "bg-white/5 hover:bg-white/[0.08]"}`}
                      data-testid="button-restaurant-pinkys"
                    >
                      <div className="flex items-center gap-3">
                        <Umbrella className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <div className="font-bold text-[15px] text-white">Pinky's on the Beach</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Oceanfront bar & eatery — Sun-Thu 11am-9pm, Fri-Sat 11am-10pm</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openRestaurant === "pinkys" ? "rotate-90" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openRestaurant === "pinkys" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-black/20 border border-border rounded-xl p-4 space-y-4">
                            <p className="text-sm text-muted-foreground">Folly's only oceanfront hotspot. Sip, snack & vibe beachside with bold bites, breezy cocktails, and live music.</p>
                            <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
                              <span>1 Center St, Folly Beach, SC 29439</span>
                              <span className="hidden sm:inline">·</span>
                              <a href="tel:+18435886658" className="text-primary font-semibold">(843) 588-6658</a>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="bg-black/30 rounded-lg p-3">
                                <h4 className="font-bold text-sm mb-2 text-primary">What to Expect</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                                  <li>Bold bites & snackable eats</li>
                                  <li>Frozen cocktails & breezy drinks</li>
                                  <li>Kids menu available</li>
                                  <li>Happy hour specials</li>
                                </ul>
                              </div>
                              <div className="bg-black/30 rounded-lg p-3">
                                <h4 className="font-bold text-sm mb-2 text-primary">Events & Vibes</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                                  <li>Live music & DJs</li>
                                  <li>Full Moon Parties</li>
                                  <li>Private events available</li>
                                  <li>Gift cards at pinkysfollybeach.com</li>
                                </ul>
                              </div>
                            </div>
                            <a href="https://www.pinkysfollybeach.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/20 border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/30 transition-all" data-testid="link-pinkys-website">
                              Visit Pinky's Website <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Roasted Coffee + Shop */}
                    <button
                      onClick={() => setOpenRestaurant(openRestaurant === "roasted" ? null : "roasted")}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border border-border transition-all active:scale-[0.98] text-left ${openRestaurant === "roasted" ? "bg-white/10 ring-1 ring-white/20" : "bg-white/5 hover:bg-white/[0.08]"}`}
                      data-testid="button-restaurant-roasted"
                    >
                      <div className="flex items-center gap-3">
                        <Coffee className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <div className="font-bold text-[15px] text-white">Roasted Coffee + Shop</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Starbucks&reg; Coffee · Open daily 6am - 7pm</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openRestaurant === "roasted" ? "rotate-90" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openRestaurant === "roasted" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-black/20 border border-border rounded-xl p-4 space-y-4">
                            <p className="text-sm text-muted-foreground">Get your day started right. Proudly serving Starbucks&reg; coffee, espresso creations, and frappuccinos. Plus grab-and-go food and beach gear.</p>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="bg-black/30 rounded-lg p-3">
                                <h4 className="font-bold text-sm mb-2 text-primary">Hot Beverages</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                                  <li>Coffee (Tall / Grande / Venti)</li>
                                  <li>Espresso</li>
                                  <li>Americano</li>
                                  <li>Latte</li>
                                  <li>Cappuccino</li>
                                  <li>Mocha / White Mocha</li>
                                  <li>Caramel Macchiato</li>
                                  <li>Tea / Chai Tea</li>
                                  <li>Hot Chocolate</li>
                                  <li>Seasonal Drinks</li>
                                </ul>
                              </div>
                              <div className="bg-black/30 rounded-lg p-3">
                                <h4 className="font-bold text-sm mb-2 text-primary">Cold Beverages</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                                  <li>Cold Brew</li>
                                  <li>Shaken Espresso</li>
                                  <li>Refreshers — Strawberry A&ccedil;a&iacute; & Pink Drink</li>
                                  <li className="font-semibold text-white pt-1">Frappuccinos</li>
                                  <li>Coffee — Caramel, White Mocha, Mocha, Java Chip, Vanilla</li>
                                  <li>Cr&egrave;me — Vanilla, Chocolate, Caramel, Double Choc Chip, White Chocolate</li>
                                </ul>
                              </div>
                              <div className="bg-black/30 rounded-lg p-3">
                                <h4 className="font-bold text-sm mb-2 text-primary">Breakfast & Food</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                                  <li>Breakfast Sandwiches — egg & cheese on biscuit, croissant, or bagel with sausage, bacon, or ham</li>
                                  <li>Frittata — tomato & feta</li>
                                  <li>Bagel — plain or everything</li>
                                  <li>Muffins — cinnamon apple, blueberry, banana nut, chocolate</li>
                                  <li>Danish / Scone / Brownie</li>
                                  <li>Parfait / Fruit Cup / Yogurt</li>
                                  <li>Hummus</li>
                                </ul>
                              </div>
                              <div className="bg-black/30 rounded-lg p-3">
                                <h4 className="font-bold text-sm mb-2 text-primary">Syrups</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                                  <li>Vanilla</li>
                                  <li>Sugar Free Vanilla</li>
                                  <li>Classic</li>
                                  <li>Caramel</li>
                                  <li>Cinnamon Dulce</li>
                                  <li>Brown Sugar</li>
                                  <li>Hazelnut</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Pier 101 */}
                    <button
                      onClick={() => setOpenRestaurant(openRestaurant === "pier101" ? null : "pier101")}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border border-border transition-all active:scale-[0.98] text-left ${openRestaurant === "pier101" ? "bg-white/10 ring-1 ring-white/20" : "bg-white/5 hover:bg-white/[0.08]"}`}
                      data-testid="button-restaurant-pier101"
                    >
                      <div className="flex items-center gap-3">
                        <Anchor className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <div className="font-bold text-[15px] text-white">Pier 101 Restaurant & Bar</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Beachfront dining · Open daily 11am - 6pm</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openRestaurant === "pier101" ? "rotate-90" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openRestaurant === "pier101" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-black/20 border border-border rounded-xl p-4 space-y-4">
                            <p className="text-sm text-muted-foreground">Return to the glory days at Pier 101 — cold drinks, fried seafood, and live music at the Edge of America. Charge your meal to your room.</p>
                            <div className="flex flex-col sm:flex-row gap-2 text-xs text-muted-foreground">
                              <span>101 E. Arctic Ave., Folly Beach, SC 29439</span>
                              <span className="hidden sm:inline">·</span>
                              <a href="tel:+18436330246" className="text-primary font-semibold">(843) 633-0246</a>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="bg-black/30 rounded-lg p-3">
                                <h4 className="font-bold text-sm mb-2 text-primary">What to Expect</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                                  <li>Cold drinks & fried seafood</li>
                                  <li>Live music at the Edge of America</li>
                                  <li>Kids menu available</li>
                                  <li>Charge meals to your room</li>
                                </ul>
                              </div>
                              <div className="bg-black/30 rounded-lg p-3">
                                <h4 className="font-bold text-sm mb-2 text-primary">Weekly Specials</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                                  <li>Monday — Kids Night</li>
                                  <li>Tuesday — Wing Night</li>
                                  <li>Wednesday — Burger Bliss</li>
                                  <li>Gift cards at pier101folly.com</li>
                                </ul>
                              </div>
                            </div>
                            <a href="https://www.pier101folly.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/20 border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/30 transition-all" data-testid="link-pier101-website">
                              Visit Pier 101 Website <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="pt-2">
                      <a href="https://wwws-usa1.givex.com/cws4.0/s4tidesfolly/e-gifts/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-border text-white font-semibold text-sm hover:bg-white/10 transition-all" data-testid="link-gift-card">
                        Purchase Gift Card <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                      </a>
                    </div>
                  </div>
                )}

                {activePanel === "thingstodo" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Surf, sand, service and style are always part of the package. What else you do is completely up to you — contact our <em>On The Coast</em> Concierge to plan it all.
                    </p>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <Waves className="w-4 h-4 text-orange-400" />
                        </div>
                        <h3 className="text-base font-bold text-white">Thrills</h3>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { icon: Waves, title: "Surf Lessons", desc: "Experience the adrenaline rush of catching a wave. Private surfing lessons for all skill levels — grab your board and get ready!", accent: "text-cyan-400", bg: "bg-cyan-400/10" },
                          { icon: Fish, title: "Fishing Charters", desc: "Book a private charter and fish our Lowcountry waters with seasoned captains who'll put you on fish no matter the season.", accent: "text-blue-400", bg: "bg-blue-400/10" },
                          { icon: Anchor, title: "Kayak & Paddleboard Safaris", desc: "Experience the rush that's accessible only by water. Splash across waterways and explore the rich, diverse marine life of Folly Beach.", accent: "text-teal-400", bg: "bg-teal-400/10" },
                          { icon: Music, title: "Night Life", desc: "Bars and restaurants come alive after dark with live music dotting the island. Dance the night away — and don't forget the Tiki Bar out back.", accent: "text-purple-400", bg: "bg-purple-400/10" }
                        ].map(item => (
                          <div key={item.title} className="bg-black/20 border border-border rounded-xl p-4 flex gap-3 items-start hover:bg-white/[0.04] transition-colors">
                            <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                              <item.icon className={`w-4.5 h-4.5 ${item.accent}`} />
                            </div>
                            <div>
                              <div className="font-bold text-[15px] text-white">{item.title}</div>
                              <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/20 flex items-center justify-center">
                          <Sunrise className="w-4 h-4 text-sky-400" />
                        </div>
                        <h3 className="text-base font-bold text-white">Chills</h3>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { icon: Compass, title: "Morris Island Lighthouse", desc: "Get an up-close view of the legendary lighthouse — tallest in South Carolina, built just after the Civil War. The setting makes for insta-worthy photos.", accent: "text-amber-400", bg: "bg-amber-400/10" },
                          { icon: Shell, title: "Shell Finding & Dolphin Tours", desc: "A breathtaking nature cruise with guaranteed Atlantic bottlenose dolphin sightings. Your captain shares fascinating info about our native sea life.", accent: "text-pink-400", bg: "bg-pink-400/10" },
                          { icon: Anchor, title: "Folly Beach Pier", desc: "Our iconic 1,000-foot pier provides plenty of dramatic oceanfront views — the ideal spot for snapping a selfie!", accent: "text-sky-400", bg: "bg-sky-400/10" },
                          { icon: Sailboat, title: "Day & Sunset Sailing Charters", desc: "An intimate sailing trip to relax and recharge. Adventurous afternoon rides or unwind beneath a pink-and-purple sky on a sunset sail.", accent: "text-indigo-400", bg: "bg-indigo-400/10" }
                        ].map(item => (
                          <div key={item.title} className="bg-black/20 border border-border rounded-xl p-4 flex gap-3 items-start hover:bg-white/[0.04] transition-colors">
                            <div className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                              <item.icon className={`w-4.5 h-4.5 ${item.accent}`} />
                            </div>
                            <div>
                              <div className="font-bold text-[15px] text-white">{item.title}</div>
                              <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-base font-bold text-white">Hotel Amenities</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { icon: Waves, label: "Heated Pool", sub: "Oceanfront, open daily" },
                          { icon: Umbrella, label: "Tiki Bar", sub: "Drinks steps from sand" },
                          { icon: Coffee, label: "Roasted Coffee", sub: "Starbucks\u00ae served" },
                          { icon: Wifi, label: "Free Wi-Fi", sub: "Included with stay" },
                          { icon: Car, label: "Parking", sub: "1 pass per room" },
                          { icon: PawPrint, label: "Pet Friendly", sub: "$100 per stay" },
                          { icon: Sunrise, label: "Beach Chairs", sub: "Sun & Ski rentals" },
                          { icon: Compass, label: "Concierge", sub: "On The Coast service" },
                        ].map(item => (
                          <div key={item.label} className="bg-black/20 rounded-xl p-3 flex items-start gap-2.5">
                            <item.icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-bold text-white leading-tight">{item.label}</div>
                              <div className="text-[11px] text-muted-foreground">{item.sub}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Want recommendations? Our <em>On The Coast</em> Concierge is happy to help plan your perfect day.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={() => requireGuest("tel:+18885280730")} className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/20 border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/30 transition-all" data-testid="link-call-concierge">
                          <Phone className="w-4 h-4" /> (888) 528-0730
                        </button>
                        <button onClick={() => requireGuest("sms:+18882798383")} className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-border text-white font-semibold text-sm hover:bg-white/10 transition-all" data-testid="link-text-concierge">
                          <MessageCircle className="w-4 h-4" /> Text (888) 279-8383
                        </button>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12">
                      <a href="https://www.tidesfollybeach.com/play/" target="_blank" rel="noopener noreferrer" data-testid="link-official-play">
                        View Full Activities Page <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                )}

                {activePanel === "weddings" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setWeddingsTab("weddings")}
                        data-testid="tab-weddings"
                        className={`py-3 px-4 rounded-xl font-extrabold text-sm transition-all active:scale-[0.98] ${
                          weddingsTab === "weddings"
                            ? "bg-primary text-white"
                            : "bg-white/5 border border-border text-white/60 hover:bg-white/10"
                        }`}
                      >
                        <Heart className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> Weddings
                      </button>
                      <button
                        onClick={() => setWeddingsTab("meetings")}
                        data-testid="tab-meetings"
                        className={`py-3 px-4 rounded-xl font-extrabold text-sm transition-all active:scale-[0.98] ${
                          weddingsTab === "meetings"
                            ? "bg-primary text-white"
                            : "bg-white/5 border border-border text-white/60 hover:bg-white/10"
                        }`}
                      >
                        <Building2 className="w-4 h-4 inline-block mr-1.5 -mt-0.5" /> Meetings & Events
                      </button>
                    </div>

                    {weddingsTab === "weddings" && (<>
                    <div className="bg-primary/10 border border-primary/25 rounded-xl p-4 flex gap-3 items-start">
                      <span className="text-2xl shrink-0 mt-0.5">🥂</span>
                      <div>
                        <div className="text-[15px] text-white font-extrabold leading-snug mb-1">Dreaming of a beach wedding?</div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">If you're staying with us and want to talk wedding details, let us buy you a glass of champagne while we walk you through our venues. No pressure — just great views and bubbly.</p>
                        <a href="tel:8435886468" className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]" data-testid="link-champagne-tour">
                          <Phone className="w-4 h-4" /> Call to Schedule
                        </a>
                      </div>
                    </div>

                    <div className="bg-black/30 border border-primary/20 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <span className="text-xs font-extrabold text-yellow-400 uppercase tracking-wider">Award-Winning Venue</span>
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/80 font-semibold">
                        <span>The Knot Best of Weddings 2024</span>
                        <span className="text-primary">|</span>
                        <span>ConventionSouth Reader's Choice 2023 & 2024</span>
                      </div>
                      <div className="mt-3 text-[11px] text-primary font-bold">Popular dates fill fast — start planning early to secure yours</div>
                    </div>

                    <div>
                      <p className="text-[15px] text-white font-semibold leading-relaxed mb-2">
                        The premier oceanfront wedding venue on Folly Beach. Say "I do" at the water's edge, then celebrate in 5,490 ft&sup2; of stunning indoor/outdoor event space — with dedicated sales and catering managers who handle every detail.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-extrabold text-white mb-1.5">Why Couples Choose Tides</h3>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { icon: Waves, text: "Oceanfront" },
                          { icon: Trophy, text: "Award-winning" },
                          { icon: Utensils, text: "In-house catering" },
                          { icon: Shield, text: "Rain backup" },
                          { icon: Building2, text: "4 venues" },
                          { icon: Users, text: "Dedicated team" },
                        ].map((item, i) => (
                          <div key={i} className="bg-black/20 border border-border rounded-md px-1.5 py-1 flex items-center gap-1">
                            <item.icon className="w-2.5 h-2.5 text-primary shrink-0" />
                            <span className="text-[9px] text-white font-semibold leading-none">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-2.5 text-center">
                        <div className="text-primary font-extrabold text-sm sm:text-lg leading-tight">Indoor &amp; Outdoor</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">4 Unique Venues</div>
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-2.5 text-center">
                        <div className="text-primary font-extrabold text-sm sm:text-lg leading-tight">5,490 ft&sup2;</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">Event Space</div>
                      </div>
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-2.5 text-center">
                        <div className="text-primary font-extrabold text-sm sm:text-lg leading-tight">200</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">Max Guests</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-white mb-1">Our Venues</h3>
                      <p className="text-xs text-muted-foreground mb-3">Tap a venue to see details & virtual tour</p>
                      <div className="space-y-2">
                        {[
                          { name: "Pavilion Ballroom", badge: "Flagship", sqft: "2,883 ft²", guests: "Up to 200 guests", desc: "A traditional private event space perfect for seated meals and dancing. The ballroom measures 33' x 93' and can split into up to three parts for more intimate events. The pre-function area offers sweeping waterfront views, and the adjacent Juliet balcony is the perfect spot for champagne toasts and unforgettable photos.", tourUrl: "https://my.matterport.com/show/?m=63PqbeqqVhR", tourId: "link-tour-pavilion", borderClass: "border-primary/20" },
                          { name: "Beach Front Ceremony", sqft: "Oceanfront", guests: "Up to 200 guests", desc: "Folly Beach is a breathtaking spot to exchange vows — acres of white sand, sparkling ocean views, and the Folly Beach Pier as your backdrop. Our hotel staff will facilitate an intimate and unforgettable beachfront ceremony for up to 200 guests. Say \"I do\" at the water's edge." },
                          { name: "Shipwatch Ballroom", sqft: "960 ft²", guests: "Up to 60 guests", desc: "A breezy private event space with beach views as far as the eye can see. Perfect for rehearsal dinners, bridal showers, birthday celebrations, and formal receptions. Clink champagne glasses on the adjacent Juliet balcony for an Instagram-worthy moment.", tourUrl: "https://my.matterport.com/show/?m=J4sesDTgBn1", tourId: "link-tour-shipwatch" },
                          { name: "Pinky's Pergola", sqft: "1,647 ft²", guests: "Up to 100 guests", desc: "Our gorgeous outside pergola is available for special affairs during fall and winter months. The beautiful retreat features a floral archway, draping ivy, plant dividers, and stunning oceanfront views. Perfect for welcome parties, cocktail hours, or an al fresco reception under the stars.", tourUrl: "https://my.matterport.com/show/?m=dsptqPhbopk", tourId: "link-tour-pinkys-pergola" },
                        ].map((venue, i) => (
                          <details key={i} className={`bg-black/20 border ${venue.borderClass || "border-border"} rounded-xl group`} data-testid={`venue-${i}`}>
                            <summary className="p-3 cursor-pointer list-none flex items-center justify-between">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="font-extrabold text-[15px] text-white">{venue.name}</div>
                                {venue.badge && <span className="text-[9px] font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded-full shrink-0">{venue.badge}</span>}
                              </div>
                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                <span className="text-[10px] text-white/50 font-semibold hidden sm:inline">{venue.sqft}</span>
                                <span className="text-[10px] text-primary font-bold">{venue.guests}</span>
                                <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
                              </div>
                            </summary>
                            <div className="px-3 pb-3">
                              <p className="text-sm text-muted-foreground">{venue.desc}</p>
                              <div className="flex gap-4 mt-2 text-xs font-semibold text-white/70">
                                <span>{venue.sqft}</span>
                                <span>{venue.guests}</span>
                              </div>
                              {venue.tourUrl && (
                                <a href={venue.tourUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary text-xs font-bold mt-2 hover:underline" data-testid={venue.tourId}>
                                  Virtual Tour <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>

                    <details className="bg-black/20 border border-border rounded-xl group" data-testid="toggle-venue-capacities">
                      <summary className="p-3 cursor-pointer list-none flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">Venue Capacities</h3>
                          <span className="text-[10px] text-white/50 font-semibold">7 spaces</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90 shrink-0" />
                      </summary>
                      <div className="px-3 pb-3 space-y-3">
                        <div>
                          <h4 className="font-bold text-sm text-primary mb-2">Second Floor</h4>
                          <div className="space-y-2">
                            {[
                              { name: "Pavilion", sqft: "2,883", seated: "180", cocktail: "200", theatre: "200" },
                              { name: "Shipwatch", sqft: "960", seated: "50", cocktail: "55", theatre: "60" },
                              { name: "Pierview", sqft: "—", seated: "—", cocktail: "80", theatre: "—" },
                            ].map(v => (
                              <div key={v.name} className="bg-black/30 rounded-lg p-3">
                                <div className="font-semibold text-white text-sm mb-2">{v.name}</div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                  <span>Size: <span className="text-white">{v.sqft} ft&sup2;</span></span>
                                  <span>Seated: <span className="text-white">{v.seated}</span></span>
                                  <span>Cocktail: <span className="text-white">{v.cocktail}</span></span>
                                  <span>Theatre: <span className="text-white">{v.theatre}</span></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-primary mb-2">Pinky's on the Beach</h4>
                          <div className="space-y-2">
                            {[
                              { name: "Inside Dining", sqft: "996", seated: "45", cocktail: "—" },
                              { name: "Bar & Lounge", sqft: "1,384", seated: "30", cocktail: "75" },
                              { name: "Outside Pergola", sqft: "1,648", seated: "90", cocktail: "125" },
                              { name: "Beach Bar & Deck", sqft: "1,804", seated: "60", cocktail: "100" },
                            ].map(v => (
                              <div key={v.name} className="bg-black/30 rounded-lg p-3">
                                <div className="font-semibold text-white text-sm mb-2">{v.name}</div>
                                <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                  <span>Size: <span className="text-white">{v.sqft} ft&sup2;</span></span>
                                  <span>Seated: <span className="text-white">{v.seated}</span></span>
                                  <span>Cocktail: <span className="text-white">{v.cocktail}</span></span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </details>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="text-lg font-extrabold text-white mb-1 flex items-center gap-2">
                        <Gift className="w-5 h-5 text-primary" /> Wedding Packages
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">Every package includes a dedicated sales & catering manager, in-house catering by our executive chef, full bar service, and an inclement weather backup plan.</p>
                      <p className="text-xs text-primary font-semibold mb-4">Tap a package to see what's included, then add extras below.</p>

                      <div className="space-y-3 mb-5">
                        {weddingPackages.map((pkg, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedPackage(selectedPackage === i ? null : i)}
                            data-testid={`button-package-${i}`}
                            className={`w-full text-left rounded-xl border-2 transition-all active:scale-[0.99] ${
                              selectedPackage === i 
                                ? "border-primary bg-primary/10" 
                                : "border-border bg-black/20 hover:border-primary/30"
                            } ${(pkg as any).popular ? "ring-1 ring-primary/20" : ""}`}
                          >
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  {(pkg as any).popular && (
                                    <span className="text-[9px] font-bold bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block" data-testid="badge-popular">Most Popular</span>
                                  )}
                                  <div className="font-extrabold text-white text-[15px]">{pkg.name}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{pkg.tagline}</div>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform mt-1 shrink-0 ${selectedPackage === i ? "rotate-90" : ""}`} />
                              </div>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {(pkg as any).perfectFor?.map((tag: string, t: number) => (
                                  <span key={t} className="text-[10px] font-semibold bg-white/10 text-white/70 px-2 py-0.5 rounded-full">{tag}</span>
                                ))}
                              </div>
                              <div className="flex flex-wrap gap-3 mt-2 text-xs">
                                <span className="text-primary font-bold">{pkg.priceRange}</span>
                                <span className="text-muted-foreground">{pkg.guests}</span>
                              </div>
                            </div>

                            {selectedPackage === i && (
                              <div className="border-t border-border/50 p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                                <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Venue: <span className="text-white normal-case">{pkg.venue}</span></div>
                                <div className="space-y-2">
                                  {pkg.includes.map((item, j) => (
                                    <div key={j} className="flex items-start gap-2 text-sm">
                                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                      <span className="text-white/90">{item}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-border/30 space-y-2.5">
                                  <div className="text-xs font-bold text-primary uppercase tracking-wider">Tell us about your event</div>
                                  <input
                                    placeholder="Your name"
                                    value={pkgInquiry.name}
                                    onChange={(e) => setPkgInquiry(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                                    data-testid={`input-pkg-name-${i}`}
                                  />
                                  <input
                                    placeholder="Email address"
                                    type="email"
                                    value={pkgInquiry.email}
                                    onChange={(e) => setPkgInquiry(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                                    data-testid={`input-pkg-email-${i}`}
                                  />
                                  <div className="grid grid-cols-2 gap-2">
                                    <input
                                      placeholder="Estimated guests"
                                      value={pkgInquiry.guests}
                                      onChange={(e) => setPkgInquiry(prev => ({ ...prev, guests: e.target.value }))}
                                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                                      data-testid={`input-pkg-guests-${i}`}
                                    />
                                    <input
                                      placeholder="Preferred date"
                                      value={pkgInquiry.date}
                                      onChange={(e) => setPkgInquiry(prev => ({ ...prev, date: e.target.value }))}
                                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                                      data-testid={`input-pkg-date-${i}`}
                                    />
                                  </div>
                                  <textarea
                                    placeholder="Anything else we should know? (optional)"
                                    rows={2}
                                    value={pkgInquiry.notes}
                                    onChange={(e) => setPkgInquiry(prev => ({ ...prev, notes: e.target.value }))}
                                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-black/30 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                    data-testid={`input-pkg-notes-${i}`}
                                  />
                                  <a
                                    href={`mailto:weddings@tidesfollybeach.com?subject=Wedding Inquiry: ${pkg.name}${pkgInquiry.name ? ` — ${pkgInquiry.name}` : ""}&body=${encodeURIComponent(`Hi, I'm interested in the "${pkg.name}" package.\n\nName: ${pkgInquiry.name || "(not provided)"}\nEmail: ${pkgInquiry.email || "(not provided)"}\nEstimated guests: ${pkgInquiry.guests || "(not provided)"}\nPreferred date: ${pkgInquiry.date || "(not provided)"}${pkgInquiry.notes ? `\nAdditional notes: ${pkgInquiry.notes}` : ""}${selectedAddOns.length > 0 ? `\n\nAdd-ons interested in:\n${weddingAddOns.filter(a => selectedAddOns.includes(a.id)).map(a => `• ${a.label}`).join("\n")}` : ""}\n\nThank you!`)}`}
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
                                    data-testid={`link-inquire-package-${i}`}
                                  >
                                    <Mail className="w-4 h-4" /> Send Inquiry
                                  </a>
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      <details className="bg-black/20 border border-border rounded-xl group" data-testid="toggle-addons">
                        <summary className="p-3 cursor-pointer list-none flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Plus className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-white">Customize with Add-Ons</span>
                            <span className="text-[10px] text-white/50 font-semibold">{weddingAddOns.length} options</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {selectedAddOns.length > 0 && (
                              <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">{selectedAddOns.length} selected</span>
                            )}
                            <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-3 pb-3">
                          <p className="text-xs text-muted-foreground mb-3">Tap to select add-ons you're interested in. We'll include them in your inquiry.</p>
                          <div className="grid grid-cols-1 gap-2">
                            {weddingAddOns.map((addon) => (
                              <button
                                key={addon.id}
                                onClick={() => toggleAddOn(addon.id)}
                                data-testid={`button-addon-${addon.id}`}
                                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all active:scale-[0.99] ${
                                  selectedAddOns.includes(addon.id)
                                    ? "border-primary bg-primary/10"
                                    : "border-border bg-black/20 hover:border-primary/30"
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                    selectedAddOns.includes(addon.id)
                                      ? "border-primary bg-primary"
                                      : "border-white/20 bg-transparent"
                                  }`}>
                                    {selectedAddOns.includes(addon.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                  </div>
                                  <span className="text-sm text-white font-medium">{addon.label}</span>
                                </div>
                                <span className="text-xs text-primary font-bold shrink-0 ml-2">{addon.price}</span>
                              </button>
                            ))}
                          </div>
                          {selectedAddOns.length > 0 && (
                            <div className="mt-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                              <div className="text-xs text-primary font-bold mb-1">{selectedAddOns.length} add-on{selectedAddOns.length > 1 ? "s" : ""} selected</div>
                              <div className="text-xs text-muted-foreground">
                                {weddingAddOns.filter(a => selectedAddOns.includes(a.id)).map(a => a.label).join(", ")}
                              </div>
                            </div>
                          )}
                        </div>
                      </details>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <details className="bg-black/20 border border-border rounded-xl group" data-testid="toggle-wedding-weekend">
                        <summary className="p-3 cursor-pointer list-none flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CalendarCheck className="w-5 h-5 text-primary" />
                            <span className="text-base font-extrabold text-white">Plan Your Wedding Weekend</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-white/50 font-semibold">3-day itinerary</span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-3 pb-3">
                          <p className="text-xs text-muted-foreground mb-3">Turn your wedding into an unforgettable multi-day celebration</p>
                          <div className="space-y-0">
                            {[
                              { day: "Friday", event: "Welcome Party & Rehearsal", venue: "Pinky's Pergola or Shipwatch Ballroom", desc: "Kick off the weekend with drinks and bites for your closest crew. Rehearsal available the day before (subject to availability)." },
                              { day: "Saturday", event: "Ceremony & Reception", venue: "Beach Front + Pavilion Ballroom", desc: "Exchange vows at the water's edge, then celebrate in our grand ballroom with in-house catering and full bar. Venue opens 3 hours early for your vendors." },
                              { day: "Sunday", event: "Farewell Brunch", venue: "Pinky's Inside Dining or Pergola", desc: "Send your guests off with a relaxed oceanfront brunch. The perfect end to a perfect weekend." },
                            ].map((item, i) => (
                              <div key={i} className="flex gap-3" data-testid={`timeline-${i}`}>
                                <div className="flex flex-col items-center">
                                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-extrabold shrink-0">{i + 1}</div>
                                  {i < 2 && <div className="w-0.5 h-full bg-primary/20 my-1" />}
                                </div>
                                <div className="pb-4">
                                  <div className="text-xs text-primary font-bold uppercase tracking-wider">{item.day}</div>
                                  <div className="text-[15px] text-white font-extrabold mt-0.5">{item.event}</div>
                                  <div className="text-xs text-white/60 font-semibold mt-0.5">{item.venue}</div>
                                  <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </details>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-black/20 border border-border rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-primary" />
                            <div className="font-extrabold text-[15px] text-white">Bring Your Dream Team</div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">We welcome your planner, photographer, florist, DJ, and baker. You choose the vendors — our team handles the venue logistics so everything runs smoothly on your day.</p>
                        </div>
                        <div className="bg-black/20 border border-border rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BedDouble className="w-5 h-5 text-primary" />
                            <div className="font-extrabold text-[15px] text-white">Guest Room Blocks</div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">Lock in discounted group rates so your wedding guests can stay on-site — steps from the beach and the celebration. Ask our team about room blocks when you inquire.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="text-base font-extrabold text-white mb-1">Good to Know</h3>
                      <p className="text-xs text-muted-foreground mb-3">Straight from our wedding specialist team</p>
                      <div className="space-y-2">
                        {[
                          { q: "Can I tour the venue?", a: "Yes! We offer tours by appointment during normal business hours and select weekends. Email weddings@tidesfollybeach.com or call 843-588-6468." },
                          { q: "Is catering included?", a: "In-house catering is required for all food and beverage — our executive chef handles everything from Lowcountry boils to plated multi-course dinners. Specialty wedding desserts may be brought in (cake-cutting fee applies)." },
                          { q: "Can we bring our own alcohol?", a: "All alcohol must be served by Tides. We offer a range of bar packages from beer & wine to premium top-shelf." },
                          { q: "What about decorations?", a: "Flowers, candles (in glass containers), and lighting are welcome. No nails, tacks, staples, or tape on walls." },
                          { q: "Who handles setup?", a: "Our team sets up your custom floor plan before you arrive and breaks down after the event. The venue opens 3 hours before your event for florists, bakers, and other vendors." },
                          { q: "Do you offer a wedding planner?", a: "We don't provide planning, coordination, photography, or music services — but our dedicated sales & catering manager works with you and your vendors every step of the way." },
                          { q: "Can I get ready on-site?", a: "Yes! Reserve a hotel room to use as a bridal suite for day-of prep." },
                          { q: "What if it rains?", a: "Tides always provides a backup space for inclement weather. No stress — we've got you covered." },
                          { q: "How do I lock in my date?", a: "A signed contract and deposit secures your date. We accept credit cards, debit cards, checks, and online bank transfers." },
                        ].map((faq, i) => (
                          <details key={i} className="bg-black/20 border border-border rounded-xl group" data-testid={`faq-${i}`}>
                            <summary className="p-3 cursor-pointer text-sm font-bold text-white flex items-center justify-between list-none">
                              {faq.q}
                              <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90 shrink-0" />
                            </summary>
                            <div className="px-3 pb-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                          </details>
                        ))}
                      </div>
                    </div>

                    </>)}

                    {weddingsTab === "meetings" && (<>
                    <div>
                      <h3 className="text-base font-extrabold text-white mb-1">Meetings & Gatherings</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-[11px] text-yellow-400/80 font-bold">ConventionSouth Reader's Choice Award Winner</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Professional sales and catering managers on site. Whether it's an oceanfront cocktail party, corporate retreat, family reunion, or surfing contest — we make it effortless.</p>
                      <div className="space-y-3">
                        <div className="bg-black/20 border border-border rounded-xl p-4 flex gap-3 items-start">
                          <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <div className="font-extrabold text-[15px] text-white">Corporate Retreats & Meetings</div>
                            <div className="text-sm text-muted-foreground mt-1">Host your team at the beach. Pavilion Ballroom (33' x 93') splits into up to 3 sections for breakout workshops. Full A/V capabilities and endless ways to unwind after sessions.</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {["Classroom: 140", "Boardroom: 26", "U-Shape: 30", "Theatre: 200"].map(c => (
                                <span key={c} className="text-[10px] font-semibold bg-white/10 text-white/70 px-2 py-0.5 rounded-full">{c}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="bg-black/20 border border-border rounded-xl p-4 flex gap-3 items-start">
                          <Heart className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <div className="font-extrabold text-[15px] text-white">Family Reunions & Celebrations</div>
                            <div className="text-sm text-muted-foreground mt-1">Bring the whole crew together. Indoor ballroom or outdoor oceanfront — with in-house catering by our executive chef and group room blocks to make logistics easy.</div>
                          </div>
                        </div>
                        <div className="bg-black/20 border border-border rounded-xl p-4 flex gap-3 items-start">
                          <Utensils className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <div className="font-extrabold text-[15px] text-white">Custom Catering — Your Menu, Your Way</div>
                            <div className="text-sm text-muted-foreground mt-1">From a fresh Lowcountry boil to passed plates of mini Beef Wellington — our executive chef and team have you covered from hors d'oeuvres to after-dinner cocktails and everything in between. All food and beverage handled in-house.</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-white mb-3">Venue Capacities</h3>
                      <div className="bg-black/20 border border-border rounded-xl p-3 sm:p-4">
                        <h4 className="font-bold text-sm text-primary mb-3">Second Floor</h4>
                        <div className="space-y-3">
                          {[
                            { name: "Pavilion", sqft: "2,883", seated: "180", cocktail: "200", theatre: "200" },
                            { name: "Shipwatch", sqft: "960", seated: "50", cocktail: "55", theatre: "60" },
                            { name: "Pierview", sqft: "—", seated: "—", cocktail: "80", theatre: "—" },
                          ].map(v => (
                            <div key={v.name} className="bg-black/30 rounded-lg p-3">
                              <div className="font-semibold text-white text-sm mb-2">{v.name}</div>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <span>Size: <span className="text-white">{v.sqft} ft&sup2;</span></span>
                                <span>Seated: <span className="text-white">{v.seated}</span></span>
                                <span>Cocktail: <span className="text-white">{v.cocktail}</span></span>
                                <span>Theatre: <span className="text-white">{v.theatre}</span></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-black/20 border border-border rounded-xl p-3 sm:p-4 mt-3">
                        <h4 className="font-bold text-sm text-primary mb-3">Pinky's on the Beach</h4>
                        <div className="space-y-3">
                          {[
                            { name: "Inside Dining", sqft: "996", seated: "45", cocktail: "—" },
                            { name: "Bar & Lounge", sqft: "1,384", seated: "30", cocktail: "75" },
                            { name: "Outside Pergola", sqft: "1,648", seated: "90", cocktail: "125" },
                            { name: "Beach Bar & Deck", sqft: "1,804", seated: "60", cocktail: "100" },
                          ].map(v => (
                            <div key={v.name} className="bg-black/30 rounded-lg p-3">
                              <div className="font-semibold text-white text-sm mb-2">{v.name}</div>
                              <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                <span>Size: <span className="text-white">{v.sqft} ft&sup2;</span></span>
                                <span>Seated: <span className="text-white">{v.seated}</span></span>
                                <span>Cocktail: <span className="text-white">{v.cocktail}</span></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    </>)}

                    <div className="border-t border-border/50 pt-5 space-y-3">
                      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
                        <div className="text-sm font-extrabold text-white mb-1">Questions? We'd love to hear from you.</div>
                        <p className="text-xs text-muted-foreground mb-3">Our sales team responds within 24 hours.</p>
                        <div className="flex gap-2">
                          <a href="tel:8435886468" className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]" data-testid="link-call-weddings">
                            <Phone className="w-4 h-4" /> Call Sales
                          </a>
                          <a href="mailto:weddings@tidesfollybeach.com" className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-xl bg-white/5 border border-border text-white font-bold text-sm hover:bg-white/10 transition-all active:scale-[0.98]" data-testid="link-email-weddings">
                            <Mail className="w-4 h-4" /> Email Team
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          const isWedding = weddingsTab === "weddings";
                          const shareData = {
                            title: isWedding ? "Tides Folly Beach Weddings" : "Tides Folly Beach Events",
                            text: isWedding
                              ? "Check out this gorgeous oceanfront wedding venue on Folly Beach!"
                              : "Check out this oceanfront event venue on Folly Beach — great for meetings, retreats & celebrations!",
                            url: isWedding
                              ? "https://www.tidesfollybeach.com/weddings/"
                              : "https://www.tidesfollybeach.com/gatherings/",
                          };
                          if (navigator.share) {
                            try { await navigator.share(shareData); } catch {}
                          } else {
                            await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                            alert("Link copied! Paste it in a text or email to share.");
                          }
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-border text-white font-bold text-sm hover:bg-white/10 transition-all active:scale-[0.98]"
                        data-testid="button-share-venue"
                      >
                        <Share className="w-4 h-4 text-primary" />
                        Know someone who'd love this? Share with a friend
                      </button>
                    </div>
                  </div>
                )}

                {activePanel === "amenities" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {[
                      { title: "Heated Oceanfront Pool", desc: "Open daily — enjoy our heated swimming pool with ocean views.", icon: Waves },
                      { title: "Oceanfront Tiki Bar & Lounge", desc: "Pinky's on the Beach — drinks and bites steps from the sand.", icon: Umbrella },
                      { title: "Roasted Coffee + Shop", desc: "Proudly serving Starbucks\u00ae Coffee.", icon: Coffee },
                      { title: "Complimentary Wi-Fi", desc: "Included with resort fee for all hotel guests. Network details at check-in.", icon: Waves },
                      { title: "One Complimentary Parking Pass", desc: "One vehicle per room. Additional parking subject to availability.", icon: Car },
                      { title: "Pet Friendly", desc: "$100 per stay. Bring your four-legged friend along.", icon: PawPrint },
                      { title: "Beach Chair Rentals", desc: "Available through Sun & Ski — reserve at the front desk.", icon: Sunrise },
                      { title: "On The Coast Concierge", desc: "Let us help you plan excursions, dining, and more.", icon: Compass },
                      { title: "Meeting & Banquet Facilities", desc: "Business services and event spaces available.", icon: Building2 },
                    ].map(item => (
                      <div key={item.title} className="bg-black/20 border border-border rounded-xl p-4 flex gap-3 items-start">
                        <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[15px] text-white">{item.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                        </div>
                      </div>
                    ))}

                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-12 mt-2">
                      <a href="https://www.tidesfollybeach.com/play/" target="_blank" rel="noopener noreferrer" data-testid="link-official-amenities">
                        View Full Amenities Page <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                )}

                {activePanel === "parking" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {[
                      { title: "Parking", desc: "One complimentary self-parking pass per room. Additional parking subject to availability." },
                      { title: "Reservations", desc: "Call (888) 528-0730 or text (888) 279-8383 anytime." },
                      { title: "Pet Policy", desc: "Pets welcome — $100 per stay." },
                      { title: "Late Checkout", desc: "Subject to availability. Contact the front desk." },
                      { title: "Beach Chairs & Umbrellas", desc: "Rentals available through Sun & Ski at the front desk." }
                    ].map(item => (
                      <div key={item.title} className="bg-black/20 border border-border rounded-xl p-4">
                        <div className="font-bold text-[15px] text-white">{item.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activePanel === "folly" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <a href="https://www.google.com/maps?q=Folly+Beach+Pier" target="_blank" rel="noopener noreferrer" className="block bg-black/20 border border-border rounded-xl p-4 hover:bg-white/5 transition-colors" data-testid="link-folly-pier">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[15px] text-white">Folly Beach Pier</div>
                          <div className="text-sm text-muted-foreground mt-1">Iconic 1,000-foot pier with dramatic ocean views</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </a>
                    <a href="https://www.google.com/maps?q=Center+Street+Folly+Beach" target="_blank" rel="noopener noreferrer" className="block bg-black/20 border border-border rounded-xl p-4 hover:bg-white/5 transition-colors" data-testid="link-folly-center">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[15px] text-white">Center Street</div>
                          <div className="text-sm text-muted-foreground mt-1">Shops, food, nightlife</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </a>
                    <a href="https://www.google.com/maps?q=Morris+Island+Lighthouse+Folly+Beach" target="_blank" rel="noopener noreferrer" className="block bg-black/20 border border-border rounded-xl p-4 hover:bg-white/5 transition-colors" data-testid="link-folly-lighthouse">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-[15px] text-white">Morris Island Lighthouse</div>
                          <div className="text-sm text-muted-foreground mt-1">Tallest lighthouse in SC — insta-worthy views</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </a>
                    <div className="bg-black/20 border border-border rounded-xl p-4">
                      <div className="font-bold text-[15px] text-white">Sunrise / Sunset</div>
                      <div className="text-sm text-muted-foreground mt-1">Sunrise: quiet beach stretch. Sunset: grab a drink at the Tiki Bar with an ocean view.</div>
                    </div>
                  </div>
                )}

                {activePanel === "kids" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative overflow-hidden rounded-2xl border-2 border-primary/40 p-5">
                      <div className="absolute inset-0 bg-[#0d2a3a]"></div>
                      <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-2 left-4 text-2xl opacity-10 animate-pulse">🌊</div>
                        <div className="absolute top-3 right-6 text-xl opacity-10 animate-pulse" style={{ animationDelay: "0.5s" }}>🐚</div>
                        <div className="absolute bottom-3 left-8 text-xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }}>⭐</div>
                        <div className="absolute bottom-2 right-4 text-2xl opacity-10 animate-pulse" style={{ animationDelay: "1.5s" }}>🦀</div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/5 blur-2xl"></div>
                      </div>
                      <div className="relative text-center">
                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Tides Folly Beach</div>
                        <h3 className="font-display font-extrabold text-white text-xl leading-tight">Kids & Teens Club</h3>
                        <p className="text-xs text-white/50 mt-2 leading-relaxed max-w-[280px] mx-auto">
                          Your beach adventure starts here! Explore Folly Beach, complete missions, build sandcastles, and earn badges along the way.
                        </p>
                        <div className="flex items-center justify-center gap-2.5 mt-3 p-2 rounded-xl bg-white/[0.06]">
                          <span className="text-xl" style={{ filter: "drop-shadow(0 0 6px rgba(42,169,184,0.3))" }}>{badgeLevel.emoji}</span>
                          <div className="text-left">
                            <div className="text-[11px] font-extrabold text-white">{badgeLevel.name}</div>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-primary h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${Math.min((totalActivities / 21) * 100, 100)}%` }}></div>
                              </div>
                              <span className="text-[10px] font-bold text-primary">{totalActivities}/21</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1.5 p-1.5 bg-[#0d2a3a] rounded-2xl border-2 border-white/10">
                      <button onClick={() => setKidsTab("kids")} data-testid="tab-kids-club" className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all ${kidsTab === "kids" ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                        🏖️ Kids Club
                      </button>
                      <button onClick={() => setKidsTab("teens")} data-testid="tab-teen-guide" className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all ${kidsTab === "teens" ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                        🤙 Teen Guide
                      </button>
                    </div>

                    {kidsTab === "kids" && (<>
                      <p className="text-sm text-white/60 text-center font-medium">Complete activities to level up your badge!</p>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/scav" open data-testid="toggle-scavenger-hunt">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                            <Compass className="w-4 h-4 text-primary" />
                            Beach Missions
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">{Object.values(scavengerItems).filter(Boolean).length}/12</span>
                            <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/scav:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-4 pb-4 space-y-1.5">
                          {[
                            { item: "Find a seashell on the beach", emoji: "🐚" },
                            { item: "Spot a pelican flying overhead", emoji: "🦅" },
                            { item: "Dig your toes in the sand", emoji: "👣" },
                            { item: "Find the hotel pool", emoji: "🏊" },
                            { item: "Watch a wave crash on shore", emoji: "🌊" },
                            { item: "Find a piece of driftwood", emoji: "🪵" },
                            { item: "Spot a crab on the beach", emoji: "🦀" },
                            { item: "See the sunrise or sunset", emoji: "🌅" },
                            { item: "Find 3 different colored shells", emoji: "🎨" },
                            { item: "Hear the ocean from your room", emoji: "👂" },
                            { item: "See a boat on the water", emoji: "⛵" },
                            { item: "Build a sandcastle", emoji: "🏰" },
                          ].map(({ item, emoji }) => (
                            <button key={item} onClick={() => toggleScavenger(item)} className={`w-full flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all active:scale-[0.97] text-left ${scavengerItems[item] ? "bg-primary/15 border-primary/40" : "bg-white/[0.03] border-border hover:bg-white/[0.06]"}`} data-testid={`scavenger-${item.replace(/\s+/g, '-').toLowerCase()}`}>
                              <span className="text-base">{emoji}</span>
                              <span className={`text-sm font-bold flex-1 ${scavengerItems[item] ? "text-primary line-through" : "text-white"}`}>{item}</span>
                              {scavengerItems[item] && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                            </button>
                          ))}
                          {Object.values(scavengerItems).filter(Boolean).length === 12 && (
                            <div className="relative text-center py-4 rounded-2xl border-2 border-yellow-400/40 mt-2 overflow-hidden">
                              <div className="absolute inset-0 bg-yellow-400/10"></div>
                              <div className="relative">
                                <div className="text-3xl mb-1">🏆</div>
                                <div className="font-extrabold text-yellow-400 text-base">All Missions Complete!</div>
                                <div className="text-xs text-white/60 mt-1 font-medium">Show the front desk for a special surprise</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </details>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/bingo" data-testid="toggle-beach-bingo">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                            <Star className="w-4 h-4 text-primary" />
                            Beach Bingo
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">{Object.values(bingoItems).filter(Boolean).length}/16</span>
                            <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/bingo:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-4 pb-4">
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { item: "Seagull", emoji: "🕊️" }, { item: "Surfboard", emoji: "🏄" }, { item: "Sandcastle", emoji: "🏰" }, { item: "Starfish", emoji: "⭐" },
                              { item: "Palm Tree", emoji: "🌴" }, { item: "Dolphin", emoji: "🐬" }, { item: "Ice Cream", emoji: "🍦" }, { item: "Sunset", emoji: "🌅" },
                              { item: "Hermit Crab", emoji: "🦀" }, { item: "Lighthouse", emoji: "🏠" }, { item: "Fishing Boat", emoji: "🚤" }, { item: "Jellyfish", emoji: "🪼" },
                              { item: "Beach Ball", emoji: "🏐" }, { item: "Flip Flops", emoji: "🩴" }, { item: "Sea Glass", emoji: "💎" }, { item: "Kite", emoji: "🪁" },
                            ].map(({ item, emoji }) => (
                              <button key={item} onClick={() => toggleBingo(item)} className={`aspect-square flex flex-col items-center justify-center gap-0.5 rounded-lg border-2 transition-all active:scale-[0.93] ${bingoItems[item] ? "bg-primary/25 border-primary/50" : "bg-white/[0.04] border-border hover:bg-white/[0.08]"}`} data-testid={`bingo-${item.replace(/\s+/g, '-').toLowerCase()}`}>
                                <span className="text-xl">{emoji}</span>
                                <span className={`text-[8px] font-bold leading-tight ${bingoItems[item] ? "text-primary" : "text-white/60"}`}>{item}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </details>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/castle" data-testid="toggle-sandcastle">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">🏰 Build a Sandcastle</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">{Object.values(sandcastleParts).filter(Boolean).length}/8</span>
                            <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/castle:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-4 pb-4">
                          <p className="text-xs text-white/50 mb-3 font-medium">Tap each piece to add it to your sandcastle!</p>
                          <div className="relative text-center p-5 rounded-2xl border-2 border-primary/20 mb-3 min-h-[90px] overflow-hidden">
                            <div className="absolute inset-0 bg-[#0d2a3a]"></div>
                            <div className="relative text-4xl leading-relaxed tracking-[0.3em] flex items-center justify-center gap-1 flex-wrap">
                              {sandcastleParts["Moat"] && <span className="animate-in fade-in zoom-in duration-300">💧</span>}
                              {sandcastleParts["Walls"] && <span className="animate-in fade-in zoom-in duration-300">🧱</span>}
                              {sandcastleParts["Towers"] && <span className="animate-in fade-in zoom-in duration-300">🏰</span>}
                              {sandcastleParts["Door"] && <span className="animate-in fade-in zoom-in duration-300">🚪</span>}
                              {sandcastleParts["Windows"] && <span className="animate-in fade-in zoom-in duration-300">🪟</span>}
                              {sandcastleParts["Flag"] && <span className="animate-in fade-in zoom-in duration-300">🚩</span>}
                              {sandcastleParts["Shells"] && <span className="animate-in fade-in zoom-in duration-300">🐚</span>}
                              {sandcastleParts["Seaweed"] && <span className="animate-in fade-in zoom-in duration-300">🌿</span>}
                              {!Object.values(sandcastleParts).some(Boolean) && <span className="text-base text-white/20 font-bold tracking-normal">Tap below to start building!</span>}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { item: "Moat", emoji: "💧" }, { item: "Walls", emoji: "🧱" }, { item: "Towers", emoji: "🏰" }, { item: "Door", emoji: "🚪" },
                              { item: "Windows", emoji: "🪟" }, { item: "Flag", emoji: "🚩" }, { item: "Shells", emoji: "🐚" }, { item: "Seaweed", emoji: "🌿" },
                            ].map(({ item, emoji }) => (
                              <button key={item} onClick={() => toggleSandcastle(item)} className={`flex flex-col items-center justify-center gap-0.5 p-2.5 rounded-lg border-2 transition-all active:scale-[0.93] ${sandcastleParts[item] ? "bg-primary/25 border-primary/50" : "bg-white/[0.04] border-border hover:bg-white/[0.08]"}`} data-testid={`castle-${item.toLowerCase()}`}>
                                <span className="text-lg">{emoji}</span>
                                <span className={`text-[8px] font-bold ${sandcastleParts[item] ? "text-primary" : "text-white/60"}`}>{item}</span>
                              </button>
                            ))}
                          </div>
                          {Object.values(sandcastleParts).filter(Boolean).length === 8 && (
                            <div className="relative text-center py-4 rounded-2xl border-2 border-yellow-400/40 mt-3 overflow-hidden">
                              <div className="absolute inset-0 bg-yellow-400/10"></div>
                              <div className="relative">
                                <div className="text-3xl mb-1">🏖️</div>
                                <div className="font-extrabold text-yellow-400 text-base">Sandcastle Complete!</div>
                                <div className="text-xs text-white/60 mt-1 font-medium">Take a photo and tag @tidesfb!</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </details>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/shells" data-testid="toggle-shell-collection">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">🐚 Shell Collection</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">{Object.values(shellCollection).filter(Boolean).length}/8</span>
                            <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/shells:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-4 pb-4">
                          <p className="text-xs text-muted-foreground mb-3">Search the beach for these shells and tap when you find one!</p>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { item: "Conch", emoji: "🐚" }, { item: "Sand Dollar", emoji: "🪙" }, { item: "Clam", emoji: "🦪" }, { item: "Oyster", emoji: "🦪" },
                              { item: "Scallop", emoji: "🐚" }, { item: "Moon Snail", emoji: "🌙" }, { item: "Whelk", emoji: "🐌" }, { item: "Olive Shell", emoji: "🫒" },
                            ].map(({ item, emoji }) => (
                              <button key={item} onClick={() => toggleShell(item)} className={`flex flex-col items-center justify-center gap-0.5 p-2.5 rounded-lg border-2 transition-all active:scale-[0.93] ${shellCollection[item] ? "bg-primary/25 border-primary/50" : "bg-white/[0.04] border-border hover:bg-white/[0.08]"}`} data-testid={`shell-${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                <span className="text-lg">{emoji}</span>
                                <span className={`text-[8px] font-bold leading-tight text-center ${shellCollection[item] ? "text-primary" : "text-white/60"}`}>{item}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </details>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/facts" data-testid="toggle-fun-facts">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Folly Beach Fun Facts
                          </span>
                          <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/facts:rotate-90" />
                        </summary>
                        <div className="px-4 pb-4 space-y-2">
                          {[
                            { fact: "Folly Beach is called \"The Edge of America\" — one of the easternmost points on the coast!", emoji: "🗺️" },
                            { fact: "The Morris Island Lighthouse has been standing since 1876!", emoji: "🏠" },
                            { fact: "Folly Beach is about 6 miles long. How many steps is that?", emoji: "👟" },
                            { fact: "Bottlenose dolphins live around Folly Beach year-round!", emoji: "🐬" },
                            { fact: "Loggerhead sea turtles nest here every summer!", emoji: "🐢" },
                            { fact: "The Folly Pier stretches 1,045 feet over the ocean!", emoji: "🎣" },
                          ].map(({ fact, emoji }) => (
                            <div key={fact} className="flex gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-border">
                              <span className="text-lg shrink-0">{emoji}</span>
                              <p className="text-xs text-white/80 font-medium leading-relaxed">{fact}</p>
                            </div>
                          ))}
                        </div>
                      </details>

                      <div className="space-y-2">
                        <p className="text-xs font-extrabold text-white text-center">Share Your Adventure!</p>
                        <div className="flex gap-2">
                          <a href="https://www.instagram.com/tidesfb/" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl bg-white/[0.06] border-2 border-border text-white hover:bg-white/[0.1] transition-all active:scale-[0.97]" data-testid="link-instagram-kids">
                            <span className="text-lg">📸</span>
                            <span className="text-xs font-bold">Instagram</span>
                            <span className="text-[10px] text-primary font-bold flex items-center gap-0.5">@tidesfb <ExternalLink className="w-2.5 h-2.5 opacity-50" /></span>
                          </a>
                          <a href="https://www.facebook.com/TidesFollyBeach/" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl bg-white/[0.06] border-2 border-border text-white hover:bg-white/[0.1] transition-all active:scale-[0.97]" data-testid="link-facebook-kids">
                            <span className="text-lg">👍</span>
                            <span className="text-xs font-bold">Facebook</span>
                            <span className="text-[10px] text-[#1877F2] font-bold flex items-center gap-0.5">26K likes <ExternalLink className="w-2.5 h-2.5 opacity-50" /></span>
                          </a>
                        </div>
                      </div>
                    </>)}

                    {kidsTab === "teens" && (<>
                      <p className="text-sm text-white/60 text-center font-medium">Your insider guide to Folly Beach 🤙</p>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/dare" open data-testid="toggle-teen-challenges">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                            <Flame className="w-4 h-4 text-orange-400" />
                            Beach Dares
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">{Object.values(teenChallenges).filter(Boolean).length}/8</span>
                            <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/dare:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-4 pb-4 space-y-1.5">
                          <p className="text-xs text-muted-foreground mb-2">Complete dares to level up your badge — tag @tidesfb for bonus clout.</p>
                          {[
                            { item: "Jump over 3 waves in a row", emoji: "🌊" },
                            { item: "Walk the full length of Folly Beach", emoji: "🚶" },
                            { item: "Try stand-up paddleboarding", emoji: "🏄" },
                            { item: "Spot a dolphin from the pier", emoji: "🐬" },
                            { item: "Eat something you've never tried before", emoji: "🍽️" },
                            { item: "Watch the full sunrise from the beach", emoji: "🌅" },
                            { item: "Bury someone in the sand (with permission)", emoji: "⛱️" },
                            { item: "Skip a stone at least 3 times", emoji: "💎" },
                          ].map(({ item, emoji }) => (
                            <button key={item} onClick={() => toggleTeenChallenge(item)} className={`w-full flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all active:scale-[0.97] text-left ${teenChallenges[item] ? "bg-orange-400/15 border-orange-400/40" : "bg-white/[0.03] border-border hover:bg-white/[0.06]"}`} data-testid={`teen-dare-${item.replace(/\s+/g, '-').toLowerCase()}`}>
                              <span className="text-base">{emoji}</span>
                              <span className={`text-sm font-bold flex-1 ${teenChallenges[item] ? "text-orange-400 line-through" : "text-white"}`}>{item}</span>
                              {teenChallenges[item] && <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />}
                            </button>
                          ))}
                          {Object.values(teenChallenges).filter(Boolean).length === 8 && (
                            <div className="mt-2 p-3 rounded-xl bg-orange-400/15 border border-orange-400/30 text-center">
                              <span className="text-sm font-extrabold text-orange-400">All dares complete! You're a Folly Beach legend 🔥</span>
                            </div>
                          )}
                        </div>
                      </details>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/spots" open data-testid="toggle-best-spots">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                            <MapPin className="w-4 h-4 text-primary" />
                            Best Spots on Folly
                          </span>
                          <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/spots:rotate-90" />
                        </summary>
                        <div className="px-4 pb-4 space-y-2">
                          {[
                            { spot: "The Washout", desc: "Best surf break on Folly — watch or rent a board", emoji: "🏄", url: "https://maps.app.goo.gl/folly-washout" },
                            { spot: "Folly Beach Pier", desc: "1,045 ft over the ocean — great for fishing & photos", emoji: "🎣", url: "https://maps.app.goo.gl/folly-pier" },
                            { spot: "Morris Island Lighthouse", desc: "Epic walk at low tide to the historic lighthouse", emoji: "🏠", url: "https://maps.app.goo.gl/morris-island" },
                            { spot: "Folly River Paddleboarding", desc: "SUP through the marsh — dolphins guaranteed", emoji: "🚣", url: "https://maps.app.goo.gl/folly-river" },
                            { spot: "The Edge of America Sign", desc: "Classic photo op — you're literally at the edge", emoji: "📸", url: "https://maps.app.goo.gl/edge-of-america" },
                          ].map(({ spot, desc, emoji }) => (
                            <div key={spot} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-border">
                              <span className="text-lg shrink-0 mt-0.5">{emoji}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-white">{spot}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </details>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/food" data-testid="toggle-teen-food">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                            <Utensils className="w-4 h-4 text-primary" />
                            Food Worth the Walk
                          </span>
                          <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/food:rotate-90" />
                        </summary>
                        <div className="px-4 pb-4 space-y-2">
                          {[
                            { name: "Taco Boy", desc: "Best street tacos on the island", emoji: "🌮" },
                            { name: "Surf Bar", desc: "Smoothies, acai bowls & frozen drinks", emoji: "🥤" },
                            { name: "Pier 101", desc: "Burgers with an ocean view", emoji: "🍔" },
                            { name: "Chico Feo", desc: "Caribbean food in a backyard vibe", emoji: "🥥" },
                            { name: "Planet Follywood", desc: "Ice cream & shakes on Center St", emoji: "🍦" },
                          ].map(({ name, desc, emoji }) => (
                            <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-border">
                              <span className="text-lg shrink-0">{emoji}</span>
                              <div>
                                <div className="text-sm font-bold text-white">{name}</div>
                                <div className="text-xs text-muted-foreground">{desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </details>

                      {weather && (
                        <div className="bg-white/[0.06] border-2 border-primary/30 rounded-xl p-4" data-testid="teen-surf-check">
                          <div className="flex items-center gap-2 mb-3">
                            <Waves className="w-4 h-4 text-primary" />
                            <span className="text-white font-extrabold text-sm">Surf & Tide Check</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-center p-2.5 rounded-lg bg-white/[0.04] border border-border">
                              <div className="text-lg font-extrabold text-primary">{weather.waveHeight}ft</div>
                              <div className="text-[9px] font-bold text-white/60">Waves</div>
                            </div>
                            <div className="text-center p-2.5 rounded-lg bg-white/[0.04] border border-border">
                              <div className="text-lg font-extrabold text-primary">{weather.waterTemp}°</div>
                              <div className="text-[9px] font-bold text-white/60">Water</div>
                            </div>
                            <div className="text-center p-2.5 rounded-lg bg-white/[0.04] border border-border">
                              <div className="text-lg font-extrabold text-primary">{weather.tides?.current}</div>
                              <div className="text-[9px] font-bold text-white/60">Tide</div>
                            </div>
                          </div>
                        </div>
                      )}

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/playlist" data-testid="toggle-playlist">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                            <Music className="w-4 h-4 text-primary" />
                            Beach Day Playlists
                          </span>
                          <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/playlist:rotate-90" />
                        </summary>
                        <div className="px-4 pb-4 space-y-2">
                          <p className="text-xs text-muted-foreground">Curated playlists for your beach days.</p>
                          <a href="https://open.spotify.com/playlist/37i9dQZF1DX6VDO8a6cQME" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#1DB954]/15 border border-[#1DB954]/30 hover:bg-[#1DB954]/25 transition-all active:scale-[0.97]" data-testid="link-spotify-beach">
                            <span className="text-lg">🏖️</span>
                            <div className="text-left flex-1">
                              <div className="text-sm font-bold text-[#1DB954] flex items-center gap-1.5">Beach Vibes <ExternalLink className="w-2.5 h-2.5 opacity-50" /></div>
                              <div className="text-[10px] text-[#1DB954]/60">Spotify</div>
                            </div>
                          </a>
                          <a href="https://open.spotify.com/playlist/37i9dQZF1DWTx0xog3gN3q" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#1DB954]/15 border border-[#1DB954]/30 hover:bg-[#1DB954]/25 transition-all active:scale-[0.97]" data-testid="link-spotify-summer">
                            <span className="text-lg">🌊</span>
                            <div className="text-left flex-1">
                              <div className="text-sm font-bold text-[#1DB954] flex items-center gap-1.5">Summer Hits <ExternalLink className="w-2.5 h-2.5 opacity-50" /></div>
                              <div className="text-[10px] text-[#1DB954]/60">Spotify</div>
                            </div>
                          </a>
                          <a href="https://open.spotify.com/playlist/37i9dQZF1DX1BzILRveYHb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-3 rounded-xl bg-[#1DB954]/15 border border-[#1DB954]/30 hover:bg-[#1DB954]/25 transition-all active:scale-[0.97]" data-testid="link-spotify-chill">
                            <span className="text-lg">🌅</span>
                            <div className="text-left flex-1">
                              <div className="text-sm font-bold text-[#1DB954] flex items-center gap-1.5">Sunset Chill <ExternalLink className="w-2.5 h-2.5 opacity-50" /></div>
                              <div className="text-[10px] text-[#1DB954]/60">Spotify</div>
                            </div>
                          </a>
                          <a href="https://music.apple.com/us/playlist/todays-hits/pl.f4d106fed2bd41149aaacabb233eb5eb" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.06] border border-border text-white font-bold text-sm hover:bg-white/[0.1] transition-all active:scale-[0.97] mt-1" data-testid="link-apple-music">
                            🎶 Browse on Apple Music <ExternalLink className="w-3 h-3 opacity-50" />
                          </a>
                        </div>
                      </details>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/wifi" data-testid="toggle-wifi-info">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">
                            <Wifi className="w-4 h-4 text-primary" />
                            WiFi & Charging
                          </span>
                          <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/wifi:rotate-90" />
                        </summary>
                        <div className="px-4 pb-4 space-y-2">
                          {[
                            { tip: "Hotel WiFi is strongest in the lobby and by the pool", emoji: "📶" },
                            { tip: "Ask the front desk for the current WiFi password", emoji: "🔑" },
                            { tip: "Charging stations available in the lobby lounge", emoji: "🔌" },
                            { tip: "Bring a portable charger to the beach — no outlets out there", emoji: "🔋" },
                          ].map(({ tip, emoji }) => (
                            <div key={tip} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-border">
                              <span className="text-base shrink-0">{emoji}</span>
                              <p className="text-xs text-white/80 font-medium">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </details>

                      <details className="bg-white/[0.06] border-2 border-primary/30 rounded-xl group/photo" data-testid="toggle-photo-challenge">
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                          <span className="flex items-center gap-2 text-white font-extrabold text-sm">📸 Photo Challenge</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">{Object.values(photoChallenge).filter(Boolean).length}/8</span>
                            <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/photo:rotate-90" />
                          </div>
                        </summary>
                        <div className="px-4 pb-4 space-y-1.5">
                          <p className="text-xs text-muted-foreground mb-2">Complete these challenges and share with #TidesFollyBeach!</p>
                          {[
                            { item: "Sunset silhouette shot", emoji: "🌅" },
                            { item: "Pier selfie", emoji: "🤳" },
                            { item: "Slow-mo wave video", emoji: "🌊" },
                            { item: "Feet in the sand overhead shot", emoji: "👣" },
                            { item: "Best food photo", emoji: "📸" },
                            { item: "Sunrise from your balcony", emoji: "🌄" },
                            { item: "Catch a dolphin on camera", emoji: "🐬" },
                            { item: "Golden hour beach portrait", emoji: "✨" },
                          ].map(({ item, emoji }) => (
                            <button key={item} onClick={() => togglePhoto(item)} className={`w-full flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all active:scale-[0.97] text-left ${photoChallenge[item] ? "bg-primary/15 border-primary/40" : "bg-white/[0.03] border-border hover:bg-white/[0.06]"}`} data-testid={`photo-${item.replace(/\s+/g, '-').toLowerCase()}`}>
                              <span className="text-base">{emoji}</span>
                              <span className={`text-sm font-bold flex-1 ${photoChallenge[item] ? "text-primary line-through" : "text-white"}`}>{item}</span>
                              {photoChallenge[item] && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                            </button>
                          ))}
                        </div>
                      </details>

                      <div className="space-y-2">
                        <p className="text-xs font-extrabold text-white text-center">Share Your Folly</p>
                        <div className="flex gap-2">
                          <a href="https://www.instagram.com/tidesfb/" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl bg-white/[0.06] border-2 border-border text-white hover:bg-white/[0.1] transition-all active:scale-[0.97]" data-testid="link-instagram-teens">
                            <span className="text-lg">📸</span>
                            <span className="text-xs font-bold">Instagram</span>
                            <span className="text-[10px] text-primary font-bold flex items-center gap-0.5">@tidesfb <ExternalLink className="w-2.5 h-2.5 opacity-50" /></span>
                          </a>
                          <a href="https://www.facebook.com/TidesFollyBeach/" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center gap-1 py-3 rounded-xl bg-white/[0.06] border-2 border-border text-white hover:bg-white/[0.1] transition-all active:scale-[0.97]" data-testid="link-facebook-teens">
                            <span className="text-lg">👍</span>
                            <span className="text-xs font-bold">Facebook</span>
                            <span className="text-[10px] text-[#1877F2] font-bold flex items-center gap-0.5">26K likes <ExternalLink className="w-2.5 h-2.5 opacity-50" /></span>
                          </a>
                        </div>
                        <p className="text-[10px] text-primary/60 font-bold text-center">#TidesFollyBeach</p>
                      </div>
                    </>)}

                    <button onClick={resetAllKids} className="w-full py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-white/5 transition-colors active:scale-[0.97]" data-testid="button-reset-kids">
                      Reset All Progress
                    </button>
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      <section className="px-4 space-y-3 pb-2">
        <details className="rounded-xl border-2 border-primary/30 bg-[#0d2a3a] group" data-testid="toggle-return-guest">
          <summary className="p-3.5 cursor-pointer list-none flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Waves className="w-4 h-4 text-primary shrink-0" />
              <div>
                <div className="text-[10px] font-bold text-primary uppercase tracking-wider">Return Guest</div>
                <div className="text-sm font-extrabold text-white leading-tight">Already Missing the Waves?</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-primary transition-transform group-open:rotate-90 shrink-0 ml-2" />
          </summary>
          <div className="px-3.5 pb-3.5 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
              <span className="text-xs font-extrabold text-white">Book Direct & Save — Return Guest Perks</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://reservations.tidesfollybeach.com/111875"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-primary text-white font-extrabold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
                data-testid="link-book-next-stay"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Next Stay
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
              <a
                href="https://www.tidesfollybeach.com/surf-cam/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/[0.06] border border-border text-primary font-extrabold text-sm hover:bg-white/[0.1] transition-all active:scale-[0.98]"
                data-testid="link-surfs-up-cam"
              >
                <Waves className="w-4 h-4" />
                Live Cam
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>

            <a
              href="https://maps.app.goo.gl/XmrA14st1nCzHtWW6?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-white/[0.06] border border-border transition-all active:scale-[0.98] hover:bg-white/[0.08]"
              data-testid="link-rate-stay"
            >
              <div className="flex gap-0.5 shrink-0">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-xs text-white">Loved Your Stay?</div>
                <div className="text-[10px] text-muted-foreground">Leave a 5-star Google review</div>
              </div>
              <ExternalLink className="w-3 h-3 text-primary/50 shrink-0" />
            </a>

            <details className="bg-primary/15 border-2 border-primary/30 rounded-xl group/offers" data-testid="toggle-offers">
              <summary className="p-3 cursor-pointer list-none flex items-center justify-between">
                <span className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Tag className="w-4 h-4" />
                  Avocet Collection — Current Deals
                </span>
                <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/offers:rotate-90" />
              </summary>
              <div className="px-3 pb-3 space-y-2 pt-1">
                <p className="text-[11px] text-[#a8c8d4] font-medium">Deals update automatically — always current.</p>
                {avocetProperties.map((prop) => (
                  <details key={prop.property} className="bg-white/[0.06] border border-border rounded-xl group/prop" data-testid={`property-${prop.property.toLowerCase().replace(/\s+/g, '-')}`}>
                    <summary className="p-3 cursor-pointer list-none flex items-center justify-between">
                      <div>
                        <div className="text-sm font-extrabold text-white">{prop.property}</div>
                        <div className="text-[10px] text-muted-foreground">{prop.loc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/prop:rotate-90 shrink-0" />
                    </summary>
                    <div className="px-3 pb-3 space-y-2.5">
                      <p className="text-xs text-[#a8c8d4] font-medium leading-relaxed">{prop.sell}</p>
                      <div className="flex gap-2">
                        <a href={prop.offersUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all active:scale-[0.97]" data-testid={`link-deals-${prop.property.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Tag className="w-3.5 h-3.5" />
                          Current Deals
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                        <a href={prop.siteUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.08] border border-border text-primary text-xs font-bold hover:bg-white/[0.15] transition-all active:scale-[0.97]" data-testid={`link-site-${prop.property.toLowerCase().replace(/\s+/g, '-')}`}>
                          Visit Website
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </details>

            <details className="bg-primary/15 border-2 border-primary/30 rounded-xl group/insider" data-testid="toggle-insider">
              <summary className="p-3 cursor-pointer list-none flex items-center justify-between">
                <span className="flex items-center gap-2 text-white font-bold text-sm">
                  <Star className="w-4 h-4 text-primary" />
                  Join Tides Insiders
                </span>
                <ChevronRight className="w-4 h-4 text-primary transition-transform group-open/insider:rotate-90" />
              </summary>
              <div className="px-3 pb-3 space-y-3 pt-1">
                <p className="text-xs text-[#a8c8d4] font-medium">
                  Get exclusive return-guest rates, early access to specials, and VIP perks sent straight to your inbox.
                </p>
                {insiderSent ? (
                  <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/30 border-2 border-emerald-500/40">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm text-emerald-300 font-bold">You're in! Check your email app to send.</span>
                  </div>
                ) : (
                  <div className="flex gap-2 w-full">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={insiderEmail}
                      onChange={(e) => setInsiderEmail(e.target.value)}
                      className="flex-1 min-w-0 bg-black/40 border-2 border-primary/25 rounded-xl px-3 py-3 text-[16px] sm:text-sm text-white placeholder:text-[#5a8a9a] font-medium focus:outline-none focus:border-primary/50"
                      data-testid="input-insider-email"
                    />
                    <button
                      onClick={handleInsiderSignup}
                      className="px-4 py-3 rounded-xl bg-primary text-white font-extrabold text-sm hover:bg-primary/90 transition-all active:scale-[0.97] flex items-center gap-1.5 shrink-0"
                      data-testid="button-insider-signup"
                    >
                      <Mail className="w-4 h-4" />
                      Join
                    </button>
                  </div>
                )}
              </div>
            </details>
          </div>
        </details>

      </section>

      <footer className="px-4 py-6 flex flex-col gap-4">
        <button
          onClick={() => setShowInstallGuide(true)}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-white/[0.05] border border-primary/20 text-primary/70 font-medium text-xs hover:bg-primary/15 transition-all active:scale-[0.98]"
          data-testid="button-save-home-screen"
        >
          <Download className="w-5 h-5" />
          Save to Home Screen
        </button>
        <div className="text-[11px] text-muted-foreground/60 leading-relaxed text-center px-2">
          Some links open external websites that require an internet connection and may load slowly on limited Wi-Fi.
        </div>
        <div className="text-xs text-muted-foreground font-medium text-center">
          &copy; {new Date().getFullYear()} Tides Folly Beach. All rights reserved.
        </div>
      </footer>

      <AnimatePresence>
        {showDirections && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowDirections(false)}
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
                  onClick={() => setShowDirections(false)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-bold text-white hover:bg-white/5 transition-colors"
                  data-testid="button-directions-cancel"
                >
                  Stay Here
                </button>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Tides+Folly+Beach,+1+Center+Street,+Folly+Beach,+SC+29439"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowDirections(false)}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-bold text-center hover:bg-primary/90 transition-colors"
                  data-testid="button-directions-confirm"
                >
                  Get Directions <ExternalLink className="w-3 h-3 opacity-50 inline ml-1" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showInstallGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowInstallGuide(false)}
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
                <button onClick={() => setShowInstallGuide(false)} className="text-muted-foreground hover:text-white transition-colors p-1" data-testid="button-close-install-guide">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 py-5 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Add this app to your home screen for instant access — just like a regular app. No download from the app store needed!
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#007AFF]/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#007AFF]" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    </div>
                    <h3 className="font-bold text-white text-sm">iPhone / iPad (Safari)</h3>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">1</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap the <span className="inline-flex items-center gap-1 text-[#007AFF] font-semibold"><Share className="w-3.5 h-3.5" /> Share</span> button at the bottom of Safari
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">2</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Scroll down and tap <span className="inline-flex items-center gap-1 text-white font-semibold"><Plus className="w-3.5 h-3.5" /> Add to Home Screen</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">3</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap <span className="text-white font-semibold">Add</span> in the top right corner
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/30" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#3DDC84]/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#3DDC84]" fill="currentColor"><path d="M17.523 2.592l1.487-2.574a.3.3 0 00-.521-.302L17 2.295A8.042 8.042 0 0012 1.058a8.04 8.04 0 00-5 1.237L5.511-.28a.3.3 0 00-.521.302l1.487 2.574A7.588 7.588 0 003 10.408h18a7.591 7.591 0 00-3.477-7.816zM8.5 7.908a1 1 0 110-2 1 1 0 010 2zm7 0a1 1 0 110-2 1 1 0 010 2zM3 11.908v8a2 2 0 002 2h1v3a1.5 1.5 0 003 0v-3h6v3a1.5 1.5 0 003 0v-3h1a2 2 0 002-2v-8H3zm-2.5 0a1.5 1.5 0 00-1.5 1.5v5a1.5 1.5 0 003 0v-5a1.5 1.5 0 00-1.5-1.5zm23 0a1.5 1.5 0 00-1.5 1.5v5a1.5 1.5 0 003 0v-5a1.5 1.5 0 00-1.5-1.5z"/></svg>
                    </div>
                    <h3 className="font-bold text-white text-sm">Android / Samsung (Chrome)</h3>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">1</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap the <span className="inline-flex items-center gap-1 text-white font-semibold"><MoreVertical className="w-3.5 h-3.5" /> three dots</span> menu in the top right of Chrome
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">2</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap <span className="inline-flex items-center gap-1 text-white font-semibold"><Download className="w-3.5 h-3.5" /> Add to Home screen</span> or <span className="text-white font-semibold">Install app</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">3</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap <span className="text-white font-semibold">Add</span> or <span className="text-white font-semibold">Install</span> to confirm
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/30" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF6600]/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#FF6600]" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5S3.5 16.687 3.5 12 7.313 3.5 12 3.5zM8 10.5L12 6l4 4.5h-3V15H11v-4.5H8z"/></svg>
                    </div>
                    <h3 className="font-bold text-white text-sm">Samsung Internet Browser</h3>
                  </div>
                  <div className="space-y-3 pl-2">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">1</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap the <span className="text-white font-semibold">menu icon</span> (three lines) at the bottom right
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">2</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap <span className="inline-flex items-center gap-1 text-white font-semibold"><Plus className="w-3.5 h-3.5" /> Add page to</span> then select <span className="text-white font-semibold">Home screen</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">3</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tap <span className="text-white font-semibold">Add</span> to confirm
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Once saved, the app will appear on your home screen like any other app. It loads instantly and works even without Wi-Fi!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowInstallGuide(false)}
                  className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
                  data-testid="button-got-it-install"
                >
                  Got It!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showGuestGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => { setShowGuestGate(false); setGuestGateAction(null); }}
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
                    onChange={(e) => setGuestName(e.target.value)}
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
                    onChange={(e) => setGuestRoom(e.target.value)}
                    placeholder="e.g. 301"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border-2 border-border text-white text-base placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    data-testid="input-guest-room"
                    onKeyDown={(e) => { if (e.key === "Enter") handleGuestVerify(); }}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowGuestGate(false); setGuestGateAction(null); }}
                  className="flex-1 py-3.5 rounded-xl border-2 border-border text-base font-bold text-white hover:bg-white/5 transition-colors active:scale-[0.97]"
                  data-testid="button-guest-gate-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGuestVerify}
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPushPrompt && pushStatus === "idle" && (
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
                  onClick={handlePushDismiss}
                  className="text-white/40 hover:text-white/60 shrink-0"
                  data-testid="button-push-dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handlePushAccept}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
                  data-testid="button-push-accept"
                >
                  Yes, notify me
                </button>
                <button
                  onClick={handlePushDismiss}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-border text-white/60 font-bold text-sm hover:bg-white/10 transition-all active:scale-[0.98]"
                  data-testid="button-push-reject"
                >
                  No thanks
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
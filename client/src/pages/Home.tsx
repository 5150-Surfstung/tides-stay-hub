import { useState, useEffect, useRef } from "react";
import { usePersistedRecord } from "@/hooks/use-persisted-state";
import { 
  X, ExternalLink, ChevronRight, Anchor, Sailboat, Music, Sunrise,
  Fish, Sparkles, CheckCircle2, Download,
  Star, Flame, Sun, Cloud, CloudRain, CloudDrizzle,
  CloudLightning, CloudSun, CloudFog, Snowflake, Wind, Droplets,
  Thermometer, ArrowUp, ArrowDown, Eye, Waves,
  MapPin, Video, Wifi, Compass, Shell, Utensils,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { navItems } from "@/data/constants";
import DirectionsModal from "@/components/modals/DirectionsModal";
import InstallGuideModal from "@/components/modals/InstallGuideModal";
import tidesHero from "@assets/IMG_2823_1771852254855.jpeg";

export default function Home() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [showBeachConditions, setShowBeachConditions] = useState(false);
  const [kidsTab, setKidsTab] = useState<"kids" | "teens">("kids");
  const [scavengerItems, toggleScavenger, resetScavenger] = usePersistedRecord("tides_scavenger");
  const [bingoItems, toggleBingo, resetBingo] = usePersistedRecord("tides_bingo");
  const [sandcastleParts, toggleSandcastle, resetSandcastle] = usePersistedRecord("tides_sandcastle");
  const [shellCollection, toggleShell, resetShells] = usePersistedRecord("tides_shells");
  const [photoChallenge, togglePhoto, resetPhotos] = usePersistedRecord("tides_photos");
  const [teenChallenges, toggleTeenChallenge, resetTeenChallenges] = usePersistedRecord("tides_teen_challenges");
  const totalActivities = Object.values(scavengerItems).filter(Boolean).length + Object.values(bingoItems).filter(Boolean).length + Object.values(sandcastleParts).filter(Boolean).length + Object.values(shellCollection).filter(Boolean).length + Object.values(photoChallenge).filter(Boolean).length + Object.values(teenChallenges).filter(Boolean).length;
  const badgeLevel = totalActivities >= 21 ? { name: "Folly Legend", emoji: "👑" } : totalActivities >= 13 ? { name: "Beach Captain", emoji: "⚓" } : totalActivities >= 6 ? { name: "Sand Dollar Explorer", emoji: "🏖️" } : { name: "Tide Scout", emoji: "🐚" };
  const resetAllKids = () => {
    resetScavenger(); resetBingo(); resetSandcastle(); resetShells(); resetPhotos(); resetTeenChallenges();
  };
  const panelRef = useRef<HTMLDivElement>(null);

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

  const WeatherIcon = ({ icon, className }: { icon: string; className?: string }) => {
    const iconMap: Record<string, any> = {
      "sun": Sun, "cloud-sun": CloudSun, "cloud": Cloud, "cloud-fog": CloudFog,
      "cloud-drizzle": CloudDrizzle, "cloud-rain": CloudRain, "snowflake": Snowflake,
      "cloud-lightning": CloudLightning,
    };
    const IconComp = iconMap[icon] || Sun;
    return <IconComp className={className} />;
  };

  return (
    <div className="max-w-[860px] mx-auto min-h-screen pb-12">
      <header className="sticky top-0 z-50 bg-[#0b2230]/90 backdrop-blur-md border-b border-border px-4 py-3 flex justify-center items-center relative">
        <div className="flex flex-col items-center">
          <svg width="40" height="8" viewBox="0 0 40 8" fill="none" className="mb-0.5">
            <path d="M2 2 C10 8, 30 8, 38 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
          <div className="text-base font-display font-extrabold text-white tracking-widest uppercase">The Folly Hub</div>
        </div>
      </header>

      <main className="p-4 space-y-3">
        <section className="relative rounded-[20px] overflow-hidden border border-border bg-card">
          <img src={tidesHero} alt="Folly Beach" className="w-full h-auto object-cover rounded-[20px]" />
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
            Welcome to<br /><span className="text-primary">Folly Beach</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm text-white/60 leading-relaxed max-w-[300px] mx-auto mb-4"
          >
            Your guide to Folly Beach — surf, sand, and everything in between.
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
                      href="https://www.surfline.com/surf-report/folly-beach-pier/5842041f4e65fad6a7708a65"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                      data-testid="link-surf-cam"
                    >
                      <Eye className="w-4 h-4" />
                      Watch Surf Cam <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://www.surfline.com/surf-report/folly-beach-pier/5842041f4e65fad6a7708a65"
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

        <section className="bg-white/[0.03] border-2 border-white/20 rounded-xl p-2.5 animate-soft-glow">
          <div className="grid grid-cols-3 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePanel(activePanel === item.id ? null : item.id)}
                data-testid={`button-nav-${item.id}`}
                className={`flex flex-col items-center justify-center gap-1 py-3 px-1 rounded-xl border transition-all active:scale-[0.96] ${
                  activePanel === item.id
                    ? "bg-white/10 ring-1 ring-white/20 border-white/20"
                    : "bg-white/[0.03] border-transparent hover:bg-white/[0.06]"
                }`}
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-bold leading-tight text-center text-white/80">
                  {item.label}
                </span>
              </button>
            ))}
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

                {activePanel === "thingstodo" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Surf, sand, and good vibes — everything worth doing on Folly Beach.
                    </p>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <Waves className="w-4 h-4 text-orange-400" />
                        </div>
                        <h3 className="text-base font-bold text-white">Get After It</h3>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { icon: Waves, title: "Surfing", desc: "Folly is the best surf break in South Carolina. Consistent swells, warm water, and a laid-back lineup. Lessons available for beginners — rentals are everywhere.", accent: "text-cyan-400", bg: "bg-cyan-400/10" },
                          { icon: Fish, title: "Fishing", desc: "Cast off the pier, wade the flats at low tide, or book a charter into the deep blue. Redfish, flounder, and sheepshead run year-round.", accent: "text-blue-400", bg: "bg-blue-400/10" },
                          { icon: Anchor, title: "Kayaking & Paddleboarding", desc: "Explore the creeks and marshes behind the island. Flat water, dolphins popping up next to you, and zero crowds. Rentals available at multiple spots.", accent: "text-teal-400", bg: "bg-teal-400/10" },
                          { icon: Wind, title: "Kiteboarding", desc: "The Washout is one of the East Coast's best kite spots. Steady onshore winds and a sandy bottom. Watch the locals rip or take a lesson yourself.", accent: "text-emerald-400", bg: "bg-emerald-400/10" },
                          { icon: Music, title: "Live Music & Nightlife", desc: "Bars up and down the island have live bands most nights. Reggae, country, rock — whatever the vibe, someone's playing it. Just follow the sound.", accent: "text-purple-400", bg: "bg-purple-400/10" },
                          { icon: Sailboat, title: "Boat Trips & Sailing", desc: "Sunset sails, dolphin cruises, sandbar trips. Get on the water and see the island from a different angle — especially at golden hour.", accent: "text-indigo-400", bg: "bg-indigo-400/10" },
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
                        <h3 className="text-base font-bold text-white">Slow It Down</h3>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { icon: Sunrise, title: "Sunrise & Sunset", desc: "East-facing beach means stunning sunrises over the Atlantic. Sunsets paint the marsh side gold. Either way, bring something to drink.", accent: "text-amber-400", bg: "bg-amber-400/10" },
                          { icon: Shell, title: "Shelling & Tide Pools", desc: "Low tide exposes sand dollars, whelks, and tiny crabs. Best finds are at the south end near the lighthouse — go early before everyone else.", accent: "text-pink-400", bg: "bg-pink-400/10" },
                          { icon: Eye, title: "Dolphin Watching", desc: "Atlantic bottlenose dolphins cruise the shoreline every day. Stand on the pier or just sit in the sand — they'll find you.", accent: "text-sky-400", bg: "bg-sky-400/10" },
                          { icon: Compass, title: "Morris Island Lighthouse", desc: "Iconic lighthouse at the south end of the island. Wade out at low tide to get close, or just enjoy the view. One of the most photographed spots in SC.", accent: "text-amber-400", bg: "bg-amber-400/10" },
                          { icon: Flame, title: "Beach Bonfires", desc: "Permitted on the beach after dark. Bring some wood, a speaker, and good company. Stars over the ocean hit different.", accent: "text-orange-400", bg: "bg-orange-400/10" },
                          { icon: Star, title: "Stargazing", desc: "Less light pollution than Charleston means actual stars. New moon nights are insane — you can see the Milky Way from the south end.", accent: "text-violet-400", bg: "bg-violet-400/10" },
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
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h3 className="text-base font-bold text-white">Free Stuff</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Walk the pier at sunrise",
                          "Watch surfers at The Washout",
                          "Explore tide pools at low tide",
                          "Spot dolphins from shore",
                          "Collect shells at the south end",
                          "Watch pelicans dive-bomb fish",
                          "Read a book in the sand",
                          "Skip stones on the flat side",
                        ].map(item => (
                          <div key={item} className="bg-black/20 border border-border rounded-lg px-3 py-2.5 text-xs text-white/80 font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activePanel === "folly" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A 6-mile barrier island 20 minutes from downtown Charleston. Laid-back, a little wild, and nothing like the rest of the coast.
                    </p>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-base font-bold text-white">Spots to Hit</h3>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { title: "The Pier", desc: "1,045 feet of concrete over the Atlantic. Fish off it, walk it at sunrise, or just lean on the railing and zone out. The view at the end is worth the walk.", emoji: "🌊", query: "Folly+Beach+Pier" },
                          { title: "The Washout", desc: "Where the surfers are. Consistent break, strong currents, and a vibe that feels more California than Carolina. Even if you don't surf, it's worth watching.", emoji: "🏄", query: "The+Washout+Folly+Beach" },
                          { title: "Morris Island", desc: "South end of the island. Walk past the houses, cross the inlet at low tide, and you'll find an empty beach with a lighthouse standing in the water. Unreal.", emoji: "🏝️", query: "Morris+Island+Lighthouse+Folly+Beach" },
                          { title: "Folly River & Marsh Side", desc: "The calm side of the island. Kayak the creeks, watch herons stalk the shallows, or just sit on a dock and let the creek do its thing.", emoji: "🦀", query: "Folly+River+Folly+Beach" },
                          { title: "Center Street", desc: "Main drag. Everything you need within a few blocks — food, drinks, surf shops, live music, and people-watching. Busiest on weekends.", emoji: "🎶", query: "Center+Street+Folly+Beach" },
                          { title: "Folly Beach County Park", desc: "South end. Lifeguards, showers, parking, and a calmer stretch of sand. Good for families or anyone who wants actual amenities.", emoji: "🏖️", query: "Folly+Beach+County+Park" },
                          { title: "The Sandbar at Low Tide", desc: "At low tide, a sandbar appears off the south end. Walk out to it and you're standing in the middle of the ocean on dry sand. Check tide times.", emoji: "🐚", query: "Folly+Beach+south+end" },
                        ].map(spot => (
                          <a
                            key={spot.title}
                            href={`https://www.google.com/maps?q=${spot.query}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-black/20 border border-border rounded-xl p-4 hover:bg-white/[0.06] transition-colors"
                            data-testid={`link-folly-${spot.title.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <div className="flex gap-3 items-start">
                              <span className="text-xl mt-0.5">{spot.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div className="font-bold text-[15px] text-white">{spot.title}</div>
                                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-2" />
                                </div>
                                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{spot.desc}</div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                        </div>
                        <h3 className="text-base font-bold text-white">Good to Know</h3>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: "Parking", detail: "Metered along the main roads, free if you walk a few blocks. County park has a flat lot fee." },
                          { label: "Water", detail: "Ocean temp ranges from ~58°F in winter to ~82°F in summer. Rip currents are real — swim near lifeguards." },
                          { label: "Tides", detail: "Big tidal swing here. Low tide exposes the sandbar and tide pools. High tide pushes the waterline up. Check times before you go." },
                          { label: "Wildlife", detail: "Dolphins daily, sea turtles nest May–October, pelicans everywhere. Loggerhead turtle nesting sites are roped off — respect them." },
                          { label: "Vibe", detail: "Folly is the anti-resort. Flip flops, no dress code, dogs on the beach before 10am and after 6pm. Keep it weird." },
                        ].map(tip => (
                          <div key={tip.label} className="bg-black/20 border border-border rounded-xl p-3.5">
                            <div className="font-bold text-sm text-white">{tip.label}</div>
                            <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{tip.detail}</div>
                          </div>
                        ))}
                      </div>
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
                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Folly Beach</div>
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
                            { item: "Find a sand dollar", emoji: "🪙" },
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
                                <div className="text-xs text-white/60 mt-1 font-medium">Amazing work, explorer!</div>
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
                                <div className="text-xs text-white/60 mt-1 font-medium">Take a photo and share it!</div>
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
                          <p className="text-xs text-muted-foreground mb-2">Complete dares to level up your badge!</p>
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
                            { tip: "Many cafes and restaurants on Folly offer free WiFi", emoji: "📶" },
                            { tip: "Check with your accommodation for WiFi details", emoji: "🔑" },
                            { tip: "Some spots on Center Street have public WiFi", emoji: "🔌" },
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
                          <p className="text-xs text-muted-foreground mb-2">Complete these challenges and share your photos!</p>
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
          &copy; {new Date().getFullYear()} The Folly Hub. All rights reserved.
        </div>
      </footer>

      <AnimatePresence>
        {showDirections && (
          <DirectionsModal onClose={() => setShowDirections(false)} />
        )}

        {showInstallGuide && (
          <InstallGuideModal onClose={() => setShowInstallGuide(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

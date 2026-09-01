import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/api/client";
import type { HeroBackground, PatchVersion } from "@/api/types";

export function HeroSection() {
  const [backgrounds, setBackgrounds] = useState<HeroBackground[]>([]);
  const [latestPatch, setLatestPatch] = useState<PatchVersion | null>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      api.getHero().catch(() => []),
      api.getLatestPatch().catch(() => null),
    ]).then(([bgs, patch]) => {
      if (isMounted) {
        setBackgrounds(bgs);
        setLatestPatch(patch);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (backgrounds.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const currentBgUrl = backgrounds[currentBgIndex]?.imageUrl;

  return (
    <section className="relative z-10 min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-4 py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <AnimatePresence mode="popLayout">
          {currentBgUrl ? (
            <motion.div
              key={currentBgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, zIndex: -1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("${currentBgUrl}")`,
              }}
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{
                backgroundImage: "url('/assets/global/bg/bg_repeat.png')",
                backgroundRepeat: "repeat",
              }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-radial from-background/90 via-background/70 to-background/40 z-10" />
        <div className="absolute inset-0 bg-linear-to-b from-background/50 via-transparent to-background z-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6 max-w-4xl relative z-20"
      >
        {latestPatch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/15 backdrop-blur-md text-accent text-xs sm:text-sm font-black tracking-wide shadow-xs"
          >
            <Sparkles size={14} />
            <span>Patch Version {latestPatch.version} Disponible</span>
          </motion.div>
        )}

        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            <span className="block text-accent drop-shadow-[0_0_25px_var(--color-accent)]">
              INAZUMA ELEVEN
            </span>
            <span className="block text-primary drop-shadow-[0_0_25px_var(--color-primary)] mt-1">
              GO GALAXY
            </span>
          </h1>

          <div className="pt-2 text-xl sm:text-3xl md:text-4xl font-black tracking-tight">
            <span className="text-bigbang drop-shadow-[0_0_15px_var(--color-bigbang)]">
              BIG BANG
            </span>
            <span className="text-muted-foreground mx-2.5 font-light">/</span>
            <span className="text-supernova drop-shadow-[0_0_15px_var(--color-supernova)]">
              SUPERNOVA
            </span>
            <span className="block text-base sm:text-xl md:text-2xl text-foreground/90 font-black mt-2 uppercase tracking-wide">
              Patch Français Intégral
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-foreground/90 font-bold max-w-xl mx-auto leading-relaxed drop-shadow-sm">
          L'aventure ultime traduite par la team{" "}
          <strong className="text-primary font-black">Stellar Project</strong>.
          <br className="hidden sm:inline" />
          <span className="text-muted-foreground font-medium">
            {" "}Une expérience complète créée par des fans, pour des fans.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center pt-4 sm:pt-6">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-12 sm:h-13 px-8 text-sm sm:text-base font-black rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_25px_var(--color-primary)] transition-all hover:scale-105 cursor-pointer"
          >
            <Link to="/telechargement">
              <Download className="mr-2 h-5 w-5" /> Télécharger le Patch
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-12 sm:h-13 px-8 text-sm sm:text-base font-black rounded-xl border-border bg-card/70 hover:bg-secondary text-foreground backdrop-blur-md transition-all hover:scale-105 cursor-pointer shadow-xs"
          >
            <Link to="/tutoriel">
              <Info className="mr-2 h-5 w-5 text-accent" /> Guide d'installation
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
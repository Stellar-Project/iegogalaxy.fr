import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_BACKGROUNDS } from "@/lib/constants";

export function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % HERO_BACKGROUNDS.length
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, zIndex: -1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${HERO_BACKGROUNDS[currentBgIndex]}")`,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 max-w-4xl relative z-20"
      >
        <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-4">
          Version 1.0 Disponible
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter drop-shadow-2xl space-y-2">
          <span className="block bg-linear-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)]">
            Inazuma Eleven
          </span>
          <span className="block bg-linear-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(34,211,238,0.5)]">
            GO Galaxy
          </span>
          <span className="block text-3xl md:text-5xl mt-4 pt-2">
            <span className="bg-linear-to-r from-white via-purple-300 to-fuchsia-500 bg-clip-text text-transparent font-bold">
              Big Bang / Supernova
            </span>
            <span className="block text-2xl md:text-3xl text-slate-300 font-semibold mt-2">
              Patch Français
            </span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
          L'aventure ultime traduite par la team{" "}
          <span className="font-semibold text-blue-400">Stellar Project</span>.
          <br />
          <span className="text-base text-slate-400">
            Une expérience créée par des fans, pour des fans.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105"
          >
            <a href="/telechargement">
              <Download className="mr-2 h-5 w-5" /> Télécharger le Patch
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md"
          >
            <a href="/apropos">
              <Info className="mr-2 h-5 w-5" /> En savoir plus
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

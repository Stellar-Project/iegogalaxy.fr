import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";
import { HistoryTimeline } from "@/components/HistoryTimeline";
import { CurrentChangelog } from "@/components/CurrentChangelog";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";
import { api } from "@/api/client";
import type { PatchVersion, SiteConfig } from "@/api/types";

export default function Download() {
  useMeta({
    title: "Téléchargement",
    description:
      "Télécharge les patches de traduction française pour Inazuma Eleven GO Galaxy Supernova et Big Bang.",
  });

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [patches, setPatches] = useState<PatchVersion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      api.getConfig().catch(() => null),
      api.getPatches().catch(() => []),
    ]).then(([cfg, patchList]) => {
      if (isMounted) {
        setConfig(cfg);
        setPatches(patchList);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <Loading fullScreen message="Chargement des téléchargements..." />;
  }

  const latest = patches.find((p) => p.isLatest) || patches[0];
  const version = latest?.version || "?";
  const releaseDate = latest?.date || "Non spécifiée";
  const patchSize = latest?.size || "450 Mo";
  const supernovaPatch = latest?.supernovaLink || "#";
  const bigbangPatch = latest?.bigbangLink || "#";
  const supernovaRom = latest?.supernovaRomLink || "#";
  const bigbangRom = latest?.bigbangRomLink || "#";
  const supernovaRomSize = latest?.supernovaRomSize || "3.5 Go";
  const bigbangRomSize = latest?.bigbangRomSize || "3.5 Go";
  const showPatch = config?.showPatch !== false;
  const showRom = config?.showRom === true;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-foreground bg-background overflow-hidden px-4 py-16 sm:py-24">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)/0.03,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16 sm:space-y-20 w-full">
        <div className="space-y-10 sm:space-y-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-6xl md:text-7xl font-black text-foreground tracking-tight"
            >
              Télécharge le <span className="text-accent">Jeu</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Redécouvrez Inazuma Eleven GO Galaxy en français intégral. Choisissez votre version :{" "}
              <span className="text-supernova font-black">Supernova</span>{" "}
              ou <span className="text-bigbang font-black">Big Bang</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-2.5 pt-2"
            >
              <Badge
                variant="outline"
                className="px-3.5 py-1.5 border-border bg-secondary/50 text-foreground text-xs gap-1.5 shadow-xs font-mono font-black"
              >
                <span className="font-semibold text-muted-foreground font-sans">
                  Version actuelle :
                </span>{" "}
                v{version}
              </Badge>
              <Badge
                variant="outline"
                className="px-3.5 py-1.5 border-border bg-secondary/50 text-foreground text-xs gap-1.5 shadow-xs font-black"
              >
                <Calendar size={13} className="text-accent" />
                <span>Publié le {releaseDate}</span>
              </Badge>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-2 sm:px-4">
            <GameCard
              title="Supernova"
              logo="/assets/pages/download/SN_Logo_HD.png"
              color="supernova"
              patchLink={supernovaPatch}
              patchSize={patchSize}
              romLink={supernovaRom}
              romSize={supernovaRomSize}
              showPatch={showPatch}
              showRom={showRom}
              delay={0}
            />
            <GameCard
              title="Big Bang"
              logo="/assets/pages/download/BB_Logo_HD.png"
              color="bigbang"
              patchLink={bigbangPatch}
              patchSize={patchSize}
              romLink={bigbangRom}
              romSize={bigbangRomSize}
              showPatch={showPatch}
              showRom={showRom}
              delay={0.15}
            />
          </div>
        </div>

        <CurrentChangelog />
        <HistoryTimeline />
      </div>
    </div>
  );
}
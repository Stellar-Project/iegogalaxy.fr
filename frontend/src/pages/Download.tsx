import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/GameCard";
import { HistoryTimeline } from "@/components/HistoryTimeline";
import { useMeta } from "@/lib/useMeta";
import { CurrentChangelog } from "@/components/CurrentChangelog";
import { useConfig, usePatches } from "@/api/useData";

export default function Download() {
  useMeta({ title: "Téléchargement", description: "Télécharge les patches de traduction française pour Inazuma Eleven GO Galaxy Supernova et Big Bang." });
  const { data: config } = useConfig();
  const { data: patches } = usePatches();

  const latest = patches.find((p) => p.isLatest);
  const version = latest?.version || "?";
  const releaseDate = latest?.date || "?";
  const patchSize = latest?.size || "?";
  const supernovaPatch = latest?.supernovaLink || "#";
  const bigbangPatch = latest?.bigbangLink || "#";
  const supernovaRom = latest?.supernovaRomLink || "#";
  const bigbangRom = latest?.bigbangRomLink || "#";
  const supernovaRomSize = latest?.supernovaRomSize || "?";
  const bigbangRomSize = latest?.bigbangRomSize || "?";
  const showPatch = config.showPatch !== false;
  const showRom = config.showRom === true;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-slate-200 bg-background overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-20 w-full">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
            >
              Télécharge le <span className="text-yellow-400">Jeu</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Redécouvrez Inazuma Eleven GO Galaxy. Choisissez votre version :{" "}
              <span className="text-yellow-400 font-semibold">Supernova</span>{" "}
              ou <span className="text-blue-400 font-semibold">Big Bang</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <Badge
                variant="outline"
                className="px-4 py-1.5 border-white/10 bg-white/5 text-slate-300 gap-2"
              >
                <span className="font-semibold text-white">
                  Version actuelle :
                </span>{" "}
                {version}
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-1.5 border-white/10 bg-white/5 text-slate-300 gap-2"
              >
                <Calendar size={14} className="text-yellow-400" />
                {releaseDate}
              </Badge>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4">
            <GameCard
              title="Supernova"
              logo="/assets/pages/download/SN_Logo_HD.png"
              color="yellow"
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
              color="blue"
              patchLink={bigbangPatch}
              patchSize={patchSize}
              romLink={bigbangRom}
              romSize={bigbangRomSize}
              showPatch={showPatch}
              showRom={showRom}
              delay={0.2}
            />
          </div>
        </div>

        <CurrentChangelog />
        <HistoryTimeline />
      </div>
    </div>
  );
}

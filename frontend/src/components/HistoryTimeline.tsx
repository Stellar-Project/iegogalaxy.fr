import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  GitCommit,
  Calendar,
  HardDrive,
  Archive,
  ArrowDownCircle,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PATCH_HISTORY } from "@/lib/patch-data";

export function HistoryTimeline() {
  const [openHistoryId, setOpenHistoryId] = useState<string | null>(null);

  const pastHistory = PATCH_HISTORY.slice(2);

  const toggleHistory = (ver: string) => {
    setOpenHistoryId(openHistoryId === ver ? null : ver);
  };

  if (pastHistory.length === 0) return null;

  // Si on afficher l'historique seulement s'il y a des entrées
  // if (PATCH_HISTORY.length === 0) return null;
  // Ne pas oublier de retirer le slice plus haut et le map en dessous

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto pt-16 relative"
    >
      <div className="flex items-center justify-center gap-3 mb-12 relative z-10">
        <div className="h-px w-12 bg-slate-800" />
        <History className="text-slate-500 h-5 w-5" />
        <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest">
          Anciennes versions
        </h2>
        <div className="h-px w-12 bg-slate-800" />
      </div>

      <div className="absolute left-[19px] top-32 bottom-0 w-px bg-slate-800/50 z-0" />

      <div className="space-y-8 relative z-10">
        {pastHistory.map((item, index) => {
          const isOpen = openHistoryId === item.version;
          return (
            <div key={index} className="relative pl-12">
              <div className="absolute left-0 top-2 h-[38px] w-[38px] rounded-full border-4 border-slate-950 bg-slate-800 text-slate-400 flex items-center justify-center z-20">
                <GitCommit size={18} />
              </div>

              <div className="bg-slate-900/80 hover:bg-slate-900 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 group hover:border-white/10 hover:shadow-xl">
                <div className="p-5 grid md:grid-cols-[1fr_auto] gap-6 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl font-bold text-white">
                        v{item.version}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md">
                        <Calendar size={14} /> {item.date}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md">
                        <HardDrive size={14} /> {item.size}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 shrink-0">
                    <Button
                      asChild
                      size="sm"
                      className="bg-yellow-950/30 text-yellow-500/80 border border-yellow-900/50 hover:bg-yellow-900/50 hover:text-yellow-400 hover:border-yellow-500 transition-all duration-300 font-semibold"
                    >
                      <a href={item.links.supernova}>
                        <Archive size={16} className="mr-2" /> Supernova
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-blue-950/30 text-blue-500/80 border border-blue-900/50 hover:bg-blue-900/50 hover:text-blue-400 hover:border-blue-500 transition-all duration-300 font-semibold"
                    >
                      <a href={item.links.bigbang}>
                        <Archive size={16} className="mr-2" /> Big Bang
                      </a>
                    </Button>
                  </div>
                </div>

                <div
                  role="button"
                  onClick={() => toggleHistory(item.version)}
                  className={`px-5 py-3 flex items-center justify-between cursor-pointer border-t border-white/5 transition-colors duration-300 group/trigger ${
                    isOpen
                      ? "bg-slate-800/50 text-white"
                      : "bg-slate-950/30 text-slate-400 hover:text-white hover:bg-slate-900/50"
                  }`}
                >
                  <span className="text-sm font-medium flex items-center gap-2">
                    <ArrowDownCircle
                      size={16}
                      className={`transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 text-blue-400"
                          : "group-hover/trigger:text-blue-400"
                      }`}
                    />
                    Détails et changements
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-slate-950/50 border-t border-white/5"
                    >
                      <div className="p-5 pt-3">
                        <ul className="space-y-3">
                          {item.changelog.map((change, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                            >
                              <CheckCircle2
                                size={18}
                                className="text-blue-500/70 mt-0.5 shrink-0"
                              />
                              <span>{change}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

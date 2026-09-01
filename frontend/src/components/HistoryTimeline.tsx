import { useEffect, useState } from "react";
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
import { api } from "@/api/client";
import type { PatchVersion } from "@/api/types";

export function HistoryTimeline() {
  const [patches, setPatches] = useState<PatchVersion[]>([]);
  const [openHistoryId, setOpenHistoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .getPatches()
      .then((data) => {
        if (isMounted) {
          setPatches(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const pastHistory = patches.slice(1);

  const toggleHistory = (ver: string) => {
    setOpenHistoryId((prev) => (prev === ver ? null : ver));
  };

  if (loading || pastHistory.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto pt-16 relative">
      <div className="flex items-center justify-center gap-3 mb-12 relative z-10">
        <div className="h-px w-12 bg-border" />
        <History className="text-muted-foreground h-5 w-5" />
        <h2 className="text-sm sm:text-base font-black text-foreground uppercase tracking-widest">
          Anciennes versions
        </h2>
        <div className="h-px w-12 bg-border" />
      </div>

      <div className="absolute left-4.75 top-32 bottom-0 w-px bg-border/60 z-0" />

      <div className="space-y-8 relative z-10">
        {pastHistory.map((item, index) => {
          const isOpen = openHistoryId === item.version;
          const changelog = item.changelog || [];

          return (
            <div key={item.version || index} className="relative pl-12">
              <div className="absolute left-0 top-2 h-9.5 w-9.5 rounded-full border-4 border-background bg-secondary text-muted-foreground flex items-center justify-center z-20">
                <GitCommit size={18} />
              </div>

              <div className="bg-card hover:bg-card rounded-lg border border-border overflow-hidden transition-colors duration-300 group hover:border-border/80">
                <div className="p-5 grid md:grid-cols-[1fr_auto] gap-6 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl font-black text-foreground font-mono">
                        v{item.version}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground font-medium">
                      {item.date && (
                        <span className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md border border-border/50">
                          <Calendar size={13} className="text-accent" /> {item.date}
                        </span>
                      )}
                      {item.size && (
                        <span className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md border border-border/50 font-mono">
                          <HardDrive size={13} className="text-primary" /> {item.size}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2.5 shrink-0">
                    {item.supernovaLink && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="bg-supernova/10 text-supernova border-supernova/30 hover:bg-supernova/20 hover:text-supernova font-black text-xs h-9 cursor-pointer"
                      >
                        <a
                          href={item.supernovaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Archive size={15} className="mr-1.5" /> Supernova
                        </a>
                      </Button>
                    )}
                    {item.bigbangLink && (
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="bg-bigbang/10 text-bigbang border-bigbang/30 hover:bg-bigbang/20 hover:text-bigbang font-black text-xs h-9 cursor-pointer"
                      >
                        <a
                          href={item.bigbangLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Archive size={15} className="mr-1.5" /> Big Bang
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {changelog.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleHistory(item.version)}
                      aria-expanded={isOpen}
                      className={`w-full px-5 py-3 flex items-center justify-between cursor-pointer border-t border-border transition-colors duration-200 group/trigger text-xs sm:text-sm font-black ${
                        isOpen
                          ? "bg-secondary/40 text-foreground"
                          : "bg-secondary/20 text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <ArrowDownCircle
                          size={15}
                          className={`transition-transform duration-300 ${
                            isOpen
                              ? "rotate-180 text-primary"
                              : "group-hover/trigger:text-primary"
                          }`}
                        />
                        Détails et changements
                      </span>
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="bg-secondary/20 border-t border-border overflow-hidden"
                        >
                          <div className="p-5 pt-3">
                            <ul className="space-y-2.5">
                              {changelog.map((change: string, idx: number) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-muted-foreground text-xs sm:text-sm leading-relaxed font-medium"
                                >
                                  <CheckCircle2
                                    size={16}
                                    className="text-primary mt-0.5 shrink-0"
                                  />
                                  <span>{change}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
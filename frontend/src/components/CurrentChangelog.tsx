import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { api } from "@/api/client";
import type { PatchVersion } from "@/api/types";
import { Badge } from "@/components/ui/badge";

export function CurrentChangelog() {
  const [patches, setPatches] = useState<PatchVersion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPatches = async () => {
      try {
        const data = await api.getPatches();
        if (isMounted) {
          setPatches(data);
        }
      } catch {
        // Ignorer l'erreur silencieusement sur la vue publique
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPatches();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || patches.length === 0) return null;

  const currentPatch = patches.find((p: PatchVersion) => p.isLatest) || patches[0];
  const changelogItems = currentPatch?.changelog || [];

  if (changelogItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-4xl mx-auto mt-12 mb-8 px-4"
    >
      <div className="bg-card/70 backdrop-blur-md border border-border rounded-2xl overflow-hidden relative group hover:border-primary/40 transition-all duration-300 shadow-xs">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-60" />

        <div className="absolute -left-12 -top-12 w-36 h-36 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 border border-primary/20 p-2.5 rounded-xl text-primary shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">
                    Nouveautés de la version
                  </h3>
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary font-mono text-xs font-black">
                    v{currentPatch.version}
                  </Badge>
                </div>
                {currentPatch.date && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5 font-medium">
                    <Calendar size={12} className="text-accent" />
                    Publié le {currentPatch.date} {currentPatch.size && `• ${currentPatch.size}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {changelogItems.map((change: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
                className="flex items-start gap-3 group/item p-2 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <CheckCircle2
                  size={18}
                  className="text-primary mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform"
                />
                <span className="text-muted-foreground text-sm leading-relaxed group-hover/item:text-foreground transition-colors font-medium">
                  {change}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground/80 font-medium">
            <AlertCircle size={13} className="shrink-0 text-muted-foreground" />
            <span>
              Projet amateur bénévole à but non lucratif. Tous les droits appartiennent à Level-5.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
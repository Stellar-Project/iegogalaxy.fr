import { useEffect, useState } from "react";
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
    <div className="w-full max-w-4xl mx-auto mt-12 mb-8 px-4">
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 border border-primary/20 p-2.5 rounded-lg text-primary shrink-0">
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
              <div
                key={idx}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/40 transition-colors"
              >
                <CheckCircle2
                  size={18}
                  className="text-primary mt-0.5 shrink-0"
                />
                <span className="text-muted-foreground text-sm leading-relaxed hover:text-foreground transition-colors font-medium">
                  {change}
                </span>
              </div>
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
    </div>
  );
}
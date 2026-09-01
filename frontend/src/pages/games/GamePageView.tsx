import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Gamepad2, Calendar, Download, ExternalLink, ArrowLeft } from "lucide-react";
import { api } from "@/api/client";
import type { Game } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";

export default function GamePageView() {
  const { slug } = useParams<{ slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    const fetchGame = async () => {
      try {
        const data = await api.getGame(slug);
        if (isMounted) {
          setGame(data);
        }
      } catch {
        if (isMounted) {
          setGame(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGame();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useMeta({ title: game?.name || "Jeu", description: game?.description });

  if (loading) {
    return <Loading fullScreen message="Chargement de la fiche du jeu..." />;
  }

  if (!game) {
    return (
      <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center text-muted-foreground space-y-4 px-4 text-center">
        <Gamepad2 size={48} className="opacity-30" />
        <p className="text-base font-black text-foreground">Jeu introuvable</p>
        <p className="text-xs">La page demandée n'existe pas ou a été retirée.</p>
        <Link
          to="/telechargement"
          className="text-xs font-black text-primary hover:underline inline-flex items-center gap-1 mt-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Voir les téléchargements
        </Link>
      </div>
    );
  }

  const statusPercent = parseInt(game.status, 10) || 0;
  const downloadUrl = game.downloadUrl || (game.filePath ? `/api/games/${game.slug}/download` : null);

  return (
    <div className="relative min-h-screen text-foreground bg-background px-4 sm:px-6 py-16 sm:py-24">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)/0.03,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors cursor-pointer">
            Accueil
          </Link>
          <ChevronRight size={14} />
          <Link to="/telechargement" className="hover:text-primary transition-colors cursor-pointer">
            Téléchargement
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-black truncate">{game.name}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 items-start"
        >
          <div className="w-full">
            {game.imageUrl ? (
              <img
                src={game.imageUrl}
                alt={game.name}
                className="w-full rounded-2xl border border-border shadow-md object-cover bg-card/70"
              />
            ) : (
              <div className="w-full aspect-3/4 rounded-2xl bg-secondary/60 border border-border flex items-center justify-center">
                <Gamepad2 size={64} className="text-muted-foreground/40" />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                {game.name}
              </h1>

              {game.releaseDate && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-mono">
                  <Calendar size={14} className="text-accent" />
                  <span>Date de sortie : {game.releaseDate}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 bg-card/70 border border-border rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-black text-muted-foreground">Avancement de la traduction</span>
                <span className="text-accent font-black font-mono">{game.status}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden border border-border/50">
                <div
                  className="bg-linear-to-r from-accent/80 to-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(Math.max(statusPercent, 0), 100)}%` }}
                />
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {game.description}
            </p>

            {downloadUrl ? (
              <div className="pt-2">
                <a
                  href={downloadUrl}
                  target={game.downloadUrl ? "_blank" : undefined}
                  rel={game.downloadUrl ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-xl font-black text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  {game.downloadUrl ? <ExternalLink size={16} /> : <Download size={16} />}
                  <span>{game.downloadUrl ? "Accéder au lien externe" : "Télécharger le jeu"}</span>
                  {game.fileSize && (
                    <Badge variant="outline" className="ml-1 bg-black/15 text-accent-foreground border-transparent text-[11px] font-mono font-black">
                      {game.fileSize}
                    </Badge>
                  )}
                </a>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground/80 italic pt-2">
                Aucun fichier n'est disponible au téléchargement pour le moment.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
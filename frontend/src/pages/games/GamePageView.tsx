import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
          to="/jeux"
          className="text-xs font-black text-primary hover:underline inline-flex items-center gap-1 mt-2 cursor-pointer"
        >
          <ArrowLeft size={14} /> Voir tous les jeux &amp; mods
        </Link>
      </div>
    );
  }

  const statusMatch = game.status.match(/^\s*(\d{1,3})\s*%/);
  const statusPercent = statusMatch ? Math.min(Math.max(parseInt(statusMatch[1], 10), 0), 100) : null;
  const downloadUrl = game.downloadUrl || (game.filePath ? `/api/games/${game.slug}/download` : null);

  return (
    <div className="relative min-h-screen text-foreground bg-background px-4 sm:px-6 py-16 sm:py-24">
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors cursor-pointer">
            Accueil
          </Link>
          <ChevronRight size={14} />
          <Link to="/jeux" className="hover:text-primary transition-colors cursor-pointer">
            Jeux &amp; Mods
          </Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-black truncate">{game.name}</span>
        </nav>

        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-8 items-start"
        >
          <div className="w-full">
            {game.imageUrl ? (
              <img
                src={game.imageUrl}
                alt={game.name}
                className="w-full rounded-lg border border-border object-cover bg-card"
              />
            ) : (
              <div className="w-full aspect-3/4 rounded-lg bg-secondary/60 border border-border flex items-center justify-center">
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

            {statusPercent !== null ? (
              <div className="space-y-2 bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-black text-muted-foreground">Avancement</span>
                  <span className="text-accent font-black font-mono">{game.status}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden border border-border/50">
                  <div
                    className="bg-accent h-full rounded-full"
                    style={{ width: `${statusPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              game.status && (
                <div>
                  <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent font-black font-mono text-xs px-3 py-1">
                    {game.status}
                  </Badge>
                </div>
              )
            )}

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {game.description}
            </p>

            {downloadUrl ? (
              <div className="pt-2">
                <a
                  href={downloadUrl}
                  target={game.downloadUrl ? "_blank" : undefined}
                  rel={game.downloadUrl ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-lg font-black text-sm cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}
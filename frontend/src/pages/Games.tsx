import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Gamepad2, ChevronRight, Search, Calendar, Download, ExternalLink } from "lucide-react";
import { api } from "@/api/client";
import type { Game } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";

export default function Games() {
  useMeta({
    title: "Jeux & Mods",
    description:
      "Découvrez tous les jeux, mods et projets de traduction du Stellar Project.",
  });

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;
    api
      .getPublishedGames()
      .then((data) => {
        if (isMounted) setGames(data);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return games;
    return games.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
    );
  }, [games, search]);

  if (loading) {
    return <Loading fullScreen message="Chargement des jeux..." />;
  }

  return (
    <div className="relative min-h-screen text-foreground bg-background px-4 py-16 sm:py-24">
      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <Link to="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <span className="text-primary font-medium">Jeux &amp; Mods</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight">
            Jeux <span className="text-accent">&amp; Mods</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Traductions, mods et projets développés ou soutenus par le Stellar
            Project.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              type="text"
              placeholder="Rechercher un jeu ou un mod..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-card/80 border-border rounded-2xl pl-11 pr-4 py-5 text-sm"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground space-y-3">
            {search ? (
              <>
                <p className="text-sm">
                  Aucun résultat ne correspond à «{" "}
                  <span className="text-foreground font-medium">{search}</span> ».
                </p>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-xs text-primary hover:underline cursor-pointer font-black"
                >
                  Effacer la recherche
                </button>
              </>
            ) : (
              <p className="text-sm">Aucun jeu ou mod disponible pour le moment.</p>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((game) => {
              const hasDownload = Boolean(game.downloadUrl || game.filePath);
              return (
                <Link key={game.id} to={`/jeux/${game.slug}`} className="block h-full group">
                  <Card className="bg-card/70 border-border hover:border-primary/40 hover:bg-card/90 transition-all duration-200 h-full shadow-xs">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-secondary/60 border border-border/40 mb-4 flex items-center justify-center">
                        {game.imageUrl ? (
                          <img
                            src={game.imageUrl}
                            alt={game.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Gamepad2 size={40} className="text-muted-foreground/40" />
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                          {game.name}
                        </h3>
                        {game.status && (
                          <Badge
                            variant="outline"
                            className="shrink-0 border-accent/40 bg-accent/10 text-accent text-[10px] font-black font-mono uppercase tracking-wider"
                          >
                            {game.status}
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                        {game.description}
                      </p>

                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/40 text-xs">
                        {game.releaseDate ? (
                          <span className="flex items-center gap-1.5 text-muted-foreground font-mono">
                            <Calendar size={12} className="text-accent" />
                            {game.releaseDate}
                          </span>
                        ) : (
                          <span />
                        )}

                        {hasDownload ? (
                          <span className="inline-flex items-center gap-1 font-black text-primary">
                            {game.downloadUrl ? <ExternalLink size={13} /> : <Download size={13} />}
                            Télécharger
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60 font-medium">Bientôt</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

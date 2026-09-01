import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "@/api/client";
import type { WikiTool } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";
import {
  BookOpen,
  ChevronRight,
  Search,
  Grid3X3,
  List,
  Tag,
  FileText,
} from "lucide-react";

export default function Wiki() {
  const [tools, setTools] = useState<WikiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    api
      .getWikiTools()
      .then((data) => {
        if (isMounted) setTools(data);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useMeta({
    title: "Wiki & Outils",
    description:
      "Ressources, guides, tutoriels et documentation pour le projet de traduction française d'Inazuma Eleven GO Galaxy.",
  });

  const allTags = useMemo(
    () => Array.from(new Set(tools.flatMap((t) => t.tags || []))).sort(),
    [tools]
  );

  const filtered = useMemo(() => {
    let result = tools;
    if (activeTag) {
      result = result.filter((t) => t.tags?.includes(activeTag));
    }
    const q = search.trim().toLowerCase();
    if (q.length >= 2) {
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [tools, activeTag, search]);

  const totalPages = useMemo(
    () => tools.reduce((sum, t) => sum + (t.pages?.length || 0), 0),
    [tools]
  );

  const handleToolClick = (tool: WikiTool) => {
    const firstSlug = tool.pages?.[0]?.slug;
    if (firstSlug) {
      navigate(firstSlug.startsWith("/") ? firstSlug : `/wiki/${firstSlug}`);
    }
  };

  return (
    <div className="relative min-h-screen text-foreground bg-background px-4 py-16 sm:py-24">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)/0.03,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <Link to="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <span className="text-primary font-medium">Wiki</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight">
            Wiki <span className="text-accent">Stellar Project</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Ressources, guides détaillés et documentation pour le projet de
            traduction française d'Inazuma Eleven GO Galaxy.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              placeholder="Rechercher un outil, un guide, un tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card/80 border border-border rounded-2xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`text-xs px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
                !activeTag
                  ? "bg-accent/15 text-accent border-accent/30 font-black shadow-xs"
                  : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              Tous
            </button>
            {allTags.map((tag) => {
              const isSelected = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(isSelected ? null : tag)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-accent/15 text-accent border-accent/30 font-black shadow-xs"
                      : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-muted-foreground font-mono">
              {filtered.length} {filtered.length > 1 ? "outils" : "outil"} · {totalPages} pages
            </span>
            <div className="flex bg-card rounded-xl border border-border p-0.5 shadow-xs">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="Affichage en grille"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  view === "grid"
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="Affichage en liste"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  view === "list"
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted-foreground space-y-4 py-16">
            <BookOpen size={48} className="mx-auto opacity-30" />
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
            ) : activeTag ? (
              <>
                <p className="text-sm">
                  Aucun outil associé au tag «{" "}
                  <span className="text-foreground font-medium">{activeTag}</span> ».
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTag(null)}
                  className="text-xs text-primary hover:underline cursor-pointer font-black"
                >
                  Voir tous les outils
                </button>
              </>
            ) : (
              <p className="text-sm">Aucun outil disponible pour le moment.</p>
            )}
          </div>
        ) : view === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tool, i) => {
              const hasPages = Boolean(tool.pages && tool.pages.length > 0);
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card
                    onClick={() => hasPages && handleToolClick(tool)}
                    className={`bg-card/70 border-border transition-all duration-200 h-full group shadow-xs ${
                      hasPages
                        ? "hover:border-primary/40 hover:bg-card/90 cursor-pointer"
                        : "opacity-90 cursor-default"
                    }`}
                  >
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-3">
                        {tool.imagePath ? (
                          <img
                            src={tool.imagePath}
                            alt=""
                            className="w-10 h-10 object-contain rounded-lg shrink-0 bg-secondary/30 p-1 border border-border/40"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-border/40">
                            <BookOpen size={18} className="text-muted-foreground" />
                          </div>
                        )}
                        <h3 className="text-base sm:text-lg font-black text-foreground group-hover:text-primary transition-colors truncate tracking-tight">
                          {tool.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                        {tool.description}
                      </p>

                      <div className="flex items-end justify-between mt-auto gap-2 pt-2 border-t border-border/40">
                        <div className="flex flex-wrap gap-1.5">
                          {tool.tags?.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[10px] bg-secondary/50 text-muted-foreground border-border px-2 py-0.5 gap-1 font-normal"
                            >
                              <Tag size={9} /> {tag}
                            </Badge>
                          ))}
                          {tool.tags && tool.tags.length > 3 && (
                            <span className="text-[10px] text-muted-foreground self-center">
                              +{tool.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {hasPages ? (
                            <span className="inline-flex items-center gap-1 text-xs font-black text-primary group-hover:underline">
                              <FileText size={13} />
                              {tool.pages!.length > 1
                                ? `${tool.pages!.length} pages`
                                : "Guide"}
                            </span>
                          ) : (
                            <span className="text-[11px] text-muted-foreground/60 font-medium">
                              En cours
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((tool, i) => {
              const hasPages = Boolean(tool.pages && tool.pages.length > 0);
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Card
                    onClick={() => hasPages && handleToolClick(tool)}
                    className={`bg-card/70 border-border transition-all duration-200 shadow-xs ${
                      hasPages
                        ? "hover:border-primary/40 hover:bg-card/90 cursor-pointer"
                        : "opacity-90 cursor-default"
                    }`}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      {tool.imagePath ? (
                        <img
                          src={tool.imagePath}
                          alt=""
                          className="w-10 h-10 object-contain rounded-lg shrink-0 bg-secondary/30 p-1 border border-border/40"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-border/40">
                          <BookOpen size={18} className="text-muted-foreground" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-black text-foreground truncate text-sm sm:text-base">
                            {tool.name}
                          </h3>
                          <div className="hidden sm:flex gap-1">
                            {tool.tags?.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-[10px] bg-secondary/50 text-muted-foreground border-border px-1.5 py-0"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {tool.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {hasPages ? (
                          <span className="inline-flex items-center gap-1 text-xs font-black text-primary">
                            <FileText size={13} />
                            {tool.pages!.length > 1
                              ? `${tool.pages!.length} pages`
                              : "Lire"}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground/60 font-medium">
                            Aucune page
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
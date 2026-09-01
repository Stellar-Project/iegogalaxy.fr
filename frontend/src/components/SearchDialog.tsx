import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import type { SearchResults } from "@/api/types";
import { Search, BookOpen, Wrench, Newspaper, Loader2 } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

interface SearchItem {
  url: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [rawResults, setRawResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      return;
    }

    let isMounted = true;
    const timer = setTimeout(() => {
      setLoading(true);
      api
        .search(trimmed)
        .then((data) => {
          if (isMounted) {
            setRawResults(data);
          }
        })
        .catch(() => {
          if (isMounted) {
            setRawResults(null);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  const hasValidQuery = query.trim().length >= 2;
  const results = hasValidQuery ? rawResults : null;

  const flatItems = useMemo<SearchItem[]>(() => {
    if (!results) return [];
    const list: SearchItem[] = [];

    for (const p of results.pages || []) {
      list.push({
        url: `/wiki/${p.slug}`,
        label: p.title,
        sub: `Page wiki${p.tool ? ` — ${p.tool.name}` : ""}`,
        icon: <BookOpen size={15} className="text-primary shrink-0" />,
      });
    }

    for (const t of results.tools || []) {
      list.push({
        url: `/wiki`,
        label: t.name,
        sub: t.description?.slice(0, 60) || "Outil de modding",
        icon: <Wrench size={15} className="text-primary shrink-0" />,
      });
    }

    for (const post of results.posts || []) {
      list.push({
        url: `/actualites/${post.slug}`,
        label: post.title,
        sub: post.excerpt?.slice(0, 60) || "Actualité",
        icon: <Newspaper size={15} className="text-accent shrink-0" />,
      });
    }

    return list;
  }, [results]);

  const total = flatItems.length;

  const handleClose = () => {
    setQuery("");
    setRawResults(null);
    setSelectedIdx(0);
    onClose();
  };

  const goTo = (url: string) => {
    handleClose();
    navigate(url);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, Math.max(total - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatItems[selectedIdx]) {
      e.preventDefault();
      goTo(flatItems[selectedIdx].url);
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-background/80 backdrop-blur-xs" />

      <div
        className="relative bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-secondary/20">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher pages wiki, outils, actualités..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm font-medium"
          />
          <kbd className="hidden sm:inline-flex text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border font-mono font-black">
            ESC
          </kbd>
        </div>

        <div ref={resultsContainerRef} className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
              <Loader2 size={18} className="animate-spin text-primary" />
              <span className="text-xs font-black">Recherche en cours...</span>
            </div>
          )}

          {!loading && results && total > 0 && (
            <div className="p-2 space-y-1">
              {results.pages && results.pages.length > 0 && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Pages wiki
                </div>
              )}
              {results.pages?.map((p, i) => {
                const isSelected = selectedIdx === i;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goTo(`/wiki/${p.slug}`)}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 text-foreground font-black"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <BookOpen size={15} className="text-primary shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="truncate block text-foreground font-bold">{p.title}</span>
                      {p.tool && (
                        <span className="text-[11px] text-muted-foreground block truncate">
                          {p.tool.name}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}

              {results.tools && results.tools.length > 0 && (
                <div className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Outils
                </div>
              )}
              {results.tools?.map((t, i) => {
                const idx = (results.pages?.length || 0) + i;
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => goTo("/wiki")}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 text-foreground font-black"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <Wrench size={15} className="text-primary shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="truncate block text-foreground font-bold">{t.name}</span>
                      <span className="text-[11px] text-muted-foreground truncate block">
                        {t.description}
                      </span>
                    </div>
                  </button>
                );
              })}

              {results.posts && results.posts.length > 0 && (
                <div className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                  Actualités
                </div>
              )}
              {results.posts?.map((p, i) => {
                const idx =
                  (results.pages?.length || 0) + (results.tools?.length || 0) + i;
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goTo(`/actualites/${p.slug}`)}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-primary/15 text-foreground font-black"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <Newspaper size={15} className="text-accent shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="truncate block text-foreground font-bold">{p.title}</span>
                      {p.excerpt && (
                        <span className="text-[11px] text-muted-foreground truncate block">
                          {p.excerpt}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {!loading && results && total === 0 && hasValidQuery && (
            <div className="flex flex-col items-center py-12 text-muted-foreground text-center px-4">
              <Search size={28} className="opacity-30 mb-2" />
              <p className="text-sm font-black text-foreground">
                Aucun résultat pour « {query} »
              </p>
              <p className="text-xs mt-1">
                Vérifiez l'orthographe ou essayez un autre mot-clé.
              </p>
            </div>
          )}

          {!loading && !hasValidQuery && (
            <div className="flex flex-col items-center py-12 text-muted-foreground text-center px-4">
              <Search size={28} className="opacity-30 mb-2" />
              <p className="text-sm font-bold">Tapez au moins 2 caractères pour lancer la recherche</p>
              <p className="text-[11px] mt-1 font-mono">
                Pages wiki · Outils · Actualités
              </p>
            </div>
          )}
        </div>

        {results && total > 0 && (
          <div className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground flex items-center gap-4 bg-secondary/20">
            <span className="flex items-center gap-1">
              <kbd className="bg-secondary px-1.5 py-0.5 rounded border border-border text-[10px] font-mono font-black">
                ↑↓
              </kbd>{" "}
              naviguer
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-secondary px-1.5 py-0.5 rounded border border-border text-[10px] font-mono font-black">
                ↵
              </kbd>{" "}
              ouvrir
            </span>
            <span className="flex items-center gap-1">
              <kbd className="bg-secondary px-1.5 py-0.5 rounded border border-border text-[10px] font-mono font-black">
                ESC
              </kbd>{" "}
              fermer
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
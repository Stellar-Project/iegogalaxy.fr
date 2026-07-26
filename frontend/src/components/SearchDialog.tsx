import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import type { SearchResults } from "@/api/types";
import { Search, BookOpen, Wrench, Newspaper, Loader2, ExternalLink } from "lucide-react";

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults(null);
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (query.length < 2) { setResults(null); return; }
    const timer = setTimeout(() => {
      setLoading(true);
      api.search(query).then(setResults).catch(() => {}).finally(() => setLoading(false));
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const items = useCallback(() => {
    if (!results) return [];
    const list: { url: string; label: string; sub: string; icon: JSX.Element }[] = [];
    for (const p of results.pages) list.push({ url: `/wiki/${p.slug}`, label: p.title, sub: `Page wiki${p.tool ? ` — ${p.tool.name}` : ""}`, icon: <BookOpen size={14} /> });
    for (const t of results.tools) list.push({ url: `/wiki`, label: t.name, sub: t.description.slice(0, 60), icon: <Wrench size={14} /> });
    for (const p of results.posts) list.push({ url: `/actualites/${p.slug}`, label: p.title, sub: p.excerpt?.slice(0, 60) || "", icon: <Newspaper size={14} /> });
    return list;
  }, [results]);

  const flatItems = items();
  const total = flatItems.length;

  const goTo = (url: string) => { onClose(); navigate(url); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, Math.max(total - 1, 0))); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && flatItems[selectedIdx]) goTo(flatItems[selectedIdx].url);
    if (e.key === "Escape") onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60" />
      <div className="relative bg-slate-900 border border-white/20 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search size={18} className="text-slate-500 shrink-0" />
          <input ref={inputRef} type="text" placeholder="Rechercher pages wiki, outils, articles..." value={query} onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0); }} onKeyDown={onKeyDown} className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm" />
          <kbd className="hidden sm:inline-flex text-[10px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded border border-white/10">ESC</kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8 text-slate-500"><Loader2 size={20} className="animate-spin" /></div>
          )}

          {!loading && results && total > 0 && (
            <div className="p-2 space-y-0.5">
              {results.pages.length > 0 && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Pages wiki</div>
              )}
              {results.pages.map((p, i) => (
                <button key={p.id} onClick={() => goTo(`/wiki/${p.slug}`)} onMouseEnter={() => setSelectedIdx(i)} className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedIdx === i ? "bg-blue-600/20 text-white" : "text-slate-300 hover:bg-white/5"}`}>
                  <BookOpen size={14} className="text-blue-400 shrink-0" />
                  <div className="min-w-0 flex-1"><span className="truncate block">{p.title}</span>{p.tool && <span className="text-[10px] text-slate-500">{p.tool.name}</span>}</div>
                </button>
              ))}
              {results.tools.length > 0 && (
                <div className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Outils</div>
              )}
              {results.tools.map((t, i) => {
                const idx = results.pages.length + i;
                return (
                  <button key={t.id} onClick={() => goTo("/wiki")} onMouseEnter={() => setSelectedIdx(idx)} className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedIdx === idx ? "bg-blue-600/20 text-white" : "text-slate-300 hover:bg-white/5"}`}>
                    <Wrench size={14} className="text-green-400 shrink-0" />
                    <div className="min-w-0 flex-1"><span className="truncate block">{t.name}</span><span className="text-[10px] text-slate-500 truncate block">{t.description}</span></div>
                  </button>
                );
              })}
              {results.posts.length > 0 && (
                <div className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Actualités</div>
              )}
              {results.posts.map((p, i) => {
                const idx = results.pages.length + results.tools.length + i;
                return (
                  <button key={p.id} onClick={() => goTo(`/actualites/${p.slug}`)} onMouseEnter={() => setSelectedIdx(idx)} className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedIdx === idx ? "bg-blue-600/20 text-white" : "text-slate-300 hover:bg-white/5"}`}>
                    <Newspaper size={14} className="text-yellow-400 shrink-0" />
                    <div className="min-w-0 flex-1"><span className="truncate block">{p.title}</span>{p.excerpt && <span className="text-[10px] text-slate-500 truncate block">{p.excerpt}</span>}</div>
                  </button>
                );
              })}
            </div>
          )}

          {!loading && results && total === 0 && query.length >= 2 && (
            <div className="flex flex-col items-center py-10 text-slate-500"><Search size={32} className="opacity-30 mb-2" /><p className="text-sm">Aucun résultat pour "{query}"</p></div>
          )}

          {!loading && !results && query.length < 2 && (
            <div className="flex flex-col items-center py-10 text-slate-500"><Search size={32} className="opacity-30 mb-2" /><p className="text-sm">Tape au moins 2 caractères pour rechercher</p><p className="text-[10px] text-slate-600 mt-1">Wiki · Outils · Actualités</p></div>
          )}

          {results && total > 0 && (
            <div className="border-t border-white/10 px-4 py-2 text-[10px] text-slate-600 flex items-center gap-3">
              <span><kbd className="bg-slate-800 px-1 rounded text-[10px]">↑↓</kbd> naviguer</span>
              <span><kbd className="bg-slate-800 px-1 rounded text-[10px]">↵</kbd> ouvrir</span>
              <span><kbd className="bg-slate-800 px-1 rounded text-[10px]">ESC</kbd> fermer</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

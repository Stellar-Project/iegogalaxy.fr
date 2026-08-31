import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import type { WikiTool } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";
import { BookOpen, ChevronRight, Search, Grid3X3, List, Tag, FileText } from "lucide-react";

export default function Wiki() {
  const [tools, setTools] = useState<WikiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  useEffect(() => {
    api.getWikiTools().then(setTools).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useMeta({ title: "Wiki", description: "Ressources, guides et documentation pour le projet de traduction." });

  const allTags = useMemo(() => [...new Set(tools.flatMap((t) => t.tags))].sort(), [tools]);

  const filtered = useMemo(() => {
    let result = tools;
    if (activeTag) result = result.filter((t) => t.tags.includes(activeTag));
    if (search.length >= 2) {
      const q = search.toLowerCase();
      result = result.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return result;
  }, [tools, activeTag, search]);

  const totalPages = tools.reduce((sum, t) => sum + (t.pages?.length || 0), 0);

  return (
    <div className="relative min-h-screen text-slate-200 bg-background px-4 py-20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-yellow-400">Wiki</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Wiki <span className="text-yellow-400">Stellar Project</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ressources, guides et documentation pour le projet de traduction francaise d'Inazuma Eleven GO Galaxy.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Rechercher un outil, une description, un tag..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20 transition-all" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setActiveTag(null)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!activeTag ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>Tous</button>
            {allTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${activeTag === tag ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>{tag}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">{filtered.length} outils · {totalPages} pages</span>
            <div className="flex bg-slate-900 rounded-lg border border-white/10 p-0.5">
              <button onClick={() => setView("grid")}
                className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-yellow-500/20 text-yellow-400" : "text-slate-500 hover:text-slate-300"}`}>
                <Grid3X3 size={16} />
              </button>
              <button onClick={() => setView("list")}
                className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-yellow-500/20 text-yellow-400" : "text-slate-500 hover:text-slate-300"}`}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <div className="text-center text-slate-500 space-y-4 py-12">
            <BookOpen size={48} className="mx-auto opacity-30" />
            {search ? (
              <><p>Aucun outil ne correspond a "<span className="text-slate-400">{search}</span>".</p>
              <button onClick={() => setSearch("")} className="text-sm text-yellow-400 hover:underline">Effacer la recherche</button></>
            ) : activeTag ? (
              <><p>Aucun outil avec le tag "<span className="text-slate-400">{activeTag}</span>".</p>
              <button onClick={() => setActiveTag(null)} className="text-sm text-yellow-400 hover:underline">Voir tous les outils</button></>
            ) : (
              <><p>Aucun outil disponible pour le moment.</p></>
            )}
          </div>
        ) : view === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tool, i) => (
              <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div onClick={() => { const s = tool.pages?.[0]?.slug; if (s) navigate(s.startsWith("/") ? s : `/wiki/${s}`); }}
                     className={`cursor-pointer ${!tool.pages?.length ? "cursor-default" : ""}`}>
                <Card className="bg-slate-900/50 border-white/10 hover:border-yellow-500/30 transition-all h-full group">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {tool.imagePath
                        ? <img src={tool.imagePath} alt="" className="w-10 h-10 object-contain rounded shrink-0" />
                        : <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center shrink-0"><BookOpen size={18} className="text-slate-500" /></div>}
                      <h3 className="text-lg font-bold text-white truncate">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4 line-clamp-3">{tool.description}</p>
                    <div className="flex items-end justify-between mt-auto gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[10px] bg-white/10 text-slate-400 px-2 py-0.5 rounded-full">
                            <Tag size={10} /> {tag}
                          </span>
                        ))}
                        {tool.tags.length > 3 && <span className="text-[10px] text-slate-500">+{tool.tags.length - 3}</span>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {tool.pages && tool.pages.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-blue-400">
                            <FileText size={12} /> {tool.pages.length > 1 ? `${tool.pages.length} pages` : "Guide"}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((tool, i) => (
              <motion.div key={tool.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                <div onClick={() => { const s = tool.pages?.[0]?.slug; if (s) navigate(s.startsWith("/") ? s : `/wiki/${s}`); }}
                     className={`cursor-pointer ${!tool.pages?.length ? "cursor-default" : ""}`}>
                <Card className="bg-slate-900/50 border-white/10 hover:border-yellow-500/30 transition-all">
                  <CardContent className="p-4 flex items-center gap-4">
                    {tool.imagePath
                      ? <img src={tool.imagePath} alt="" className="w-10 h-10 object-contain rounded shrink-0" />
                      : <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center shrink-0"><BookOpen size={18} className="text-slate-500" /></div>}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white truncate">{tool.name}</h3>
                        <div className="flex gap-1">
                          {tool.tags.map((tag) => (
                            <span key={tag} className="text-[10px] bg-white/10 text-slate-400 px-1.5 py-0.5 rounded-full">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{tool.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {tool.pages && tool.pages.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs text-blue-400">
                          <FileText size={12} /> {tool.pages.length > 1 ? `${tool.pages.length} pages` : "Lire"}
                        </span>
                      )}
                      {!tool.pages?.length && (
                        <span className="text-xs text-slate-600">Aucune page</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

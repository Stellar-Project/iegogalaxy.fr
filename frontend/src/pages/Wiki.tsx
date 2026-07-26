import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";
import type { WikiTool } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";
import { BookOpen, ChevronRight, ExternalLink, Tag } from "lucide-react";

export default function Wiki() {
  const [tools, setTools] = useState<WikiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    api.getWikiTools().then(setTools).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const allTags = [...new Set(tools.flatMap((t) => t.tags))].sort();
  const filtered = activeTag ? tools.filter((t) => t.tags.includes(activeTag)) : tools;

  return (
    <div className="relative min-h-screen flex flex-col items-center text-slate-200 bg-slate-950 px-4 py-20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-4">
            <Link to="/" className="hover:text-yellow-400 transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-yellow-400">Wiki</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Wiki <span className="text-yellow-400">Stellar Project</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ressources, guides et documentation pour le projet de traduction française d'Inazuma Eleven GO Galaxy.
          </p>
        </motion.div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button onClick={() => setActiveTag(null)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!activeTag ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>Tous</button>
            {allTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${activeTag === tag ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>{tag}</button>
            ))}
          </div>
        )}

        {loading ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <div className="text-center text-slate-500 space-y-4">
            {activeTag ? <><p>Aucun outil avec le tag "<span className="text-slate-400">{activeTag}</span>".</p><button onClick={() => setActiveTag(null)} className="text-sm text-yellow-400 hover:underline">Voir tous les outils</button></> : <><BookOpen size={48} className="mx-auto opacity-30" /><p>Aucun outil disponible pour le moment.</p></>}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool, i) => (
              <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="bg-slate-900/50 border-white/10 hover:border-yellow-500/30 transition-all h-full group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      {tool.imagePath && <img src={tool.imagePath} alt="" className="w-10 h-10 object-contain rounded" />}
                      <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-slate-400 flex-1 mb-4">{tool.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tool.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 text-[10px] bg-white/10 text-slate-400 px-2 py-0.5 rounded-full">
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      {tool.pages && tool.pages.length > 0 && (
                        <Link to={tool.pages[0].slug.startsWith("/") ? tool.pages[0].slug : `/wiki/${tool.pages[0].slug}`}
                          className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                          Voir le guide <ChevronRight size={14} />
                        </Link>
                      )}
                      {tool.link && tool.link !== "#" && (
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-white ml-auto flex items-center gap-1">
                          Site <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

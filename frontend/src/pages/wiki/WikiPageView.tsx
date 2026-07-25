import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/api/client";
import type { WikiPage } from "@/api/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WikiPageView() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getWikiPage(slug).then(setPage).catch(() => setPage(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-500">Chargement...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-500 space-y-4">
        <p>Page introuvable.</p>
        <Link to="/wiki" className="text-yellow-400 hover:underline">Retour au wiki</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-slate-200 bg-slate-950 overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('/assets/bg/bg_repeat.png')", backgroundRepeat: "repeat", backgroundPosition: "center top" }} />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Accueil</Link>
          <ChevronRight size={14} />
          <Link to="/wiki" className="hover:text-yellow-400 transition-colors">Wiki</Link>
          <ChevronRight size={14} />
          <span className="text-yellow-400">{page.title}</span>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/wiki" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-6">
            <ChevronLeft size={14} /> Retour au wiki
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8">{page.title}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="wiki-content prose prose-invert max-w-none [&_h2]:text-yellow-400 [&_h3]:text-yellow-300 [&_a]:text-blue-400 [&_a:hover]:text-blue-300 [&_code]:bg-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-slate-900 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_img]:rounded-lg [&_blockquote]:border-l-yellow-500 [&_blockquote]:text-slate-400 [&_table]:w-full [&_th]:text-left [&_th]:text-yellow-400 [&_td]:border-b [&_td]:border-white/10 [&_tr:last-child_td]:border-b-0"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {page.tool && (
          <div className="mt-12 pt-8 border-t border-white/10 text-sm text-slate-500">
            Outil associé : <Link to="/wiki" className="text-blue-400 hover:underline">{page.tool.name}</Link>
          </div>
        )}
      </div>
    </div>
  );
}

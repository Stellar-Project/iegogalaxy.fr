import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/api/client";
import type { Game } from "@/api/types";
import { motion } from "framer-motion";
import { ChevronRight, Gamepad2, Calendar, Download, ExternalLink, Server } from "lucide-react";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";

export default function GamePageView() {
  const { slug } = useParams<{ slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getGame(slug).then(setGame).catch(() => setGame(null)).finally(() => setLoading(false));
  }, [slug]);

  useMeta({ title: game?.name || "Jeu", description: game?.description });

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><Loading /></div>;

  if (!game) return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-slate-500 space-y-4 px-4">
      <Gamepad2 size={48} className="opacity-30" />
      <p>Jeu introuvable</p>
      <Link to="/telechargement" className="text-yellow-400 hover:underline">Voir les telechargements</Link>
    </div>
  );

  const statusPercent = parseInt(game.status) || 0;
  const downloadUrl = game.downloadUrl || (game.filePath ? `/api/games/${game.slug}/download` : null);

  return (
    <div className="relative min-h-screen text-slate-200 bg-background px-4 py-20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
          <ChevronRight size={14} />
          <Link to="/telechargement" className="hover:text-white transition-colors">Telechargement</Link>
          <ChevronRight size={14} />
          <span className="text-white">{game.name}</span>
        </nav>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-[300px_1fr] gap-8">
          <div>
            {game.imageUrl ? <img src={game.imageUrl} alt={game.name} className="w-full rounded-xl border border-white/10" /> : <div className="w-full aspect-[3/4] rounded-xl bg-slate-800 flex items-center justify-center"><Gamepad2 size={64} className="text-slate-600" /></div>}
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{game.name}</h1>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Avancement</span>
                <span className="text-yellow-400 font-semibold">{game.status}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full transition-all" style={{ width: `${Math.min(statusPercent, 100)}%` }} />
              </div>
            </div>

            {game.releaseDate && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar size={14} /> Date de sortie : {game.releaseDate}
              </div>
            )}

            <p className="text-slate-300 leading-relaxed">{game.description}</p>

            {downloadUrl && (
              <a href={downloadUrl} target={game.downloadUrl ? "_blank" : undefined} rel={game.downloadUrl ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                {game.downloadUrl ? <ExternalLink size={18} /> : <Download size={18} />}
                {game.downloadUrl ? "Lien externe" : "Telecharger"}
                {game.fileSize && <span className="text-xs text-yellow-200">({game.fileSize})</span>}
              </a>
            )}

            {!downloadUrl && (
              <p className="text-sm text-slate-500 italic">Aucun fichier disponible pour le moment.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

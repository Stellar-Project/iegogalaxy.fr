import { useEffect, useState } from "react";
import { api } from "@/api/client";
import type { FaqItem } from "@/api/types";
import { motion } from "framer-motion";
import { ChevronRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useMeta } from "@/lib/useMeta";

export default function Faq() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => { api.getFaq().then(setItems).catch(() => {}); }, []);

  useMeta({ title: "FAQ", description: "Questions fréquentes sur le projet de traduction Inazuma Eleven GO Galaxy." });

  const categories = [...new Set(items.map((i) => i.category))].sort();
  const filtered = activeCat ? items.filter((i) => i.category === activeCat) : items;

  return (
    <div className="relative min-h-screen text-slate-200 bg-slate-950 px-4 py-20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-yellow-400">FAQ</span>
          </nav>
          <h1 className="text-4xl font-extrabold text-white">FAQ</h1>
          <p className="text-slate-400">Questions fréquentes sur le projet Stellar Project</p>
        </motion.div>

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setActiveCat(null)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!activeCat ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>Toutes</button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCat(activeCat === cat ? null : cat)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${activeCat === cat ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>{cat}</button>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={item.id} className="border border-white/10 rounded-lg overflow-hidden">
              <button onClick={() => setOpenId(openId === item.id ? null : item.id)} className="w-full flex items-center gap-3 px-5 py-4 text-left bg-slate-900/50 hover:bg-slate-900/80 transition-colors">
                <HelpCircle size={16} className="text-yellow-400 shrink-0" />
                <span className="flex-1 text-sm font-medium text-white">{item.question}</span>
                <ChevronRight size={16} className={`text-slate-500 transition-transform shrink-0 ${openId === item.id ? "rotate-90" : ""}`} />
              </button>
              {openId === item.id && (
                <div className="px-5 py-4 bg-slate-900/30 border-t border-white/5">
                  <p className="text-sm text-slate-300 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-slate-500 py-8">Aucune question pour le moment.</p>}
        </div>
      </div>
    </div>
  );
}

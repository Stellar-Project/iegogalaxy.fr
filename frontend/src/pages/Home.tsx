"use client";

import { useState, useEffect } from "react";
import { api } from "@/api/client";
import type { Post, FaqItem } from "@/api/types";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import { ImageModal } from "@/components/ImageModal";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, ChevronDown, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => {
    api.getPosts().then(setPosts).catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  const cats = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();
  const filtered = activeCat ? posts.filter((p) => p.category === activeCat) : posts;

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h2 initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-white">
          Actualités
        </motion.h2>
        {cats.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setActiveCat(null)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!activeCat ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>Toutes</button>
            {cats.map((cat) => (
              <button key={cat} onClick={() => setActiveCat(activeCat === cat ? null : cat)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${activeCat === cat ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>{cat}</button>
            ))}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 3).map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-slate-900/50 border-white/10 hover:border-blue-500/30 transition-all h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    {post.category && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">{post.category}</span>}
                    <Calendar size={12} />
                    {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                  {post.excerpt && <p className="text-sm text-slate-400 flex-1">{post.excerpt}</p>}
                  <Link to={`/actualites/${post.slug}`} className="mt-4 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    Lire la suite <ArrowRight size={14} />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    api.getFaq().then((data) => setItems(data.slice(0, 4))).catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <motion.h2 initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-white">
          Questions fréquentes
        </motion.h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-slate-900/50 border border-white/10 rounded-lg overflow-hidden">
              <button onClick={() => setOpen(open === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-white/5 transition-colors">
                <span className="font-medium">{item.question}</span>
                <ChevronDown size={18} className={`shrink-0 transition-transform ${open === item.id ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === item.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    className="overflow-hidden">
                    <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/faq" className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
            Voir toutes les FAQ <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WikiCtaSection() {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20">
            <BookOpen size={32} className="text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Explorez le Wiki</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Personnages, techniques, objets, astuces — tout ce que vous devez savoir sur Inazuma Eleven GO Galaxy.
          </p>
          <Link to="/wiki" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105">
            Accéder au wiki <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  return (
    <main className="relative min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <HeroSection />
      <AboutSection />
      <NewsSection />
      <FaqSection />
      <WikiCtaSection />
      <ScreenshotCarousel onSelect={setSelectedImage} />

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  );
}

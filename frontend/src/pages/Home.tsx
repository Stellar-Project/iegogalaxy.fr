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
import { Calendar, ArrowRight, ChevronDown, BookOpen, HelpCircle, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

function SectionDivider() {
  return (
    <div className="relative z-10 flex justify-center py-4">
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => {
    api.getPosts().then(setPosts).catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  const cats = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();
  const filtered = activeCat ? posts.filter((p) => p.category === activeCat) : posts;
  const featured = filtered[0];
  const rest = filtered.slice(1, 3);

  return (
    <section className="relative z-10 py-20 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Actualités</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Les dernières news du projet Stellar</p>
        </motion.div>

        {cats.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setActiveCat(null)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${!activeCat ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>Toutes</button>
            {cats.map((cat) => (
              <button key={cat} onClick={() => setActiveCat(activeCat === cat ? null : cat)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${activeCat === cat ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"}`}>{cat}</button>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {featured && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Link to={`/actualites/${featured.slug}`} className="block group">
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-blue-500/30 rounded-xl p-6 md:p-8 transition-all">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    {featured.category && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">{featured.category}</span>}
                    <Calendar size={12} />
                    {new Date(featured.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{featured.title}</h3>
                  {featured.excerpt && <p className="text-sm text-slate-400">{featured.excerpt}</p>}
                  <span className="inline-flex items-center gap-1 mt-4 text-sm text-blue-400 group-hover:text-blue-300">
                    Lire la suite <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {rest.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/actualites/${post.slug}`} className="block group h-full">
                    <Card className="bg-slate-900/50 border-white/10 hover:border-blue-500/30 transition-all h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                          {post.category && <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">{post.category}</span>}
                          <Calendar size={12} />
                          {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{post.title}</h3>
                        {post.excerpt && <p className="text-sm text-slate-400 flex-1">{post.excerpt}</p>}
                        <span className="mt-4 text-sm text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                          Lire la suite <ArrowRight size={14} />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    api.getFaq().then((data) => setFaqItems(data.slice(0, 3))).catch(() => {});
  }, []);

  const links = [
    { icon: BookOpen, label: "Wiki complet", desc: "Personnages, techniques, objets", href: "/wiki", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: HelpCircle, label: "FAQ", desc: "Questions fréquentes", href: "/faq", color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: GraduationCap, label: "Tutoriel", desc: "Guide d'installation", href: "/tutoriel", color: "text-green-400", bg: "bg-green-500/10" },
  ];

  return (
    <section className="relative z-10 py-20 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ressources</h2>
          <p className="text-slate-400">Tout ce qu'il faut pour profiter du patch</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {links.map((link) => (
              <Link key={link.href} to={link.href}
                className="flex items-center gap-4 p-4 bg-slate-900/50 border border-white/10 rounded-xl hover:border-white/20 transition-all group">
                <div className={`w-12 h-12 rounded-lg ${link.bg} flex items-center justify-center shrink-0`}>
                  <link.icon size={24} className={link.color} />
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-white group-hover:text-blue-400 transition-colors">{link.label}</div>
                  <div className="text-xs text-slate-500">{link.desc}</div>
                </div>
                <ArrowRight size={16} className="ml-auto shrink-0 text-slate-600 group-hover:text-blue-400 transition-colors" />
              </Link>
            ))}
          </div>

          <div>
            {faqItems.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Questions fréquentes</h3>
                {faqItems.map((item) => (
                  <div key={item.id} className="bg-slate-900/50 border border-white/10 rounded-lg overflow-hidden">
                    <button onClick={() => setOpen(open === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-white/5 transition-colors gap-2">
                      <span className="text-sm font-medium">{item.question}</span>
                      <ChevronDown size={16} className={`shrink-0 transition-transform ${open === item.id ? "rotate-180" : ""}`} />
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
                <div className="text-center pt-2">
                  <Link to="/faq" className="text-xs text-blue-400 hover:text-blue-300">Voir toutes les FAQ →</Link>
                </div>
              </div>
            )}
          </div>
        </div>
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
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <NewsSection />
      <SectionDivider />
      <ResourcesSection />
      <SectionDivider />
      <ScreenshotCarousel onSelect={setSelectedImage} />

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  );
}

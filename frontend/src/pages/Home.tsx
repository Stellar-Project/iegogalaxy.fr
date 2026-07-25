"use client";

import { useState, useEffect } from "react";
import { api } from "@/api/client";
import type { Post } from "@/api/types";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import { ImageModal } from "@/components/ImageModal";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.getPosts().then(setPosts).catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h2 initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-white">
          Actualités
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-slate-900/50 border-white/10 hover:border-blue-500/30 transition-all h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
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
      <ScreenshotCarousel onSelect={setSelectedImage} />

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  );
}

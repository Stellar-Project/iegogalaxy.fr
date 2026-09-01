import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  ChevronDown,
  BookOpen,
  HelpCircle,
  GraduationCap,
} from "lucide-react";
import { api } from "@/api/client";
import type { Post, FaqItem } from "@/api/types";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import { ImageModal } from "@/components/ImageModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CategoryFilter from "@/components/CategoryFilter";

function SectionDivider() {
  return (
    <div className="relative z-10 flex items-center justify-center py-6">
      <span className="h-px w-24 bg-accent/40" />
    </div>
  );
}

function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    api
      .getPosts()
      .then((data) => {
        if (isMounted) setPosts(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const cats = useMemo(() => {
    const list = posts.map((p) => p.category).filter(Boolean) as string[];
    return Array.from(new Set(list)).sort();
  }, [posts]);

  if (posts.length === 0) return null;

  const filtered = activeCat
    ? posts.filter((p) => p.category === activeCat)
    : posts;
  const featured = filtered[0];
  const rest = filtered.slice(1, 3);

  return (
    <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="border-l-4 border-primary pl-4 space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Dernières Nouvelles
          </h2>
          <p className="text-sm text-muted-foreground">
            Suivez l'avancement des patchs, événements et sorties de la team Stellar Project.
          </p>
        </div>

        <CategoryFilter
          categories={cats}
          active={activeCat}
          onChange={setActiveCat}
          color="primary"
        />

        <div className="space-y-6">
          {featured && (
            <div>
              <Link to={`/actualites/${featured.slug}`} className="block group">
                <div className="bg-card border border-border hover:border-primary/50 rounded-lg p-6 sm:p-8 transition-colors duration-300">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground mb-3">
                    {featured.category && (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 border-primary/20 text-primary text-[10px] font-black"
                      >
                        {featured.category}
                      </Badge>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {new Date(featured.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-primary transition-colors mb-2 tracking-tight">
                    {featured.title}
                  </h3>
                  {featured.excerpt && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {featured.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-black text-primary group-hover:text-primary/80 transition-colors">
                    Lire l'article <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  to={`/actualites/${post.slug}`}
                  className="block group h-full"
                >
                  <Card className="bg-card border-border hover:border-primary/50 transition-colors duration-300 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground mb-3">
                        {post.category && (
                          <Badge
                            variant="outline"
                            className="bg-primary/10 border-primary/20 text-primary text-[10px] font-black"
                          >
                            {post.category}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors mb-2 tracking-tight">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground flex-1 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-4 text-sm font-black text-primary group-hover:text-primary/80 flex items-center gap-1.5">
                        Lire la suite <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
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
    let isMounted = true;
    api
      .getFaq()
      .then((data) => {
        if (isMounted) setFaqItems(data.slice(0, 3));
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const links = [
    {
      icon: BookOpen,
      label: "Wiki complet",
      desc: "Joueurs, techniques, esprits guerriers et objets",
      href: "/wiki",
      color: "text-primary",
      bg: "bg-primary/10 border border-primary/20",
    },
    {
      icon: HelpCircle,
      label: "Centre d'Aide & FAQ",
      desc: "Réponses aux questions les plus courantes",
      href: "/faq",
      color: "text-accent",
      bg: "bg-accent/10 border border-accent/20",
    },
    {
      icon: GraduationCap,
      label: "Guides & Tutoriels",
      desc: "Installation pas-à-pas sur 3DS et émulateur",
      href: "/tutoriel",
      color: "text-supernova",
      bg: "bg-supernova/10 border border-supernova/20",
    },
  ];

  return (
    <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 border-t border-border">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="border-l-4 border-accent pl-4 space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Ressources & Outils
          </h2>
          <p className="text-sm text-muted-foreground">
            Tout le nécessaire pour installer, configurer et maîtriser le jeu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3.5">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-4 p-4 bg-card border border-border hover:border-primary/50 rounded-lg transition-colors duration-200 group"
              >
                <div
                  className={`w-11 h-11 rounded-lg ${link.bg} flex items-center justify-center shrink-0`}
                >
                  <link.icon size={22} className={link.color} />
                </div>
                <div className="min-w-0">
                  <div className="font-black text-sm text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {link.desc}
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            ))}
          </div>

          <div>
            {faqItems.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-wider mb-3">
                  Questions fréquentes
                </h3>
                {faqItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(open === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between p-3.5 text-left text-foreground hover:bg-secondary transition-colors gap-2 cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-black">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                          open === item.id ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {open === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-border bg-background"
                        >
                          <div className="p-3.5 text-xs text-muted-foreground leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="text-center pt-2">
                  <Link
                    to="/faq"
                    className="text-xs font-black text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Voir toute la FAQ <ArrowRight size={12} />
                  </Link>
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

  return (
    <div className="relative min-h-screen bg-background">
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
    </div>
  );
}
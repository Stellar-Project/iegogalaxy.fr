import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, HelpCircle } from "lucide-react";
import { api } from "@/api/client";
import type { FaqItem } from "@/api/types";
import { useMeta } from "@/lib/useMeta";
import Loading from "@/components/Loading";
import CategoryFilter from "@/components/CategoryFilter";

export default function Faq() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    api
      .getFaq()
      .then((data) => {
        if (isMounted) setItems(data);
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useMeta({
    title: "Foire Aux Questions (FAQ)",
    description:
      "Questions et réponses fréquentes sur le patch français d'Inazuma Eleven GO Galaxy et le projet Stellar Project.",
  });

  const categories = useMemo(() => {
    const list = items.map((i) => i.category).filter(Boolean) as string[];
    return Array.from(new Set(list)).sort();
  }, [items]);

  const filtered = useMemo(() => {
    if (!activeCat) return items;
    return items.filter((i) => i.category === activeCat);
  }, [items, activeCat]);

  return (
    <div className="relative min-h-screen text-foreground bg-background px-4 py-16 sm:py-24">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)/0.03,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-8 sm:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors cursor-pointer">
              Accueil
            </Link>
            <ChevronRight size={14} />
            <span className="text-primary font-black">FAQ</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            Foire Aux <span className="text-accent">Questions</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Trouvez rapidement des réponses aux interrogations les plus fréquentes concernant l'installation, les compatibilités et l'avancement du patch.
          </p>
        </motion.div>

        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            active={activeCat}
            onChange={setActiveCat}
            color="accent"
          />
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="border border-border bg-card/70 backdrop-blur-md rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="w-full flex items-center gap-3.5 px-5 py-4 text-left hover:bg-secondary/40 transition-colors cursor-pointer"
                  >
                    <HelpCircle size={18} className="text-accent shrink-0" />
                    <span className="flex-1 text-sm sm:text-base font-black text-foreground">
                      {item.question}
                    </span>
                    <ChevronRight
                      size={16}
                      className={`text-muted-foreground transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-90 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-border/50 bg-secondary/20"
                      >
                        <div className="px-5 py-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center text-muted-foreground py-12 space-y-2">
                <HelpCircle size={40} className="mx-auto opacity-30 mb-2" />
                <p className="text-sm">Aucune question dans cette catégorie pour le moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
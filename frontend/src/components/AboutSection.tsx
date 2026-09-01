import { motion } from "framer-motion";
import { Gamepad2, Sparkles, ChevronRight, History, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TRANSLATION_CONTRIBUTORS = [
  {
    name: "Kotei Project",
    role: "Base technique, icônes & objets",
    highlight: false,
  },
  {
    name: "Umanse",
    role: "Traduction du mode histoire",
    highlight: false,
  },
  {
    name: "MrFox4",
    role: "Techniques spéciales & totems",
    highlight: false,
  },
  {
    name: "Stellar Project",
    role: "Finalisation, révision intégrale & polish 100%",
    highlight: true,
  },
];

export function AboutSection() {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-wider">
            <History size={13} />
            Genèse & Histoire
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            À propos du Projet
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            L'histoire d'un opus resté exclusif au Japon, ressuscité et traduit en français par une communauté de passionnés.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full"
          >
            <Card className="h-full bg-card/70 border-border backdrop-blur-md hover:border-accent/40 transition-all flex flex-col justify-between shadow-xs">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2.5 text-accent text-xl font-black tracking-tight">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <Gamepad2 className="h-5 w-5" />
                  </div>
                  Origine & Contexte
                </CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-sm leading-relaxed space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p>
                    <strong className="text-foreground font-black">Level-5</strong> a officiellement sorti{" "}
                    <em className="text-foreground font-black not-italic">Inazuma Eleven GO Galaxy</em> (Supernova & Big Bang) sur Nintendo 3DS au Japon le 5 décembre 2013.
                  </p>
                  <p>
                    Alors que la localisation européenne était très attendue par les fans, la sortie a été bloquée suite à un conflit juridique lié à la marque déposée « Galaxy » avec l'entreprise MSC Technologies, aboutissant à l'abandon officiel en 2018.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="https://inazuma-eleven.fandom.com/fr/wiki/Inazuma_Eleven_GO_Galaxy_(Jeu)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-black text-primary hover:text-primary/80 transition-colors group cursor-pointer"
                  >
                    Consulter la fiche historique complète
                    <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full"
          >
            <Card className="h-full bg-card/70 border-border backdrop-blur-md hover:border-primary/40 transition-all flex flex-col shadow-xs">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2.5 text-primary text-xl font-black tracking-tight">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Layers className="h-5 w-5" />
                  </div>
                  L'aventure de la Traduction
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between">
                <ul className="space-y-3">
                  {TRANSLATION_CONTRIBUTORS.map((c, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-3 p-2.5 rounded-lg border transition-colors ${
                        c.highlight
                          ? "bg-primary/10 border-primary/30 text-foreground"
                          : "bg-secondary/30 border-border/60 text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${
                          c.highlight ? "bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" : "bg-muted-foreground/60"
                        }`}
                      />
                      <div className="text-xs leading-snug">
                        <span className="font-black text-foreground mr-1.5">
                          {c.name} :
                        </span>
                        <span className="font-medium">{c.role}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border text-xs text-muted-foreground font-medium">
                  <Sparkles size={14} className="text-accent shrink-0" />
                  <span>Un projet bénévole réalisé par et pour les fans de la franchise.</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
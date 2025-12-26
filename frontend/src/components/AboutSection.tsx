import { motion } from "framer-motion";
import { Gamepad2, Info, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            À propos du Projet
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            L'histoire d'un jeu oublié en Europe, ressuscité par une communauté
            passionnée.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-slate-900/50 border-slate-700/50 backdrop-blur-md hover:bg-slate-900/70 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400 text-2xl">
                  <Gamepad2 className="h-6 w-6" /> Origine
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 leading-relaxed space-y-4">
                <p>
                  <strong className="text-white">Level-5</strong> a sorti{" "}
                  <em>Inazuma Eleven GO Galaxy</em> au Japon le 5 décembre 2013.
                </p>
                <p>
                  Le projet européen a été suspendu suite à une plainte
                  juridique de MSC Technologies, entraînant l'annulation
                  officielle en 2018.
                </p>
                <a
                  href="https://inazuma-eleven.fandom.com/fr/wiki/Inazuma_Eleven_GO_Galaxy_(Jeu)"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 mt-2 group"
                >
                  Voir l'histoire complète{" "}
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full bg-slate-900/50 border-slate-700/50 backdrop-blur-md hover:bg-slate-900/70 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400 text-2xl">
                  <Info className="h-6 w-6" /> Traduction
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-purple-500 shrink-0" />
                    <span>
                      <strong>Kotei Project :</strong> Base technique, icônes et
                      objets.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-purple-500 shrink-0" />
                    <span>
                      <strong>Umanse :</strong> Traduction du mode histoire.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-purple-500 shrink-0" />
                    <span>
                      <strong>MrFox4 :</strong> Techniques spéciales et totems.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-white">
                      <strong>Stellar Project :</strong> Finalisation,
                      correction et polish à 100%.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

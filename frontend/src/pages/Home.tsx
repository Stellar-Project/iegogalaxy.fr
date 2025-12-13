import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ChevronRight,
  Gamepad2,
  Info,
  ZoomIn,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const screenshots = [
  "/assets/screenshots/IEGOGalaxySupernova-1.png",
  "/assets/screenshots/IEGOGalaxySupernova-2.png",
  "/assets/screenshots/IEGOGalaxySupernova-3.png",
  "/assets/screenshots/IEGOGalaxySupernova-5.png",
  "/assets/screenshots/IEGOGalaxySupernova-6.png",
];

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(
              entry.target as HTMLElement
            );
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            activeSection === 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: 'url("/assets/bg/mainVisual.jpg")' }}
        />
        <div
          className={`absolute inset-0 bg-repeat transition-opacity duration-1000 ${
            activeSection % 2 !== 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: 'url("/assets/bg/block.png")' }}
        />
        <div
          className={`absolute inset-0 bg-repeat transition-opacity duration-1000 ${
            activeSection !== 0 && activeSection % 2 === 0
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{ backgroundImage: 'url("/assets/bg/block2.png")' }}
        />
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
      </div>

      <section
        ref={addToRefs}
        className="relative z-10 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-4 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 max-w-4xl"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-4">
            Version 1.0 Disponible
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-linear-to-r from-yellow-300 via-yellow-100 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.4)]">
            Inazuma Eleven<br /> GO Galaxy SB/BB Patch Français
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
            L'aventure ultime traduite par la team{" "}
            <span className="font-semibold text-blue-400">Stellar Project</span>
            .
            <br />
            <span className="text-base text-slate-400">
              Une expérience créée par des fans, pour des fans.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105"
            >
              <a href="/telechargement">
                <Download className="mr-2 h-5 w-5" /> Télécharger le Patch
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md"
            >
              <a href="/apropos">
                <Info className="mr-2 h-5 w-5" /> En savoir plus
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      <section ref={addToRefs} className="relative z-10 py-24 px-4 sm:px-6">
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
              L'histoire d'un jeu oublié en Europe, ressuscité par une
              communauté passionnée.
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
                    <em>Inazuma Eleven GO Galaxy</em> au Japon le 5 décembre
                    2013.
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
                        <strong>Kotei Project :</strong> Base technique, icônes
                        et objets.
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
                        <strong>MrFox4 :</strong> Techniques spéciales et
                        totems.
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

      <section
        ref={addToRefs}
        className="relative z-10 py-24 px-4 bg-linear-to-b from-transparent to-slate-950/50"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400"
          >
            L'Univers Galaxy
          </motion.h2>
          <p className="mt-4 text-slate-400 text-lg">
            Le football hyperdimensionnel sort tout droit d’un autre monde !
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <img
              src="/assets/menu_supernova.png"
              alt="Supernova"
              className="relative rounded-lg shadow-2xl w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <img
              src="/assets/menu_bigbang.png"
              alt="Big Bang"
              className="relative rounded-lg shadow-2xl w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section ref={addToRefs} className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
            Aperçu In-Game
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 hover:opacity-100 group">
            {screenshots.map((src, idx) => (
              <motion.div
                key={idx}
                onClick={() => setSelectedImage(src)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-300 hover:opacity-100 group-hover:opacity-40 hover:scale-[1.02] hover:border-blue-400/50 cursor-pointer"
              >
                <div className="aspect-2400/2880 w-full relative">
                  <img
                    src={src}
                    alt={`Screenshot ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white flex items-center gap-2 font-medium">
                      <ZoomIn size={20} /> Agrandir
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Aperçu"
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

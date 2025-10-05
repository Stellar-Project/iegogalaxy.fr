"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [bgImage, setBgImage] = useState("/images/block.png");

  const screenshots = [
    "/images/IEGOGalaxySupernova-1.png",
    "/images/IEGOGalaxySupernova-2.png",
    "/images/IEGOGalaxySupernova-3.png",
    "/images/IEGOGalaxySupernova-5.png",
    "/images/IEGOGalaxySupernova-6.png",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(
              entry.target as HTMLDivElement
            );
            switch (index) {
              case 0:
                setBgImage("/images/block.png");
                break;
              case 1:
                setBgImage("/images/block2.png");
                break;
              case 2:
                setBgImage("/images/block2.png");
                break;
              case 3:
                setBgImage("/images/block.png");
                break;
              default:
                setBgImage("/images/block.png");
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) sectionsRef.current[index] = el;
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center z-0 transition-all duration-700"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 bg-black/70 z-0" // ici le /50 assombrit davantage
        aria-hidden="true"
      />

      {/* --- Section Hero --- */}
      <section
        ref={setSectionRef(0)}
        className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]"
        >
          Inazuma Eleven GO Galaxy SN/BB FR
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
        >
          Patch FR par la team Stellar Project.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-2 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
        >
          Une aventure créée par des fan, pour des fan.
        </motion.p>
        <div className="mt-8">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full shadow-md transition-transform hover:scale-105"
            onClick={() => (window.location.href = "/telechargement")}
          >
            Télécharger le patch
          </Button>
        </div>
      </section>

      {/* --- Section À propos --- */}
      <section
        ref={setSectionRef(1)}
        className="relative z-10 py-20 px-6 bg-black/20"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              À propos du patch
            </motion.h2>
            <motion.p
              className="text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Retour sur l&apos;histoire du jeu et la naissance de la
              traduction.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Carte Origine */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-md border border-gray-800 bg-black/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]">
                    Origine
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-200 space-y-3">
                  <p>
                    <span className="font-bold">Level-5</span>, les créateurs du
                    célèbre{" "}
                    <em>Inazuma Eleven GO Galaxy: Supernova / Big Bang</em>, ont
                    sorti le jeu au Japon le{" "}
                    <span className="font-semibold">5 décembre 2013</span>.
                  </p>
                  <p>
                    Cependant, le projet a été suspendu à la suite d&apos;une
                    plainte pour violation de droits d&apos;auteur déposée par{" "}
                    <span className="font-semibold">MSC Technologies</span>.
                  </p>
                  <p>
                    Cette confusion juridique a entraîné un long retard puis
                    l&apos;abandon complet du projet après la fin du procès en{" "}
                    <span className="font-semibold">août 2018</span>.
                  </p>
                  <p>
                    Pour plus de détails, consultez{" "}
                    <a
                      href="https://inazuma-eleven.fandom.com/fr/wiki/Inazuma_Eleven_GO_Galaxy_(Jeu)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:underline font-medium"
                    >
                      l&apos;article du Wiki Inazuma Eleven
                    </a>
                    .
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Carte Traduction */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="shadow-md border-gray-800 bg-black/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]">
                    Traduction
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-200 space-y-3">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Kotei Project : icônes + objets</li>
                    <li>Umanse : mode histoire</li>
                    <li>MrFox4 : techniques & totems</li>
                    <li>Stellar Project : finalisation complète 🎉</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section Concept / Histoire --- */}
      <section
        ref={setSectionRef(2)}
        className="relative z-10 py-20 px-6 bg-black/20"
      >
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Plongez dans l’univers Inazuma Eleven GO Galaxy
            </motion.h2>
            <motion.p
              className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Le football hyperdimensionnel sort tout droit d’un autre monde !
              <br />
              Arion Sherwind et son équipe rencontrent un mystérieux visiteur
              venu de l’espace...
            </motion.p>
            <motion.p
              className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Aidez l’Inazuma National à former les{" "}
              <span className="font-semibold text-indigo-300">
                “Earth Eleven”
              </span>
              ...
            </motion.p>

            <div className="grid md:grid-cols-2 gap-6 justify-center items-center mt-6">
              <img
                src="/images/menu_supernova.png"
                alt="Menu Supernova"
                className="rounded-lg shadow-lg object-contain w-full max-h-64"
              />
              <img
                src="/images/menu_bigbang.png"
                alt="Menu Big Bang"
                className="rounded-lg shadow-lg object-contain w-full max-h-64"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section Screenshots --- */}
      <section
        ref={setSectionRef(3)}
        className="relative z-10 py-20 px-6 bg-black/20"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]">
            Captures d&apos;écran
          </h2>
          <p className="text-gray-200">Un aperçu du patch.</p>
          <Carousel images={screenshots} height="70vh" interval={5000} />
        </div>
      </section>

      {/* --- Section FAQ --- */}
      <section className="relative z-10 py-20 px-6 bg-black/20">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]">
            FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Le jeu sera-t-il traduit à 100 % ?
              </AccordionTrigger>
              <AccordionContent>
                Oui, l&apos;objectif est bien une traduction complète.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Les bugs connus sont-ils résolus ?
              </AccordionTrigger>
              <AccordionContent>
                La V1 est corrigée. Toute nouveauté sera ajustée dans les
                prochaines mises à jour.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Peut-on jouer sur console 3DS ?
              </AccordionTrigger>
              <AccordionContent>
                Oui, c&apos;est possible depuis la V1.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}

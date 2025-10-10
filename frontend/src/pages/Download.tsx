"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Download() {
  const version = import.meta.env.VITE_PATCH_VERSION;
  const releaseDate = import.meta.env.VITE_PATCH_DATE;
  const patchSize = import.meta.env.VITE_PATCH_SIZE;
  // const romSize = import.meta.env.VITE_ROM_SIZE;
  const supernovaPatch =import.meta.env.VITE_SUPERNOVA_PATCH_LINK;
  const bigbangPatch =import.meta.env.VITE_BIGBANG_PATCH_LINK;
  // const supernovaRom =import.meta.env.VITE_SUPERNOVA_ROM_LINK;
  // const bigbangRom =import.meta.env.VITE_BIGBANG_ROM_LINK;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-blue-950 via-black to-indigo-900 overflow-hidden px-6 py-20 text-center">
      {/* --- Background --- */}
      <div
        className="absolute inset-0 bg-[url('/images/bg/block.png')] bg-cover bg-center opacity-20 z-0"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] z-0"
      />

      {/* --- Contenu principal --- */}
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* --- Titre principal --- */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]"
        >
          Télécharge dès maintenant le patch FR !
        </motion.h1>

        {/* --- Description --- */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Choisis ta version du jeu :{" "}
          <span className="text-yellow-400 font-semibold">Supernova</span> ou{" "}
          <span className="text-blue-400 font-semibold">Big Bang</span>. Ces
          versions contiennent la traduction (presque) complète réalisée par la{" "}
          <span className="font-semibold text-white">Stellar Project</span>.
        </motion.p>

        {/* --- Informations de version --- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto w-fit bg-white/10 backdrop-blur-md border border-yellow-400/40 px-6 py-3 rounded-full text-sm md:text-base font-medium shadow-[0_0_15px_rgba(255,255,100,0.3)]"
        >
          <p>
            <span className="text-gray-300">Version :</span>{" "}
            <span className="font-bold text-yellow-300">{version}</span> —{" "}
            <span className="text-gray-300">Publié le :</span>{" "}
            <span className="font-bold text-yellow-300">{releaseDate}</span>
          </p>
        </motion.div>

        {/* --- Cartes de téléchargement --- */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* --- Supernova --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border border-yellow-400/40 shadow-[0_0_30px_rgba(255,255,100,0.2)] hover:shadow-[0_0_40px_rgba(255,255,100,0.3)] transition-all">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-yellow-400">
                  Inazuma Eleven GO Galaxy: Supernova
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center space-y-6">
                <img
                  src="/images/logo/supernova_logo.png"
                  alt="Supernova Logo"
                  className="h-64 object-contain"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-lg transition-transform hover:scale-110"
                  >
                    <a href={supernovaPatch} download>
                      Télécharger Patch ({patchSize})
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-full shadow-lg transition-transform hover:scale-110"
                  >
                    {/* <a href={supernovaRom} download>
                      Télécharger ROM ({romSize})
                    </a> */}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- Big Bang --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border border-blue-400/40 shadow-[0_0_30px_rgba(100,150,255,0.2)] hover:shadow-[0_0_40px_rgba(100,150,255,0.3)] transition-all">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-400">
                  Inazuma Eleven GO Galaxy: Big Bang
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center space-y-6">
                <img
                  src="/images/logo/bigbang_logo.png"
                  alt="Big Bang Logo"
                  className="h-64 object-contain"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-blue-500 hover:bg-blue-600 text-black font-bold rounded-full shadow-lg transition-transform hover:scale-110"
                  >
                    <a href={bigbangPatch} download>
                      Télécharger Patch ({patchSize})
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-full shadow-lg transition-transform hover:scale-110"
                  >
                    {/* <a href={bigbangRom} download>
                      Télécharger ROM ({romSize})
                    </a> */}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* --- Effet lumineux au sol --- */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-500/10 to-transparent blur-3xl z-0" />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Download as DownloadIcon,
  Calendar,
  HardDrive,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Download() {
  const version = import.meta.env.VITE_PATCH_VERSION || "?";
  const releaseDate = import.meta.env.VITE_PATCH_DATE || "?";

  const patchSize = import.meta.env.VITE_PATCH_SIZE || "?";
  // const romSize = import.meta.env.VITE_ROM_SIZE || "?";

  const supernovaPatch = import.meta.env.VITE_SUPERNOVA_PATCH_LINK || "#";
  const bigbangPatch = import.meta.env.VITE_BIGBANG_PATCH_LINK || "#";

  // const supernovaRom = import.meta.env.VITE_SUPERNOVA_ROM_LINK || "#";
  // const bigbangRom = import.meta.env.VITE_BIGBANG_ROM_LINK || "#";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-slate-200 bg-slate-950 overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-12 w-full">
        <div className="text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            Télécharge le <span className="text-yellow-400">Jeu</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Redécouvrez Inazuma Eleven GO Galaxy. Choisissez votre version :{" "}
            <span className="text-yellow-400 font-semibold">Supernova</span> ou{" "}
            <span className="text-blue-400 font-semibold">Big Bang</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 border-white/10 bg-white/5 text-slate-300 gap-2"
            >
              <span className="font-semibold text-white">Version :</span>{" "}
              {version}
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-1.5 border-white/10 bg-white/5 text-slate-300 gap-2"
            >
              <Calendar size={14} className="text-yellow-400" />
              {releaseDate}
            </Badge>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12 px-4">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <Card className="h-full bg-slate-900/50 backdrop-blur-sm border-white/5 hover:border-yellow-500/30 transition-all duration-300 group overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-yellow-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-yellow-400 group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.3)] transition-all">
                  Supernova
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-between space-y-8 p-6 pt-4 h-full">
                <div className="relative w-full flex justify-center py-4">
                  <div className="absolute inset-0 bg-yellow-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src="/assets/logo/SN_Logo_HD.png"
                    alt="Supernova Logo"
                    className="h-48 md:h-56 object-contain relative z-10 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="w-full space-y-3">
                  <Button
                    asChild
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-12 text-lg shadow-lg hover:shadow-yellow-500/20 transition-all"
                  >
                    <a href={supernovaPatch} download>
                      <DownloadIcon className="mr-2 h-5 w-5" />
                      Télécharger Patch
                    </a>
                  </Button>

                  {/* <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold h-10 border border-white/10"
                  >
                    <a href={supernovaRom} download>
                      <Gamepad2 className="mr-2 h-4 w-4" />
                      Télécharger ROM
                    </a>
                  </Button> */}

                  <Separator className="bg-white/10 my-2" />

                  <div className="flex items-center justify-center gap-4 text-xs text-slate-500 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-1.5">
                      <HardDrive size={12} className="text-yellow-500" />
                      Patch : {patchSize}
                    </div>
                    {/* mettre h-3 pour le séparateur */}
                    <div className="w-px bg-slate-700" />
                    {/* <div className="flex items-center gap-1.5">
                      <HardDrive size={12} className="text-slate-400" />
                      ROM : {romSize}
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-full"
          >
            <Card className="h-full bg-slate-900/50 backdrop-blur-sm border-white/5 hover:border-blue-500/30 transition-all duration-300 group overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-blue-400 group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.3)] transition-all">
                  Big Bang
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-between space-y-8 p-6 pt-4 h-full">
                <div className="relative w-full flex justify-center py-4">
                  <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src="/assets/logo/BB_Logo_HD.png"
                    alt="Big Bang Logo"
                    className="h-48 md:h-56 object-contain relative z-10 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="w-full space-y-3">
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 text-lg shadow-lg hover:shadow-blue-500/20 transition-all"
                  >
                    <a href={bigbangPatch} download>
                      <DownloadIcon className="mr-2 h-5 w-5" />
                      Télécharger Patch
                    </a>
                  </Button>

                  {/* <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold h-10 border border-white/10"
                  >
                    <a href={bigbangRom} download>
                      <Gamepad2 className="mr-2 h-4 w-4" />
                      Télécharger ROM
                    </a>
                  </Button> */}

                  <Separator className="bg-white/10 my-2" />

                  <div className="flex items-center justify-center gap-4 text-xs text-slate-500 uppercase tracking-wider font-medium">
                    <div className="flex items-center gap-1.5">
                      <HardDrive size={12} className="text-blue-500" />
                      Patch : {patchSize}
                    </div>
                    {/* mettre h-3 pour le séparateur */}
                    <div className="w-px bg-slate-700" />
                    {/* <div className="flex items-center gap-1.5">
                      <HardDrive size={12} className="text-slate-400" />
                      ROM : {romSize}
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

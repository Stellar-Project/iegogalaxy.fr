import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download,
  FolderOpen,
  ChevronRight,
  Hammer,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Info,
  FolderTree,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";

export default function Kuriimu1() {
  return (
    <div className="relative min-h-screen flex flex-col items-center text-slate-200 bg-slate-950 overflow-hidden px-4 py-20">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/assets/bg/bg_repeat.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12 w-full">
        {/* Header & Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-4">
            <Button
              variant="link"
              asChild
              className="text-slate-500 hover:text-yellow-400 p-0 h-auto"
            >
              <Link to="/">Accueil</Link>
            </Button>
            <ChevronRight size={14} />
            <Button
              variant="link"
              asChild
              className="text-slate-500 hover:text-yellow-400 p-0 h-auto"
            >
              <Link to="/wiki">Wiki</Link>
            </Button>
            <ChevronRight size={14} />
            <span className="text-yellow-400">Kuriimu 1</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Kuriimu <span className="text-yellow-400">1</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="pt-4"
          >
            <Alert className="bg-yellow-500/10 border-yellow-500/30 text-yellow-200 max-w-2xl mx-auto text-left">
              <Info className="h-4 w-4 text-yellow-400" />
              <AlertTitle className="text-yellow-400 font-semibold mb-1">
                Documentation en construction
              </AlertTitle>
              <AlertDescription className="text-slate-300 opacity-90">
                Cette documentation est encore en cours de rédaction. Elle sera
                finalisée lors de la sortie de la version finale de la ROM.
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Hammer className="text-blue-400 h-5 w-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Installation & Configuration
            </h2>
          </div>
          <Separator className="bg-white/10" />

          {/* Step 1: Preparation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg text-white">
                  <span className="flex items-center justify-center h-8 w-8 rounded bg-yellow-500/20 text-yellow-400 text-sm font-bold">
                    1
                  </span>
                  Préparation de l'espace de travail
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 leading-relaxed">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <p>
                      Une bonne organisation est la clé du modding. Créez un
                      dossier dédié à votre projet (ex:{" "}
                      <code>Inazuma_Modding</code>).
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5 text-sm font-mono text-slate-300">
                      <div className="flex items-center gap-2">
                        <FolderOpen size={14} className="text-yellow-400" />{" "}
                        Inazuma_Modding/
                      </div>
                      <div className="flex items-center gap-2 pl-4 border-l border-white/10 ml-1.5">
                        <FolderOpen size={14} className="text-blue-400" />{" "}
                        Outils/
                      </div>
                      <div className="flex items-center gap-2 pl-4 border-l border-white/10 ml-1.5">
                        <FolderOpen size={14} className="text-green-400" />{" "}
                        ROM_Originale/
                      </div>
                      <div className="flex items-center gap-2 pl-4 border-l border-white/10 ml-1.5">
                        <FolderOpen size={14} className="text-purple-400" />{" "}
                        Fichiers_Modifies/
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step 2: Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg text-white">
                  <span className="flex items-center justify-center h-8 w-8 rounded bg-yellow-500/20 text-yellow-400 text-sm font-bold">
                    2
                  </span>
                  Téléchargement & Extraction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                  <div className="space-y-1">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <Download size={16} className="text-blue-400" />
                      Release GitHub
                    </h4>
                    <p className="text-sm text-slate-400">
                      Téléchargez la dernière version officielle de Kuriimu.
                    </p>
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                    asChild
                  >
                    <a
                      href="https://github.com/IcySon55/Kuriimu/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Télécharger <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="relative group rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src="assets/tutorial/Kuriimu1-1.png"
                    alt="Extraction de Kuriimu"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <p className="absolute bottom-3 left-4 z-20 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Exemple de dossier extrait
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step 3: Software Suite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg text-white">
                  <span className="flex items-center justify-center h-8 w-8 rounded bg-yellow-500/20 text-yellow-400 text-sm font-bold">
                    3
                  </span>
                  La suite logicielle
                </CardTitle>
                <CardDescription className="ml-11 text-slate-400">
                  Kuriimu n'est pas un seul logiciel, c'est une suite d'outils.
                  Voici les principaux exécutables que vous trouverez :
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-yellow-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <FolderTree className="text-green-400 h-5 w-5" />
                      <h4 className="font-bold text-white">Karameru</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-snug">
                      Gestionnaire d'archives. Permet d'ouvrir et de modifier
                      l'arborescence des fichiers de la ROM.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-yellow-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="text-yellow-400 h-5 w-5" />
                      <h4 className="font-bold text-white">Kuriimu</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-snug">
                      Éditeur de texte et de binaire. C'est l'outil principal
                      pour traduire les dialogues et menus.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-yellow-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon className="text-pink-400 h-5 w-5" />
                      <h4 className="font-bold text-white">Kukkii</h4>
                    </div>
                    <p className="text-sm text-slate-400 leading-snug">
                      Éditeur d'images. Permet d'extraire, visualiser et
                      remplacer les textures et sprites.
                    </p>
                  </div>
                </div>

                <div className="relative group rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src="assets/tutorial/Kuriimu1-2.png"
                    alt="Les exécutables de la suite"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <p className="absolute bottom-3 left-4 z-20 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Vue du dossier contenant les exécutables
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

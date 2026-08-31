import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMeta } from "@/lib/useMeta";
import {
  Info,
  AlertTriangle,
  Gamepad2,
  HardDrive,
  FileArchive,
  ChevronRight,
  MonitorPlay,
  ExternalLink,
  Youtube,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Step({ num, color, children }: { num: number; color: "yellow" | "blue"; children: React.ReactNode }) {
  const colors = {
    yellow: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-400",
  };
  return (
    <div className="flex items-start gap-3">
      <div className={`w-6 h-6 rounded-full ${colors[color]} text-xs font-bold flex items-center justify-center shrink-0 mt-0.5`}>{num}</div>
      <span className="text-slate-400 text-sm leading-relaxed pt-0.5">{children}</span>
    </div>
  );
}

export default function Tutorial() {
  useMeta({ title: "Tutoriel", description: "Guide complet pour patcher Inazuma Eleven GO Galaxy Supernova et Big Bang avec les outils Stellar Project." });
  return (
    <div className="relative min-h-screen flex flex-col items-center text-slate-200 bg-background overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Guide <span className="text-yellow-400">d'Installation</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Button
              variant="link"
              asChild
              className="text-slate-400 hover:text-yellow-400 p-0 h-auto"
            >
              <Link to="/">Accueil</Link>
            </Button>
            <ChevronRight size={14} />
            <span className="text-yellow-400">Tutoriel</span>
          </div>
        </motion.div>

        <div className="flex justify-center gap-4 md:gap-8 text-xs">
          {[
            { num: "1", label: "Prérequis", color: "text-yellow-400 border-yellow-500/30" },
            { num: "2", label: "Nettoyage", color: "text-red-400 border-red-500/30" },
            { num: "3", label: "Installation", color: "text-green-400 border-green-500/30" },
          ].map((step, i) => (
            <div key={step.num} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full border ${step.color} bg-white/5 flex items-center justify-center text-xs font-bold`}>{step.num}</div>
              <span className="text-slate-400 hidden sm:inline">{step.label}</span>
              {i < 2 && <div className="hidden sm:block w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-200">
            <Info className="h-4 w-4 text-blue-400" />
            <AlertTitle className="text-blue-400 font-semibold mb-2">
              À propos du patch
            </AlertTitle>
            <AlertDescription className="text-slate-300 leading-relaxed">
              Ce patch traduit les éléments essentiels du jeu (techniques,
              talents, menus, histoire) pour vous permettre de profiter
              pleinement de l'aventure en français.
            </AlertDescription>
          </Alert>
        </motion.div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 text-yellow-400 font-bold">
              1
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Vérifier votre équipement
            </h2>
          </div>

          <Alert className="bg-slate-900/50 border-yellow-500/20 text-slate-300">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertTitle className="text-yellow-400 font-semibold mb-1">
              Pas encore prêt ?
            </AlertTitle>
            <AlertDescription>
              <span>
                Si vous n'avez pas encore{" "}
                <strong className="text-white">hacké votre console</strong> ou
                installé d'<strong className="text-white">émulateur</strong>,
                suivez d'abord ces guides avant de télécharger le patch.
              </span>
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg text-yellow-400">
                  <Gamepad2 className="h-6 w-6" />
                  Guide 3DS (CFW)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  Nécessaire pour les consoles 3DS/2DS. Vous devez installer
                  Luma3DS.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300 transition-all text-xs h-auto py-2"
                    asChild
                  >
                    <a
                      href="https://3ds.hacks.guide"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <ExternalLink size={14} /> Guide Hack
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all text-xs h-auto py-2"
                    asChild
                  >
                    <a
                      href="https://www.youtube.com/watch?v=A9f1izV-QVk"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <Youtube size={14} /> Tuto Vidéo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg text-blue-400">
                  <MonitorPlay className="h-6 w-6" />
                  Émulateurs PC/Android
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  Logiciels recommandés pour jouer sans console.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-blue-500/50 transition-all text-xs h-auto py-2"
                    asChild
                  >
                    <a
                      href="https://azahar-emu.org/pages/download/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <img
                        src="/assets/pages/tutorial/azahar-logo.svg"
                        alt="Azahar"
                        className="w-5 h-5 object-contain"
                      />
                      Azahar
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    className="bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-orange-500/50 transition-all text-xs h-auto py-2"
                    asChild
                  >
                    <a
                      href="https://citra-emulator.com/download"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <img
                        src="/assets/pages/tutorial/citra-logo.png"
                        alt="Citra"
                        className="w-5 h-5 object-contain"
                      />
                      Citra
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400 font-bold">
              2
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Nettoyage des fichiers
            </h2>
          </div>

          <Alert
            variant="destructive"
            className="bg-red-900/10 border-red-900/30 text-red-200"
          >
            <Trash2 className="h-4 w-4" />
            <AlertTitle className="font-semibold mb-2">
              Étape Critique : Éviter les conflits
            </AlertTitle>
            <AlertDescription className="text-slate-300">
              <p className="mb-2">
                Si vous avez une ancienne version du patch ou une ROM déjà
                modifiée, <strong>il est impératif de tout supprimer</strong>{" "}
                avant d'installer la nouvelle version.
              </p>
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <HardDrive className="text-yellow-400 h-5 w-5" />
                  Sur 3DS
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 text-sm space-y-4">
                <Step num={1} color="yellow">Allez dans <b>Luma → titles</b> sur votre carte SD.</Step>
                <Step num={2} color="yellow">
                  Supprimez les dossiers suivants s'ils existent :
                  <div className="mt-2 space-y-1 pl-4 border-l-2 border-white/10">
                    <code className="bg-black/40 px-1.5 py-0.5 rounded text-slate-200 block w-fit font-mono text-xs">000400000010BB00 (Supernova)</code>
                    <code className="bg-black/40 px-1.5 py-0.5 rounded text-slate-200 block w-fit font-mono text-xs">000400000010BA00 (Big Bang)</code>
                  </div>
                </Step>
                <Step num={3} color="yellow">Si vous aviez installé un <b>.CIA</b> pré-patché, supprimez le jeu via <b>FBI</b> (Titles &gt; Delete Title And Ticket).</Step>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <MonitorPlay className="text-blue-400 h-5 w-5" />
                  Sur Émulateur
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 text-sm space-y-4">
                <Step num={1} color="blue">Dans l'émulateur, faites <b>Clic-droit</b> sur le jeu.</Step>
                <Step num={2} color="blue">Choisissez <b>Ouvrir l'emplacement des mods</b>.</Step>
                <Step num={3} color="blue">Supprimez intégralement le dossier <b>RomFS</b> présent.</Step>
                <Step num={4} color="blue">Si vous utilisiez une ROM pré-patchée (.3ds/.cia), supprimez le fichier de votre ordinateur.</Step>
              </CardContent>
            </Card>
          </div>
        </div>

        <div id="instructions" className="space-y-8 pb-12">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 text-green-400 font-bold">
              3
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Installation du Patch
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="console-3ds"
              className="border border-white/10 bg-slate-900/30 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:text-yellow-400 text-slate-200">
                <div className="flex items-center gap-3">
                  <HardDrive className="h-5 w-5 text-yellow-400" />
                  <span className="text-lg font-semibold">
                    Méthode Console 3DS
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 space-y-6 pt-4 pb-4 px-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                    >
                      LayeredFS (Recommandé)
                    </Badge>
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <FileArchive size={16} /> Via Patch LayeredFS (.zip)
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <Step num={1} color="yellow">Ouvrez l'archive <b>.zip</b> téléchargée.</Step>
                    <Step num={2} color="yellow">Glissez le dossier <b>luma</b> à la racine de votre carte SD.</Step>
                    <Step num={3} color="yellow">Remettez la SD dans la console et allumez-la en maintenant <b>SELECT</b>.</Step>
                    <Step num={4} color="yellow">Dans le menu Luma, cochez l'option <b>(x) Enable game patching</b>.</Step>
                    <Step num={5} color="yellow">Appuyez sur <b>START</b> pour redémarrer. C'est prêt !</Step>
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-blue-400 border-blue-400/30 bg-blue-400/10"
                    >
                      ROM pré-patchée (Alternatif)
                    </Badge>
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <HardDrive size={16} /> Via ROM pré-patchée (.cia)
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <Step num={1} color="blue">Copiez le fichier <b>.cia</b> dans le dossier <b>cias</b> de la carte SD.</Step>
                    <Step num={2} color="blue">Lancez l'application <b>FBI</b> sur la 3DS.</Step>
                    <Step num={3} color="blue">Allez dans <b>SD &gt; cias</b>.</Step>
                    <Step num={4} color="blue">Sélectionnez le jeu et choisissez <b>Install and delete CIAs</b>.</Step>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="emulator"
              className="border border-white/10 bg-slate-900/30 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:text-green-400 text-slate-200">
                <div className="flex items-center gap-3">
                  <MonitorPlay className="h-5 w-5 text-green-400" />
                  <span className="text-lg font-semibold">
                    Méthode Émulateur
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 space-y-6 pt-4 pb-4 px-2">
                <Alert className="bg-green-500/10 border-green-500/30 text-green-200 mb-4">
                  <Info className="h-4 w-4 text-green-400" />
                  <AlertDescription>
                    Compatible avec Citra et Azahar. La procédure est identique.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                    >
                      LayeredFS (Recommandé)
                    </Badge>
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <FileArchive size={16} /> Via Patch LayeredFS (.zip)
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <Step num={1} color="yellow">Dans l'émulateur, faites <b>Clic-droit</b> sur votre jeu original.</Step>
                    <Step num={2} color="yellow">Sélectionnez <b>Ouvrir l'emplacement des mods</b>.</Step>
                    <Step num={3} color="yellow">Ouvrez le dossier <b>luma/titles/&lt;ID_JEU&gt;/</b> qui se trouve dans le zip.</Step>
                    <Step num={4} color="yellow">Copiez le dossier <b>RomFS</b> (du zip) vers la fenêtre de l'émulateur.</Step>
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-blue-400 border-blue-400/30 bg-blue-400/10"
                    >
                      ROM pré-patchée (Alternatif)
                    </Badge>
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <HardDrive size={16} /> Via ROM pré-patchée (.cia / .3ds)
                    </h4>
                  </div>
                  <div className="pl-2 space-y-4">
                    <div>
                      <p className="text-slate-300 font-medium mb-1 flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-blue-400" />{" "}
                        Fichier .3DS :
                      </p>
                      <p className="text-sm pl-6">
                        Faites simplement <b>Fichier &gt; Charger un fichier</b>{" "}
                        et sélectionnez la ROM.
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium mb-1 flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-blue-400" />{" "}
                        Fichier .CIA :
                      </p>
                      <p className="text-sm pl-6">
                        Faites <b>Fichier &gt; Installer un CIA</b>. Le jeu
                        apparaîtra ensuite dans votre liste principale.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
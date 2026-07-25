import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Tutorial() {
  return (
    <div className="relative min-h-screen flex flex-col items-center text-slate-200 bg-slate-950 overflow-hidden px-4 py-20">
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
          <Separator className="bg-white/10" />

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
                        src="/assets/logo/azahar-logo.svg"
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
                        src="/assets/logo/citra-logo.png"
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
          <Separator className="bg-white/10" />

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
              <CardContent className="text-slate-400 text-sm space-y-3">
                <ol className="list-decimal list-inside space-y-2 marker:text-yellow-500/50">
                  <li>
                    Allez dans <b>Luma → titles</b> sur votre carte SD.
                  </li>
                  <li>
                    Supprimez les dossiers suivants s'ils existent :
                    <div className="mt-2 mb-2 space-y-1 pl-4 border-l-2 border-white/10">
                      <code className="bg-black/40 px-1.5 py-0.5 rounded text-slate-200 block w-fit font-mono text-xs">
                        000400000010BB00 (Supernova)
                      </code>
                      <code className="bg-black/40 px-1.5 py-0.5 rounded text-slate-200 block w-fit font-mono text-xs">
                        000400000010BA00 (Big Bang)
                      </code>
                    </div>
                  </li>
                  <li>
                    Si vous aviez installé un <b>.CIA</b> pré-patché, supprimez
                    le jeu via <b>FBI</b> (Titles &gt; Delete Title And Ticket).
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-white">
                  <MonitorPlay className="text-blue-400 h-5 w-5" />
                  Sur Émulateur
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-400 text-sm space-y-3">
                <ol className="list-decimal list-inside space-y-2 marker:text-blue-500/50">
                  <li>
                    Dans l'émulateur, faites <b>Clic-droit</b> sur le jeu.
                  </li>
                  <li>
                    Choisissez <b>Ouvrir l'emplacement des mods</b>.
                  </li>
                  <li>
                    Supprimez intégralement le dossier <b>RomFS</b> présent.
                  </li>
                  <li>
                    Si vous utilisiez une ROM pré-patchée (.3ds/.cia), supprimez
                    le fichier de votre ordinateur.
                  </li>
                </ol>
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
          <Separator className="bg-white/10" />

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
                      Option A
                    </Badge>
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <FileArchive size={16} /> Via Patch LayeredFS (.zip)
                    </h4>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 marker:text-yellow-500/50 pl-2">
                    <li>
                      Ouvrez l'archive <b>.zip</b> téléchargée.
                    </li>
                    <li>
                      Glissez le dossier <b>luma</b> à la racine de votre carte
                      SD.
                    </li>
                    <li>
                      Remettez la SD dans la console et allumez-la en maintenant{" "}
                      <b>SELECT</b>.
                    </li>
                    <li>
                      Dans le menu Luma, cochez l'option{" "}
                      <b>(x) Enable game patching</b>.
                    </li>
                    <li>
                      Appuyez sur <b>START</b> pour redémarrer. C'est prêt !
                    </li>
                  </ol>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-blue-400 border-blue-400/30 bg-blue-400/10"
                    >
                      Option B
                    </Badge>
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <HardDrive size={16} /> Via ROM pré-patchée (.cia)
                    </h4>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 marker:text-blue-500/50 pl-2">
                    <li>
                      Copiez le fichier <b>.cia</b> dans le dossier <b>cias</b>{" "}
                      de la carte SD.
                    </li>
                    <li>
                      Lancez l'application <b>FBI</b> sur la 3DS.
                    </li>
                    <li>
                      Allez dans <b>SD &gt; cias</b>.
                    </li>
                    <li>
                      Sélectionnez le jeu et choisissez{" "}
                      <b>Install and delete CIAs</b>.
                    </li>
                  </ol>
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
                      Option A
                    </Badge>
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <FileArchive size={16} /> Via Patch LayeredFS (.zip)
                    </h4>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 marker:text-yellow-500/50 pl-2">
                    <li>
                      Dans l'émulateur, faites <b>Clic-droit</b> sur votre jeu
                      original.
                    </li>
                    <li>
                      Sélectionnez <b>Ouvrir l'emplacement des mods</b>.
                    </li>
                    <li>
                      Ouvrez le dossier <b>luma/titles/&lt;ID_JEU&gt;/</b> qui
                      se trouve dans le zip.
                    </li>
                    <li>
                      Copiez le dossier <b>RomFS</b> (du zip) vers la fenêtre de
                      l'émulateur.
                    </li>
                  </ol>
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-blue-400 border-blue-400/30 bg-blue-400/10"
                    >
                      Option B
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
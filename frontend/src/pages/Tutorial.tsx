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
  const version = import.meta.env.VITE_PATCH_VERSION || "?";

  return (
    <div className="relative min-h-screen flex flex-col items-center text-slate-200 bg-slate-950 overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Tutoriel <span className="text-yellow-400">d'installation</span>
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
              Information sur le patch
            </AlertTitle>
            <AlertDescription className="text-slate-300 leading-relaxed">
              Grâce à ce patch, vous pourrez jouer au jeu avec la plupart des
              éléments de gameplay traduits, comme les techniques, les talents,
              les conditions de recrutement, les noms des personnages, les
              lieux, et bien plus encore !
            </AlertDescription>
          </Alert>
        </motion.div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <AlertTriangle className="text-yellow-400 h-5 w-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Préparatifs
            </h2>
          </div>
          <Separator className="bg-white/10" />

          <div className="grid gap-6">
            <Alert
              variant="destructive"
              className="bg-red-900/10 border-red-900/30 text-red-200"
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="font-semibold mb-2">
                Important : Nettoyage préalable
              </AlertTitle>
              <AlertDescription className="text-slate-300">
                <p className="mb-2">
                  Si vous n'avez jamais installé de patch, passez directement à
                  la section{" "}
                  <a
                    href="#instructions"
                    className="text-white underline underline-offset-4 hover:text-yellow-400"
                  >
                    Instructions
                  </a>
                  .
                </p>
                <p>
                  Sinon, afin d'éviter tout conflit,{" "}
                  <strong>
                    désinstallez le patch et supprimez la ROM actuellement
                    installée
                  </strong>{" "}
                  avant de continuer.
                </p>
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <HardDrive className="text-yellow-400 h-5 w-5" />
                    Utilisateurs 3DS
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 text-sm space-y-3">
                  <ol className="list-decimal list-inside space-y-2 marker:text-yellow-500/50">
                    <li>
                      Allez dans <b>Luma → titles</b> et supprimez les dossiers
                      <code className="bg-black/40 px-1 py-0.5 rounded mx-1 text-slate-200">
                        000400000010BB00
                      </code>
                      et/ou
                      <code className="bg-black/40 px-1 py-0.5 rounded mx-1 text-slate-200">
                        000400000010BA00
                      </code>
                      .
                    </li>
                    <li>Replacez la carte SD dans la console.</li>
                    <li>
                      Ouvrez <b>FBI</b>, allez dans <b>titles</b>.
                    </li>
                    <li>
                      Sélectionnez le jeu et faites{" "}
                      <b>Delete Title And Ticket</b>.
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-white">
                    <MonitorPlay className="text-blue-400 h-5 w-5" />
                    Utilisateurs Citra / Azahar
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-400 text-sm space-y-3">
                  <ol className="list-decimal list-inside space-y-2 marker:text-blue-500/50">
                    <li>
                      Clic-droit sur le jeu &gt;{" "}
                      <b>Ouvrir l'emplacement des mods</b>.
                    </li>
                    <li>
                      Supprimez le dossier <b>RomFS</b> (le patch).
                    </li>
                    <li>
                      Si vous avez une ancienne ROM <strong>pré-patchée</strong>
                      , veuillez la supprimer.
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div id="instructions" className="space-y-8 pb-12">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Gamepad2 className="text-blue-400 h-5 w-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Installation
            </h2>
          </div>
          <Separator className="bg-white/10" />

          <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-slate-300 mb-4">
                Pour les utilisateurs de 3DS (CFW Luma3DS + boot9strap),
                assurez-vous de suivre le guide officiel avant d'installer le
                patch.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="bg-yellow-500/20 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300"
                  asChild
                >
                  <a
                    href="https://3ds.hacks.guide/fr_FR/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Guide Officiel Hack 3DS
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="bg-yellow-500/20 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300"
                  asChild
                >
                  <a
                    href="https://youtu.be/DHQ0TBd5-tg?si=LW0vTUP7BzuBmuBv"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tuto Vidéo
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="console-3ds"
              className="border border-white/10 bg-slate-900/30 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:text-yellow-400 text-slate-200">
                <div className="flex items-center gap-3">
                  <HardDrive className="h-5 w-5 text-yellow-400" />
                  <span className="text-lg font-semibold">Sur Console 3DS</span>
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
                      <FileArchive size={16} /> J'ai téléchargé le Patch (.zip)
                    </h4>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 marker:text-yellow-500/50 pl-2">
                    <li>
                      Dézippez l'archive{" "}
                      <b>[PATCH FR] Inazuma Eleven GO Galaxy ({version})</b>.
                    </li>
                    <li>
                      Copiez le dossier <b>luma</b> à la racine de votre carte
                      SD (fusionnez/remplacez si demandé).
                    </li>
                    <li>Réinsérez la SD dans la console.</li>
                    <li>
                      Démarrez la console en maintenant <b>SELECT</b> pour
                      accéder au menu Luma.
                    </li>
                    <li>
                      Assurez-vous que l'option <b>Enable game patching</b> est
                      cochée (X).
                    </li>
                    <li>
                      Appuyez sur <b>START</b> pour redémarrer et lancez le jeu.
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
                      <HardDrive size={16} /> J'ai téléchargé la ROM pré-patchée
                      (.cia)
                    </h4>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 marker:text-blue-500/50 pl-2">
                    <li>
                      Placez le fichier <b>.cia</b> dans le dossier <b>cias</b>{" "}
                      de votre carte SD.
                    </li>
                    <li>Réinsérez la SD dans la console.</li>
                    <li>
                      Ouvrez l'application <b>FBI</b> sur votre 3DS.
                    </li>
                    <li>
                      Naviguez vers <b>SD &gt; cias</b>.
                    </li>
                    <li>
                      Sélectionnez le fichier et choisissez{" "}
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
                    Sur Émulateur (Azahar / Citra)
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 space-y-6 pt-4 pb-4 px-2">
                <Alert className="bg-green-500/10 border-green-500/30 text-green-200 mb-4">
                  <Info className="h-4 w-4 text-green-400" />
                  <AlertDescription>
                    Azahar étant un fork de Citra, la procédure est identique
                    pour les deux émulateurs.
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
                      <FileArchive size={16} /> Installation du Patch (.zip)
                    </h4>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 marker:text-yellow-500/50 pl-2">
                    <li>
                      Lancez <b>Azahar</b> ou <b>Citra</b> et assurez-vous que
                      votre jeu original est dans la liste.
                    </li>
                    <li>
                      Faites un <b>Clic-droit</b> sur le jeu.
                    </li>
                    <li>
                      Sélectionnez <b>Ouvrir l'emplacement des mods</b>.
                    </li>
                    <li>
                      Ouvrez le dossier <b>luma/titles/&lt;ID_JEU&gt;/</b> qui
                      se trouve dans votre zip téléchargé.
                    </li>
                    <li>
                      Copiez le dossier <b>RomFS</b> dans la fenêtre de
                      l'émulateur ouverte précédemment.
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
                      <HardDrive size={16} /> Utilisation d'une ROM pré-patchée
                      (.cia / .3ds)
                    </h4>
                  </div>
                  <div className="pl-2 space-y-4">
                    <div>
                      <p className="text-slate-300 font-medium mb-1">
                        Pour un fichier .3DS (Décrypté) :
                      </p>
                      <ol className="list-decimal list-inside space-y-1 marker:text-blue-500/50">
                        <li>
                          Faites <b>Fichier &gt; Charger un fichier</b>.
                        </li>
                        <li>
                          Sélectionnez votre ROM <b>.3ds</b>.
                        </li>
                      </ol>
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium mb-1">
                        Pour un fichier .CIA (Installable) :
                      </p>
                      <ol className="list-decimal list-inside space-y-1 marker:text-blue-500/50">
                        <li>
                          Faites <b>Fichier &gt; Installer un CIA...</b>
                        </li>
                        <li>
                          Sélectionnez votre fichier <b>.cia</b>.
                        </li>
                        <li>
                          Le jeu apparaîtra dans la liste principale une fois
                          installé.
                        </li>
                      </ol>
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
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
  Video,
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

interface StepProps {
  num: number;
  color?: "accent" | "primary";
  children: React.ReactNode;
}

function Step({ num, color = "accent", children }: StepProps) {
  const badgeClasses =
    color === "accent"
      ? "bg-accent/15 border-accent/40 text-accent"
      : "bg-primary/15 border-primary/40 text-primary";

  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-6 h-6 rounded-full border ${badgeClasses} text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}
      >
        {num}
      </div>
      <div className="text-muted-foreground text-sm leading-relaxed pt-0.5 flex-1 font-medium">
        {children}
      </div>
    </div>
  );
}

export default function Tutorial() {
  useMeta({
    title: "Tutoriel d'installation",
    description:
      "Guide complet pour installer et patcher Inazuma Eleven GO Galaxy Supernova et Big Bang sur Nintendo 3DS et émulateurs.",
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center text-foreground bg-background px-4 py-16 sm:py-24">
      <div className="relative z-10 max-w-4xl mx-auto space-y-16 w-full">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm">
            <Button
              variant="link"
              asChild
              className="text-muted-foreground hover:text-primary p-0 h-auto text-xs sm:text-sm cursor-pointer"
            >
              <Link to="/">Accueil</Link>
            </Button>
            <ChevronRight size={14} />
            <span className="text-primary font-black">Tutoriel</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight">
            Guide <span className="text-accent">d'Installation</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            Suivez attentivement les étapes ci-dessous pour installer le patch
            français sur console Nintendo 3DS (Luma3DS) ou sur émulateurs
            (Citra, Azahar).
          </p>
        </div>

        <div className="flex justify-center items-center gap-3 sm:gap-8 text-xs font-black">
          {[
            {
              num: "1",
              label: "Prérequis",
              color: "text-accent border-accent/40 bg-accent/10",
            },
            {
              num: "2",
              label: "Nettoyage",
              color: "text-destructive border-destructive/40 bg-destructive/10",
            },
            {
              num: "3",
              label: "Installation",
              color: "text-primary border-primary/40 bg-primary/10",
            },
          ].map((step, i) => (
            <div key={step.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full border ${step.color} flex items-center justify-center text-xs font-black shadow-xs`}
              >
                {step.num}
              </div>
              <span className="text-foreground hidden sm:inline">
                {step.label}
              </span>
              {i < 2 && <div className="hidden sm:block w-8 h-px bg-border" />}
            </div>
          ))}
        </div>

        <Alert className="bg-primary/10 border-primary/30 text-foreground">
          <Info className="h-4 w-4 text-primary shrink-0" />
          <AlertTitle className="text-primary font-black mb-1">
            À propos du patch français
          </AlertTitle>
          <AlertDescription className="text-muted-foreground leading-relaxed text-xs sm:text-sm font-medium">
            Ce patch traduit les dialogues, l'histoire principale, les noms de
            techniques, les talents et les interfaces pour vous offrir une
            immersion complète en français.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 text-accent font-black text-sm">
              1
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Vérifier votre équipement
            </h2>
          </div>

          <Alert className="bg-card/70 border-accent/30 text-foreground shadow-xs">
            <AlertTriangle className="h-4 w-4 text-accent shrink-0" />
            <AlertTitle className="text-accent font-black mb-1">
              Pas encore équipé ?
            </AlertTitle>
            <AlertDescription className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-medium">
              Si votre 3DS n'est pas encore sous{" "}
              <strong className="text-foreground font-black">
                Custom Firmware (CFW)
              </strong>{" "}
              ou si vous n'avez pas installé d'
              <strong className="text-foreground font-black">
                émulateur
              </strong>
              , consultez d'abord ces guides :
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg text-accent font-black tracking-tight">
                  <Gamepad2 className="h-5 w-5" />
                  Guide 3DS (CFW & Luma3DS)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-medium">
                  Indispensable sur 2DS / 3DS. Votre console doit être équipée
                  de Luma3DS pour activer le patch sans altérer vos cartouches
                  d'origine.
                </p>
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <Button
                    variant="outline"
                    className="bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 hover:text-accent text-xs h-auto py-2 font-black cursor-pointer"
                    asChild
                  >
                    <a
                      href="https://3ds.hacks.guide/fr_FR/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <ExternalLink size={14} /> Guide Hack 3DS
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20 hover:text-destructive text-xs h-auto py-2 font-black cursor-pointer"
                    asChild
                  >
                    <a
                      href="https://www.youtube.com/watch?v=A9f1izV-QVk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <Video size={14} /> Tuto Vidéo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg text-primary font-black tracking-tight">
                  <MonitorPlay className="h-5 w-5" />
                  Émulateurs PC / Android
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-medium">
                  Logiciels recommandés pour faire tourner le jeu sur votre
                  ordinateur ou smartphone avec de meilleurs graphismes.
                </p>
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <Button
                    variant="outline"
                    className="bg-secondary/60 border-border text-foreground hover:bg-secondary hover:border-primary/40 text-xs h-auto py-2 font-black cursor-pointer"
                    asChild
                  >
                    <a
                      href="https://azahar-emu.org/pages/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <img
                        src="/assets/pages/tutorial/azahar-logo.svg"
                        alt="Azahar"
                        className="w-4 h-4 object-contain"
                      />
                      Azahar Emulator
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    className="bg-secondary/60 border-border text-foreground hover:bg-secondary hover:border-primary/40 text-xs h-auto py-2 font-black cursor-pointer"
                    asChild
                  >
                    <a
                      href="https://citra-emulator.com/download"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1"
                    >
                      <img
                        src="/assets/pages/tutorial/citra-logo.png"
                        alt="Citra"
                        className="w-4 h-4 object-contain"
                      />
                      Citra Emulator
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20 text-destructive font-black text-sm">
              2
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Nettoyage des anciens fichiers
            </h2>
          </div>

          <Alert
            variant="destructive"
            className="bg-destructive/10 border-destructive/30 text-destructive shadow-xs"
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            <AlertTitle className="font-black mb-1">
              Étape Critique : Éviter les conflits de version
            </AlertTitle>
            <AlertDescription className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-medium">
              Si vous possédiez une version antérieure du patch ou une ROM
              modifiée,{" "}
              <strong className="text-foreground font-black">
                supprimez les anciens dossiers
              </strong>{" "}
              avant d'installer la dernière mise à jour.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-foreground font-black tracking-tight">
                  <HardDrive className="text-accent h-5 w-5" />
                  Sur Nintendo 3DS
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-xs sm:text-sm space-y-3.5">
                <Step num={1} color="accent">
                  Insérez votre carte SD sur PC et ouvrez le répertoire{" "}
                  <strong className="text-foreground font-mono font-black">
                    luma/titles/
                  </strong>
                  .
                </Step>
                <Step num={2} color="accent">
                  Supprimez les dossiers correspondants s'ils existent :
                  <div className="mt-2 space-y-1.5 pl-3 border-l-2 border-border">
                    <code className="bg-secondary px-2 py-0.5 rounded text-foreground block w-fit font-mono text-xs border border-border font-black">
                      000400000010BB00 (Supernova)
                    </code>
                    <code className="bg-secondary px-2 py-0.5 rounded text-foreground block w-fit font-mono text-xs border border-border font-black">
                      000400000010BA00 (Big Bang)
                    </code>
                  </div>
                </Step>
                <Step num={3} color="accent">
                  Si vous aviez un{" "}
                  <strong className="text-foreground font-black">
                    .CIA
                  </strong>{" "}
                  pré-patché installé, désinstallez-le proprement via{" "}
                  <strong className="text-foreground font-black">FBI</strong> (
                  <em>Titles &gt; Delete Title And Ticket</em>).
                </Step>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-foreground font-black tracking-tight">
                  <MonitorPlay className="text-primary h-5 w-5" />
                  Sur Émulateur (PC / Android)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-xs sm:text-sm space-y-3.5">
                <Step num={1} color="primary">
                  Dans la liste des jeux de l'émulateur, faites un{" "}
                  <strong className="text-foreground font-black">
                    Clic-droit
                  </strong>{" "}
                  sur le jeu.
                </Step>
                <Step num={2} color="primary">
                  Cliquez sur{" "}
                  <strong className="text-foreground font-black">
                    Ouvrir l'emplacement des mods
                  </strong>{" "}
                  (ou <em>Open Mod Location</em>).
                </Step>
                <Step num={3} color="primary">
                  Supprimez l'ancien dossier{" "}
                  <strong className="text-foreground font-mono font-black">
                    RomFS
                  </strong>{" "}
                  présent dans ce dossier.
                </Step>
                <Step num={4} color="primary">
                  Si vous utilisiez une ROM pré-patchée obsolète, supprimez
                  l'ancien fichier{" "}
                  <strong className="text-foreground font-mono font-black">
                    .3ds / .cia
                  </strong>
                  .
                </Step>
              </CardContent>
            </Card>
          </div>
        </div>

        <div id="instructions" className="space-y-6 pb-12">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-black text-sm">
              3
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Installation du Patch
            </h2>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="console-3ds"
            className="w-full space-y-4"
          >
            <AccordionItem
              value="console-3ds"
              className="border border-border bg-card px-4 sm:px-6 overflow-hidden"
            >
              <AccordionTrigger className="hover:text-accent text-foreground py-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <HardDrive className="h-5 w-5 text-accent" />
                  <span className="text-base sm:text-lg font-black tracking-tight">
                    Méthode Console Nintendo 3DS
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground space-y-6 pt-2 pb-6">
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-accent border-accent/40 bg-accent/10 font-black text-xs"
                    >
                      LayeredFS (Méthode Recommandée)
                    </Badge>
                    <h4 className="text-foreground font-black text-sm flex items-center gap-1.5">
                      <FileArchive size={15} /> Via l'archive Patch (.zip)
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <Step num={1} color="accent">
                      Extrayez l'archive{" "}
                      <strong className="text-foreground font-mono font-black">
                        .zip
                      </strong>{" "}
                      téléchargée depuis la page Téléchargement.
                    </Step>
                    <Step num={2} color="accent">
                      Copiez le dossier{" "}
                      <strong className="text-foreground font-mono font-black">
                        luma
                      </strong>{" "}
                      directement à la{" "}
                      <strong className="text-foreground font-black">
                        racine
                      </strong>{" "}
                      de votre carte SD.
                    </Step>
                    <Step num={3} color="accent">
                      Réinsérez la carte SD dans votre 3DS et allumez la console
                      en maintenant le bouton{" "}
                      <strong className="text-foreground font-black">
                        SELECT
                      </strong>{" "}
                      enfoncé.
                    </Step>
                    <Step num={4} color="accent">
                      Dans le menu de configuration Luma3DS, cochez l'option{" "}
                      <strong className="text-foreground font-black">
                        (x) Enable game patching
                      </strong>{" "}
                      avec le bouton{" "}
                      <strong className="text-foreground font-black">A</strong>.
                    </Step>
                    <Step num={5} color="accent">
                      Appuyez sur{" "}
                      <strong className="text-foreground font-black">
                        START
                      </strong>{" "}
                      pour sauvegarder et redémarrer la console. Lancez votre
                      jeu original : il est désormais en français !
                    </Step>
                  </div>
                </div>

                <div className="h-px bg-border/60" />

                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-primary border-primary/40 bg-primary/10 font-black text-xs"
                    >
                      Installation Directe
                    </Badge>
                    <h4 className="text-foreground font-black text-sm flex items-center gap-1.5">
                      <HardDrive size={15} /> Via ROM pré-patchée (.cia)
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <Step num={1} color="primary">
                      Copiez le fichier{" "}
                      <strong className="text-foreground font-mono font-black">
                        .cia
                      </strong>{" "}
                      dans le dossier{" "}
                      <strong className="text-foreground font-mono font-black">
                        cias/
                      </strong>{" "}
                      de votre carte SD.
                    </Step>
                    <Step num={2} color="primary">
                      Lancez l'application{" "}
                      <strong className="text-foreground font-black">
                        FBI
                      </strong>{" "}
                      sur votre 3DS.
                    </Step>
                    <Step num={3} color="primary">
                      Naviguez dans{" "}
                      <strong className="text-foreground font-mono font-black">
                        SD &gt; cias
                      </strong>
                      .
                    </Step>
                    <Step num={4} color="primary">
                      Sélectionnez le fichier du jeu et choisissez{" "}
                      <strong className="text-foreground font-black">
                        Install and delete CIA
                      </strong>{" "}
                      pour installer le jeu sur le menu HOME.
                    </Step>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="emulator"
              className="border border-border bg-card px-4 sm:px-6 overflow-hidden"
            >
              <AccordionTrigger className="hover:text-primary text-foreground py-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <MonitorPlay className="h-5 w-5 text-primary" />
                  <span className="text-base sm:text-lg font-black tracking-tight">
                    Méthode Émulateur (Citra / Azahar)
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="text-muted-foreground space-y-6 pt-2 pb-6">
                <Alert className="bg-primary/10 border-primary/30 text-foreground">
                  <Info className="h-4 w-4 text-primary shrink-0" />
                  <AlertDescription className="text-xs sm:text-sm font-medium">
                    Compatible avec Citra Nightly/Canary et Azahar Emulator sur
                    Windows, macOS, Linux et Android.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-accent border-accent/40 bg-accent/10 font-black text-xs"
                    >
                      Dossier Mod (Recommandé)
                    </Badge>
                    <h4 className="text-foreground font-black text-sm flex items-center gap-1.5">
                      <FileArchive size={15} /> Via Patch LayeredFS (.zip)
                    </h4>
                  </div>
                  <div className="space-y-3">
                    <Step num={1} color="accent">
                      Dans votre émulateur, faites un{" "}
                      <strong className="text-foreground font-black">
                        Clic-droit
                      </strong>{" "}
                      sur la jaquette du jeu japonais.
                    </Step>
                    <Step num={2} color="accent">
                      Sélectionnez{" "}
                      <strong className="text-foreground font-black">
                        Ouvrir l'emplacement des mods
                      </strong>{" "}
                      (ou <em>Open Mods Directory</em>).
                    </Step>
                    <Step num={3} color="accent">
                      Ouvrez le dossier{" "}
                      <strong className="text-foreground font-mono font-black">
                        luma/titles/&lt;TITLE_ID&gt;/
                      </strong>{" "}
                      situé à l'intérieur du zip téléchargé.
                    </Step>
                    <Step num={4} color="accent">
                      Glissez-déposez le sous-dossier{" "}
                      <strong className="text-foreground font-mono font-black">
                        RomFS
                      </strong>{" "}
                      directement dans le dossier des mods ouvert par
                      l'émulateur.
                    </Step>
                  </div>
                </div>

                <div className="h-px bg-border/60" />

                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-primary border-primary/40 bg-primary/10 font-black text-xs"
                    >
                      Fichiers Prêts à l'emploi
                    </Badge>
                    <h4 className="text-foreground font-black text-sm flex items-center gap-1.5">
                      <HardDrive size={15} /> Via ROM pré-patchée (.3ds / .cia)
                    </h4>
                  </div>
                  <div className="pl-1 space-y-3">
                    <div className="p-3 bg-secondary/40 rounded-xl border border-border/80">
                      <p className="text-foreground font-black mb-1 flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle2 size={15} className="text-primary" />{" "}
                        Fichier .3DS :
                      </p>
                      <p className="text-xs text-muted-foreground pl-6 leading-relaxed font-medium">
                        Faites{" "}
                        <strong className="text-foreground font-black">
                          Fichier &gt; Charger un fichier
                        </strong>{" "}
                        et sélectionnez votre fichier{" "}
                        <code className="font-mono text-foreground font-black">.3ds</code>{" "}
                        pour démarrer directement.
                      </p>
                    </div>

                    <div className="p-3 bg-secondary/40 rounded-xl border border-border/80">
                      <p className="text-foreground font-black mb-1 flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle2 size={15} className="text-primary" />{" "}
                        Fichier .CIA :
                      </p>
                      <p className="text-xs text-muted-foreground pl-6 leading-relaxed font-medium">
                        Faites{" "}
                        <strong className="text-foreground font-black">
                          Fichier &gt; Installer un CIA
                        </strong>
                        . Le jeu apparaîtra de manière permanente dans votre
                        grille de jeux.
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
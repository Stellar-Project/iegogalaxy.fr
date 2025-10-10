import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function Tutorial() {
  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 px-6 md:px-12 py-12 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]">
          Tutoriel d'installation
        </h1>
        <p className="text-gray-400">
          <Link to="/" className="hover:underline text-yellow-400">
            Accueil
          </Link>{" "}
          - Tutoriel d'installation
        </p>
      </motion.div>

      {/* Section info patch */}
      <Card className="bg-blue-900/30 border border-blue-600 shadow-md">
        <CardContent className="text-gray-200">
          Grâce à ce patch, vous pourrez jouer au jeu avec la plupart des
          éléments de gameplay traduits, comme les techniques, les talents, les
          conditions de recrutement, les noms des personnages, les lieux, et
          bien plus encore !
        </CardContent>
      </Card>

      {/* Préparatif */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400">
          Préparatif
        </h2>
        <hr className="border-gray-700" />
        <Card className="bg-black/20 border border-gray-800 shadow-md space-y-3">
          <CardContent className="text-gray-200 space-y-2">
            <p>
              Si vous n'avez jamais installé de patch de traduction pour le jeu,
              veuillez passer directement à la section{" "}
              <Link
                to="#instructions"
                className="text-yellow-400 hover:underline"
              >
                Instructions et installation
              </Link>
              .
            </p>
            <p>
              Afin d'éviter tout conflit entre différentes versions de patchs,
              nous vous recommandons de désinstaller le patch et de supprimer la
              ROM actuellement installée.
            </p>
          </CardContent>
        </Card>

        {/* Instructions pour 3DS */}
        <Card className="bg-black/20 border border-gray-800 shadow-md space-y-3">
          <CardHeader>
            <CardTitle className="text-yellow-400 font-semibold">
              Pour les utilisateurs de 3DS
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-200 space-y-2">
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Supprimez le patch de votre carte SD via <b>Luma → titles</b> et
                supprimez les dossiers <b>000400000010BB00</b> et/ou{" "}
                <b>000400000010BA00</b>.
              </li>
              <li>Replacez la carte SD dans votre console et allumez-la.</li>
              <li>
                Ouvrez <b>FBI</b> et accédez à <b>titles</b>.
              </li>
              <li>
                Sélectionnez le jeu, puis choisissez{" "}
                <b>Delete Title And Ticket</b>.
              </li>
              <li>
                Vous pouvez maintenant passer à la section{" "}
                <Link
                  to="#instructions"
                  className="text-yellow-400 hover:underline"
                >
                  Instructions et installation
                </Link>
                .
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Instructions pour Citra */}
        <Card className="bg-black/20 border border-gray-800 shadow-md space-y-3">
          <CardHeader>
            <CardTitle className="text-yellow-400 font-semibold">
              Pour les utilisateurs de l'émulateur Citra
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-200 space-y-2">
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Clique-droit sur votre jeu et sélectionnez{" "}
                <b>Ouvrir l'emplacement des mods</b>.
              </li>
              <li>
                Supprimez le dossier <b>RomFS</b> (qui contient le patch).
              </li>
              <li>
                Ensuite, supprimez la ROM de votre dossier de jeux ou
                conservez-la selon votre choix.
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* Section Instructions et installation */}
      <section id="instructions" className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400">
          Instructions et installation
        </h2>
        <hr className="border-gray-700" />

        <Card className="bg-black/20 border border-gray-800 shadow-md space-y-3">
          <CardContent className="text-gray-200 space-y-2">
            <p>
              Sur 3DS via CFW Luma3DS sous boot9strap, veuillez suivre le guide
              officiel&nbsp;:{" "}
              <a
                href="https://3ds.hacks.guide/fr_FR/"
                target="_blank"
                className="text-yellow-400 hover:underline"
              >
                {" "}
                Guide officiel
              </a>{" "}
              ou la{" "}
              <a
                href="https://youtu.be/DHQ0TBd5-tg?si=LW0vTUP7BzuBmuBv"
                target="_blank"
                className="text-yellow-400 hover:underline"
              >
                vidéo tutoriel
              </a>
              .
            </p>
            <p>
              Téléchargez ensuite le patch ou la ROM et suivez les instructions
              ci-dessous.
            </p>
          </CardContent>
        </Card>

        {/* Instructions selon le type de fichier */}
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="patch-zip">
            <AccordionTrigger>
              Si vous avez pris le patch (.zip)
            </AccordionTrigger>
            <AccordionContent className="text-gray-200">
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Dézippez le pack <b>[PATCH FR] Inazuma Eleven GO Galaxy</b>.
                </li>
                <li>
                  Copiez le dossier <b>luma</b> à la racine de votre carte SD et
                  remplacez si nécessaire.
                </li>
                <li>
                  Réinsérez la carte SD dans votre console et vérifiez que
                  l'option <b>Enable game patching</b> est activée.
                </li>
                <li>Testez le patch sur le(s) jeu(x) installé(s).</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rom-cia">
            <AccordionTrigger>Si vous avez pris la ROM (.cia)</AccordionTrigger>
            <AccordionContent className="text-gray-200">
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Mettez le fichier <b>.cia</b> dans le dossier <b>cias</b> de
                  votre carte SD.
                </li>
                <li>Réinsérez la carte SD dans votre console.</li>
                <li>
                  Ouvrez <b>FBI</b>, naviguez dans <b>cias</b> et installez le
                  fichier avec <b>Install and delete CIAs</b>.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rom-3ds">
            <AccordionTrigger>
              Si vous utilisez l'émulateur Citra (.3ds)
            </AccordionTrigger>
            <AccordionContent className="text-gray-200">
              <p>Instructions pour l'installation de la ROM à venir.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

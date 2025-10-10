import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Kuriimu1() {
  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 px-6 md:px-12 py-12 space-y-12">
      {/* Header / Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-3 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]">
          Kuriimu 1
        </h1>
        <p className="text-gray-400">
          <Link to="/" className="hover:underline text-yellow-400">
            Accueil
          </Link>{" "}
          -{" "}
          <Link to="/wiki" className="hover:underline text-yellow-400">
            Wiki
          </Link>
        </p>
        <p className="text-gray-200 max-w-3xl mx-auto">
          Actuellement, la documentation est encore en cours de rédaction, mais
          elle sera complète lors de la sortie de la version finale de la ROM.
        </p>
      </motion.div>

      {/* Étapes d'installation */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400">
          Étapes d'installation
        </h2>

        <Card className="bg-black/20 border border-gray-800 shadow-md space-y-4">
          <CardHeader>
            <CardTitle className="text-yellow-400 font-semibold">
              Préparation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-200 space-y-3">
            <p>
              Avant tout, veuillez créer un dossier dédié à votre projet.
              Organisez ce dossier en y plaçant vos logiciels, fichiers, et
              autres ressources nécessaires, en incluant des sous-dossiers pour
              une meilleure organisation.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border border-gray-800 shadow-md space-y-4">
          <CardHeader>
            <CardTitle className="text-yellow-400 font-semibold">
              Téléchargement & Extraction
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-200 space-y-3">
            <p>
              Télécharger le logiciel{" "}
              <a
                href="https://github.com/IcySon55/Kuriimu/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                ici
              </a>{" "}
              et l'extraire sur votre PC avec WinRAR ou tout autre outil
              similaire.
            </p>
            <img
              src="/images/tutorial/Kuriimu1-1.png"
              alt="Tuto image 1"
              className="rounded-lg shadow-md"
            />
          </CardContent>
        </Card>

        <Card className="bg-black/20 border border-gray-800 shadow-md space-y-4">
          <CardHeader>
            <CardTitle className="text-yellow-400 font-semibold">
              Logiciels utilisés
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-200 space-y-3">
            <p>
              Lorsque vous accédez au dossier extrait, vous utiliserez les
              logiciels suivants :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <b>Karameru</b> : Permet de visualiser l'arborescence de votre
                ROM 3DS.
              </li>
              <li>
                <b>Kurrimu</b> : Permet de modifier les fichiers texte des jeux
                Level-5.
              </li>
              <li>
                <b>Kukkii</b> : Permet d'extraire les fichiers images au format{" "}
                <b>.png</b>.
              </li>
            </ul>
            <img
              src="/images/tutorial/Kuriimu1-2.png"
              alt="Tuto image 2"
              className="rounded-lg shadow-md"
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

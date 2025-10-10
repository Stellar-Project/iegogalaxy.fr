import { motion } from "framer-motion";
import { WikiCard } from "@/components/WikiCard";
import { WikiAccordion } from "@/components/WikiAccordion";
import { useState } from "react";
import { Link } from "react-router-dom";

const wikiTools = [
  {
    name: "Kuriimu 1",
    description:
      "Boîte à outils polyvalente pour la traduction de jeux, destinée aux auteurs de traductions de fans.",
    link: "/wiki/kuriimu1",
    image: "/images/logo/kuriimu1.ico",
  },
  {
    name: "Kuriimu 2",
    description:
      "Gestionnaire de projet et boîte à outils polyvalente pour traductions et mods de jeux.",
    link: "/wiki/kuriimu2",
    image: "/images/logo/kuriimu2.png",
  },
  {
    name: "EveryFileExplorer",
    description: "Explorateur de fichiers pour naviguer dans les ROMs.",
    link: "/wiki/everyfileexplorer",
    image: "/images/logo/everyfileexplorer.ico",
  },
  {
    name: "Ohana 3DS New",
    description: "Visionneur de textures et bannières 3D des ROMs 3DS.",
    link: "/wiki/ohananew",
    image: "/images/logo/unvailable.ico",
  },
  {
    name: "Ohana3DS Old",
    description:
      "Visionneur et modificateur des textures et bannières 3D des ROMs 3DS.",
    link: "/wiki/ohanaold",
    image: "/images/logo/unvailable.ico",
  },
  {
    name: "XFSeditor",
    description: "Éditeur pour les polices .xf des jeux Level-5 sur 3DS.",
    link: "/wiki/xfseditor",
    image: "/images/logo/unvailable.ico",
  },
];

export default function Wiki() {
  const [search, setSearch] = useState("");

  const filteredTools = wikiTools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 px-6 md:px-12 py-12 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,100,0.6)]">
          Wiki - Inazuma Eleven GO Galaxy
        </h1>
        <p className="text-gray-400">
          <Link to="/" className="hover:underline text-yellow-400">
            Accueil
          </Link>{" "}
          - Wiki
        </p>
        <p className="text-gray-200 max-w-3xl mx-auto">
          Documentation complète sur la modification des jeux, présentée sous
          forme de Wiki.
        </p>
      </motion.div>

      {/* Sommaire */}
      <section>
        <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
          Sommaire
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-200">
          <li>
            <a href="#tools" className="hover:text-white underline">
              Guide des logiciels
            </a>
          </li>
          <li>
            <a href="#usage" className="hover:text-white underline">
              Arborescence et types de fichiers
            </a>
          </li>
        </ul>
      </section>

      {/* Section: Outils */}
      <section id="tools" className="space-y-8">
        <h2 className="text-3xl font-semibold text-yellow-400">
          Logiciels et outils
        </h2>

        {/* Recherche */}
        <input
          type="text"
          placeholder="Rechercher un outil..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-2 rounded border border-gray-700 bg-black/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => <WikiCard key={tool.name} {...tool} />)
          ) : (
            <p className="text-gray-400 col-span-full text-center mt-4">
              Aucun outil trouvé.
            </p>
          )}
        </div>
      </section>

      {/* Section: Usage */}
      <section id="usage" className="space-y-6">
        <h2 className="text-3xl font-semibold text-yellow-400">
          Arborescence & Types de fichiers
        </h2>
        <WikiAccordion
          items={[
            {
              title: "Arborescence de la ROM",
              content:
                "Comprendre l'organisation des fichiers d'une ROM 3DS décompilée est essentiel pour toute modification.",
            },
            {
              title: "Types d'extensions",
              content:
                "Les fichiers Level-5 utilisent plusieurs extensions spécifiques : .bmd, .bf, .xf, .btx, etc.",
            },
          ]}
        />
      </section>
    </div>
  );
}
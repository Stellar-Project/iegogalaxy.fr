import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Wrench,
  FileText,
  ChevronRight,
  FolderOpen,
  Code,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Définition des types pour les outils
interface WikiTool {
  name: string;
  description: string;
  link: string;
  image: string;
  tags?: string[];
}

const wikiTools: WikiTool[] = [
  {
    name: "Kuriimu 1",
    description:
      "Boîte à outils polyvalente pour la traduction de jeux, destinée aux auteurs de traductions de fans.",
    link: "/wiki/kuriimu1",
    image: "assets/logo/kuriimu1.ico",
    tags: ["Traduction", "General"],
  },
  {
    name: "Kuriimu 2",
    description:
      "Gestionnaire de projet et boîte à outils polyvalente pour traductions et mods de jeux.",
    link: "/wiki/kuriimu2",
    image: "assets/logo/kuriimu2.png",
    tags: ["Project Management", "Modding"],
  },
  {
    name: "EveryFileExplorer",
    description: "Explorateur de fichiers pour naviguer dans les ROMs.",
    link: "/wiki/everyfileexplorer",
    image: "assets/logo/everyfileexplorer.ico",
    tags: ["Explorer", "ROM"],
  },
  {
    name: "Ohana 3DS New",
    description: "Visionneur de textures et bannières 3D des ROMs 3DS.",
    link: "/wiki/ohananew",
    image: "assets/logo/unvailable.ico",
    tags: ["3D", "Textures", "Beta"],
  },
  {
    name: "Ohana3DS Old",
    description:
      "Visionneur et modificateur des textures et bannières 3D des ROMs 3DS.",
    link: "/wiki/ohanaold",
    image: "assets/logo/unvailable.ico",
    tags: ["3D", "Textures", "Legacy"],
  },
  {
    name: "XFSeditor",
    description: "Éditeur pour les polices .xf des jeux Level-5 sur 3DS.",
    link: "/wiki/xfseditor",
    image: "assets/logo/unvailable.ico",
    tags: ["Fonts", "Level-5"],
  },
];

export default function Wiki() {
  const [search, setSearch] = useState("");

  const filteredTools = wikiTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center text-slate-200 bg-slate-950 overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Wiki <span className="text-yellow-400">Modding</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Documentation complète et outils pour modifier Inazuma Eleven GO
            Galaxy.
          </p>

          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Button
              variant="link"
              asChild
              className="text-slate-500 hover:text-yellow-400 p-0 h-auto"
            >
              <Link to="/">Accueil</Link>
            </Button>
            <ChevronRight size={14} />
            <span className="text-yellow-400">Wiki</span>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative max-w-xl mx-auto"
        >
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500" />
          </div>
          <Input
            type="text"
            placeholder="Rechercher un logiciel, un guide..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-yellow-500/50 h-12 rounded-full"
          />
        </motion.div>

        {/* Sommaire Rapide */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 border-white/10 bg-slate-900/30 hover:bg-slate-800/50 justify-start space-x-4"
            asChild
          >
            <a href="#tools">
              <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                <Wrench className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-left">
                <span className="block text-white font-semibold">
                  Guide des logiciels
                </span>
                <span className="text-slate-400 text-xs font-normal">
                  Kuriimu, Ohana3DS, etc.
                </span>
              </div>
            </a>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-4 border-white/10 bg-slate-900/30 hover:bg-slate-800/50 justify-start space-x-4"
            asChild
          >
            <a href="#usage">
              <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-left">
                <span className="block text-white font-semibold">
                  Structure des fichiers
                </span>
                <span className="text-slate-400 text-xs font-normal">
                  Arborescence et extensions
                </span>
              </div>
            </a>
          </Button>
        </div>

        <Separator className="bg-white/10" />

        <section id="tools" className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Wrench className="text-yellow-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">
              Logiciels et Outils
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-900/40 border-white/5 hover:border-yellow-500/30 transition-all group h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="h-12 w-12 rounded-md bg-white/5 p-2 border border-white/10 flex items-center justify-center shrink-0">
                        <img
                          src={tool.image}
                          alt={tool.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white group-hover:text-yellow-400 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tool.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-[10px] px-1.5 h-5 bg-white/5 text-slate-400 hover:bg-white/10"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="grow pt-4">
                      <CardDescription className="text-slate-400 text-sm line-clamp-3">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full text-slate-300 hover:text-white hover:bg-white/5 justify-between group-hover:pl-4 transition-all"
                        asChild
                      >
                        <Link to={tool.link}>
                          Voir la documentation
                          <ExternalLink size={14} className="opacity-50" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 bg-slate-900/30 rounded-lg border border-white/5 border-dashed">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Aucun outil ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </section>

        <section id="usage" className="space-y-8 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <FolderOpen className="text-blue-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">
              Arborescence & Fichiers
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="rom-structure"
              className="border border-white/10 bg-slate-900/30 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:text-blue-400 text-slate-200">
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-5 w-5 text-blue-400" />
                  <span>Arborescence de la ROM</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 px-2 pt-2 pb-4">
                <p className="leading-relaxed">
                  Comprendre l'organisation des fichiers d'une ROM 3DS
                  décompilée est essentiel pour toute modification. La structure
                  typique inclut le <b>RomFS</b> (données du jeu) et l'
                  <b>ExeFS</b> (exécutable et icône).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="file-types"
              className="border border-white/10 bg-slate-900/30 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:text-green-400 text-slate-200">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-green-400" />
                  <span>Types d'extensions (.xf, .bmd...)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 px-2 pt-2 pb-4">
                <p className="leading-relaxed mb-4">
                  Les jeux Level-5 utilisent des formats propriétaires
                  spécifiques. Voici les plus courants :
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5">
                    <Badge
                      variant="outline"
                      className="text-green-400 border-green-400/30"
                    >
                      .xf
                    </Badge>
                    <span>Fichiers de police / texte</span>
                  </li>
                  <li className="flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5">
                    <Badge
                      variant="outline"
                      className="text-yellow-400 border-yellow-400/30"
                    >
                      .bmd
                    </Badge>
                    <span>Modèles 3D / Interface</span>
                  </li>
                  <li className="flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5">
                    <Badge
                      variant="outline"
                      className="text-blue-400 border-blue-400/30"
                    >
                      .btx
                    </Badge>
                    <span>Textures</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
}

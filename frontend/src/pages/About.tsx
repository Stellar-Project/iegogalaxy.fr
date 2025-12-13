import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Clock,
  HelpCircle,
  Heart,
  Rocket,
  Palette,
  Wrench,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DiscordMemberCard,
  type TeamMember,
} from "@/components/DiscordMemberCard";

const members: TeamMember[] = [
  {
    role: "Chef de Projet",
    category: "lead",
    discordId: "590070698140237826",
  },
  {
    role: "Traduction & Correction",
    category: "trans",
    discordId: "1245424439420780633",
  },
  {
    role: "Voix FR & Traduction",
    category: "trans",
    discordId: "1061296038650052688",
  },
];

const timelineEvents = [
  {
    year: "2023",
    title: "Lancement du Projet",
    desc: "Début de l'aventure et analyse des fichiers du jeu.",
  },
  {
    year: "2024",
    title: "Alpha Fermée",
    desc: "Premiers tests de traduction des menus et des techniques.",
  },
  {
    year: "2025",
    title: "Patch Public",
    desc: "Sortie de la première version jouable pour tous.",
  },
];

const creditsData = [
  {
    category: "Graphismes & Visuels",
    icon: Palette,
    color: "text-pink-400",
    items: [
      { name: "Rinzler", task: "Création du site internet" },
      { name: "Level-10 Team", task: "Partage de leur Logo" },
      { name: "gwen9p1", task: "Assets du jeu refait pour le site" },
    ],
  },
  {
    category: "Outils & Technique",
    icon: Wrench,
    color: "text-blue-400",
    items: [
      { name: "IcySon55", task: "Créateur de Kuriimu (Outil de modding)" },
      {
        name: "FanTranslators Inc.",
        task: "Documentation sur le format Level-5",
      },
      { name: "OpenAI", task: "Assistance au développement web" },
    ],
  },
  {
    category: "Remerciements Spéciaux",
    icon: Heart,
    color: "text-red-400",
    items: [
      { name: "Level-5", task: "Pour avoir créé cette licence incroyable" },
      { name: "La Communauté", task: "Pour votre soutien indéfectible" },
      { name: "Les anciens traducteurs", task: "Pour votre motivation d'avoir commencé cette traduction" },
    ],
  },
];

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col items-center text-slate-200 bg-slate-950 overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-20 w-full">
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
            <span className="text-yellow-400">À Propos</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            <span className="text-yellow-400">Stellar Project</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Une équipe de passionnés réunis autour d'un but commun : rendre
            Inazuma Eleven GO Galaxy accessible à tous les francophones.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-slate-900/50 border-white/5 backdrop-blur-sm">
            <CardContent className="p-6 md:p-10">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-white">2+</h3>
                  <p className="text-slate-400 uppercase tracking-wider text-xs font-semibold">
                    Années de travail
                  </p>
                </div>
                <div className="space-y-2 border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0">
                  <h3 className="text-4xl font-bold text-yellow-400">100%</h3>
                  <p className="text-slate-400 uppercase tracking-wider text-xs font-semibold">
                    Bénévole
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-white">15k+</h3>
                  <p className="text-slate-400 uppercase tracking-wider text-xs font-semibold">
                    Fichiers modifiés
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Notre Histoire</h2>
          </div>
          <Separator className="bg-white/10" />

          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12 py-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <span className="text-2xl font-bold text-yellow-400 font-mono">
                    {event.year}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {event.title}
                  </h3>
                </div>
                <p className="text-slate-400 mt-2 max-w-2xl">{event.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Users className="text-blue-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Les Membres</h2>
          </div>
          <Separator className="bg-white/10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DiscordMemberCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">
              Crédits & Remerciements
            </h2>
          </div>
          <Separator className="bg-white/10" />

          <div className="grid md:grid-cols-3 gap-6">
            {creditsData.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-900/40 border-white/5 h-full hover:border-white/10 transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg text-white">
                      <section.icon className={`h-5 w-5 ${section.color}`} />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-sm">
                          <div className="font-bold text-slate-200">
                            {item.name}
                          </div>
                          <div className="text-slate-500">{item.task}</div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 justify-center mb-6">
            <HelpCircle className="text-green-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">FAQ Rapide</h2>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full bg-slate-900/30 border border-white/5 rounded-xl px-4"
          >
            <AccordionItem value="item-1" className="border-white/5">
              <AccordionTrigger className="text-slate-200 hover:text-white hover:no-underline py-4">
                Est-ce que le patch est gratuit ?
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 pb-4">
                Oui, totalement. Ce projet est réalisé par des fans pour des
                fans, sans aucun but lucratif. Nous ne demandons aucune
                contribution financière.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-white/5">
              <AccordionTrigger className="text-slate-200 hover:text-white hover:no-underline py-4">
                Est-ce compatible avec Citra et la 3DS ?
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 pb-4">
                Oui, le patch est conçu pour fonctionner à la fois sur les
                consoles 3DS hackées (via Luma) et sur l'émulateur Citra sur
                PC/Android.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b-0">
              <AccordionTrigger className="text-slate-200 hover:text-white hover:no-underline py-4">
                Comment puis-je rejoindre l'équipe ?
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 pb-4">
                Nous recrutons occasionnellement. Le meilleur moyen est de
                rejoindre notre Discord et de surveiller les annonces de
                recrutement dans le salon dédié.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8 pb-8 space-y-6"
        >
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-2">
            <Rocket className="text-indigo-400 h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Rejoignez l'aventure
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Le projet est toujours à la recherche de talents. Si vous êtes
            traducteur, graphiste ou développeur, rejoignez notre Discord.
          </p>
          <Button
            size="lg"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold shadow-lg rounded-full px-8 h-12 text-base transition-all hover:scale-105"
          >
            Rejoindre le Discord
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
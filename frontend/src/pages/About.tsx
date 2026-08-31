import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight, Users, Clock, Heart, Rocket, Palette, Star, Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DiscordMemberCard, type TeamMember as CardTeamMember } from "@/components/DiscordMemberCard";
import { useMeta } from "@/lib/useMeta";
import { useTeam, useTimeline, useCredits } from "@/api/useData";

const iconMap: Record<string, React.ElementType> = { Palette, Wrench, Heart };
const colorMap: Record<string, string> = {
  "Graphismes & Visuels": "text-pink-400",
  "Anciens Traducteurs": "text-blue-400",
  "Remerciements Spéciaux": "text-red-400",
};

export default function About() {
  useMeta({ title: "À propos", description: "Découvre l'équipe Stellar Project, l'histoire du projet de traduction et les crédits." });
  const { data: members } = useTeam();
  const { data: timelineEvents } = useTimeline();
  const { data: credits } = useCredits();

  const creditsByCategory = credits.reduce((acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {} as Record<string, typeof credits>);

  return (
    <div className="relative min-h-screen flex flex-col items-center text-slate-200 bg-background px-4 py-20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-4">
            <Button variant="link" asChild className="text-slate-500 hover:text-yellow-400 p-0 h-auto">
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
                  <p className="text-slate-400 uppercase tracking-wider text-xs font-semibold">Années de travail</p>
                </div>
                <div className="space-y-2 border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0">
                  <h3 className="text-4xl font-bold text-yellow-400">100%</h3>
                  <p className="text-slate-400 uppercase tracking-wider text-xs font-semibold">Bénévole</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold text-white">15k+</h3>
                  <p className="text-slate-400 uppercase tracking-wider text-xs font-semibold">Lignes de texte traduites</p>
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
              <div key={event.id || index} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <span className="text-2xl font-bold text-yellow-400 font-mono">{event.date}</span>
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                </div>
                <p className="text-slate-400 mt-2 max-w-2xl">{event.description}</p>
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
            {members.map((member) => (
              <motion.div
                key={member.id || member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <DiscordMemberCard member={member as unknown as CardTeamMember} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400 h-6 w-6" />
            <h2 className="text-2xl font-bold text-white">Crédits & Remerciements</h2>
          </div>
          <Separator className="bg-white/10" />

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(creditsByCategory).map(([category, items], index) => {
              const Icon = iconMap[category] || Star;
              const color = colorMap[category] || "text-yellow-400";
              return (
                <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Card className="bg-slate-900/40 border-white/5 h-full hover:border-white/10 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg text-white">
                        <Icon className={`h-5 w-5 ${color}`} />
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {items.map((item) => (
                          <li key={item.id || item.personName} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="text-sm">
                              <div className="font-bold text-slate-200">{item.personName}</div>
                              {item.task && <div className="text-slate-500 text-xs">{item.task}</div>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
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
          <h2 className="text-3xl font-bold text-white">Rejoignez l'aventure</h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Le projet est toujours à la recherche de talents. Si vous êtes
            traducteur, graphiste ou développeur, rejoignez notre Discord.
          </p>
          <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold shadow-lg rounded-full px-8 h-12 text-base transition-all hover:scale-105" asChild>
            <a href="https://discord.gg/mtJ2EzxMkt" target="_blank" rel="noopener noreferrer">Rejoindre le Discord</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
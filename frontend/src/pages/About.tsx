import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Clock,
  Heart,
  Rocket,
  Palette,
  Star,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DiscordMemberCard,
  type TeamMember as CardTeamMember,
} from "@/components/DiscordMemberCard";
import Loading from "@/components/Loading";
import { useMeta } from "@/lib/useMeta";
import { api } from "@/api/client";
import type { TeamMember, TimelineEvent, Credit } from "@/api/types";

const iconMap: Record<string, React.ElementType> = {
  "Graphismes & Visuels": Palette,
  "Anciens Traducteurs": Wrench,
  "Remerciements Spéciaux": Heart,
};

const colorMap: Record<string, string> = {
  "Graphismes & Visuels": "text-supernova",
  "Anciens Traducteurs": "text-primary",
  "Remerciements Spéciaux": "text-destructive",
};

export default function About() {
  useMeta({
    title: "À propos",
    description:
      "Découvre l'équipe Stellar Project, l'histoire du projet de traduction et les crédits.",
  });

  const [members, setMembers] = useState<TeamMember[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      api.getTeam().catch(() => []),
      api.getTimeline().catch(() => []),
      api.getCredits().catch(() => []),
    ]).then(([teamData, timelineData, creditsData]) => {
      if (isMounted) {
        setMembers(teamData);
        setTimelineEvents(timelineData);
        setCredits(creditsData);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const creditsByCategory = useMemo(() => {
    return credits.reduce<Record<string, Credit[]>>((acc, item) => {
      const category = item.category || "Remerciements";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [credits]);

  if (loading) {
    return <Loading fullScreen message="Chargement des informations..." />;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center text-foreground bg-background px-4 py-16 sm:py-24">
      <div className="relative z-10 max-w-6xl mx-auto space-y-16 sm:space-y-20 w-full">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs sm:text-sm mb-4">
            <Button
              variant="link"
              asChild
              className="text-muted-foreground hover:text-primary p-0 h-auto text-xs sm:text-sm cursor-pointer"
            >
              <Link to="/">Accueil</Link>
            </Button>
            <ChevronRight size={14} />
            <span className="text-primary font-black">À Propos</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Stellar <span className="text-accent">Project</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-medium">
            Une équipe de passionnés réunis autour d'un but commun : rendre
            l'expérience Inazuma Eleven GO Galaxy accessible à l'ensemble de la communauté francophone.
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-foreground">2+</h3>
                <p className="text-muted-foreground uppercase tracking-wider text-xs font-black">
                  Années de travail
                </p>
              </div>
              <div className="space-y-2 border-y md:border-y-0 md:border-x border-border/80 py-6 md:py-0">
                <h3 className="text-4xl font-black text-accent">100%</h3>
                <p className="text-muted-foreground uppercase tracking-wider text-xs font-black">
                  Bénévole & Fan-made
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-primary">15k+</h3>
                <p className="text-muted-foreground uppercase tracking-wider text-xs font-black">
                  Lignes de texte traduites
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {timelineEvents.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Clock className="text-accent h-6 w-6" />
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                Notre Histoire
              </h2>
            </div>
            <Separator className="bg-border/60" />

            <div className="relative border-l border-border/80 ml-3 md:ml-6 space-y-12 py-4">
              {timelineEvents.map((event, index) => (
                <div key={event.id || index} className="relative pl-8 md:pl-12">
                  <div className="absolute -left-1.25 top-2 h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <span className="text-2xl font-black text-accent font-mono">
                      {event.date}
                    </span>
                    <h3 className="text-xl font-black text-foreground">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed text-sm sm:text-base font-medium">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {members.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Users className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                L'Équipe Active
              </h2>
            </div>
            <Separator className="bg-border/60" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <DiscordMemberCard
                  key={member.id || member.name}
                  member={member as unknown as CardTeamMember}
                />
              ))}
            </div>
          </div>
        )}

        {Object.keys(creditsByCategory).length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Star className="text-accent h-6 w-6" />
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                Crédits & Remerciements
              </h2>
            </div>
            <Separator className="bg-border/60" />

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(creditsByCategory).map(([category, items]) => {
                const Icon = iconMap[category] || Star;
                const color = colorMap[category] || "text-accent";
                return (
                  <Card key={category} className="bg-card border-border h-full hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-foreground font-black tracking-tight">
                        <Icon className={`h-5 w-5 ${color}`} />
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {items.map((item) => (
                          <li
                            key={item.id || item.personName}
                            className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-secondary/40 transition-colors"
                          >
                            <div className="text-sm">
                              <div className="font-black text-foreground">
                                {item.personName}
                              </div>
                              {item.task && (
                                <div className="text-muted-foreground text-xs font-medium">
                                  {item.task}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-center pt-8 pb-8 space-y-6">
          <div className="inline-flex items-center justify-center p-3.5 bg-primary/10 rounded-full border border-primary/20 mb-2">
            <Rocket className="text-primary h-8 w-8" />
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">
            Rejoignez l'aventure
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-medium">
            Le projet reste ouvert aux passionnés. Si vous êtes traducteur,
            graphiste, relecteur ou développeur, venez nous faire un coucou sur Discord !
          </p>
          <Button
            size="lg"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-black rounded-full px-8 h-12 text-base transition-colors cursor-pointer"
            asChild
          >
            <a
              href="https://discord.gg/mtJ2EzxMkt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rejoindre le Discord
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
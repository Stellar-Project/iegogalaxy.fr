import { useEffect, useState } from "react";
import {
  Users,
  Code,
  PenTool,
  Languages,
  Sparkles,
  Loader2,
  Gamepad2,
  Music,
  Monitor,
  Coffee,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TeamMember {
  name?: string;
  role: string;
  avatar?: string;
  category: "lead" | "dev" | "trans" | "art";
  discordId?: string;
}

interface LanyardActivity {
  type: number;
  name: string;
  state?: string;
  details?: string;
  assets?: {
    large_image?: string;
    small_image?: string;
  };
}

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  discord_user: {
    username: string;
    avatar: string;
    id: string;
    global_name: string;
    banner?: string;
    accent_color?: number;
  };
}

const getRoleIcon = (category: string) => {
  switch (category) {
    case "lead":
      return <Sparkles size={12} className="text-accent" />;
    case "dev":
      return <Code size={12} className="text-primary" />;
    case "trans":
      return <Languages size={12} className="text-primary" />;
    case "art":
      return <PenTool size={12} className="text-supernova" />;
    default:
      return <Users size={12} />;
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "online":
      return "bg-emerald-500";
    case "idle":
      return "bg-amber-500";
    case "dnd":
      return "bg-destructive";
    default:
      return "bg-muted-foreground/60";
  }
};

const getStatusLabel = (status?: string) => {
  switch (status) {
    case "online":
      return "En ligne";
    case "idle":
      return "Inactif";
    case "dnd":
      return "Ne pas déranger";
    default:
      return "Hors ligne";
  }
};

export function DiscordMemberCard({ member }: { member: TeamMember }) {
  const hasValidDiscordId = Boolean(
    member.discordId && member.discordId !== "000000000000000000"
  );

  const [lanyardData, setLanyardData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(hasValidDiscordId);

  useEffect(() => {
    if (!hasValidDiscordId || !member.discordId) {
      return;
    }

    let isMounted = true;

    const fetchData = () => {
      fetch(`https://api.lanyard.rest/v1/users/${member.discordId}`)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            if (data.success) {
              setLanyardData(data.data);
            }
            setLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [hasValidDiscordId, member.discordId]);

  const user = lanyardData?.discord_user;
  const status = lanyardData?.discord_status || "offline";

  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
    : member.avatar;

  const bannerUrl = user?.banner
    ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=600`
    : null;

  const displayName =
    user?.global_name || user?.username || member.name || "Membre";

  const mainActivity = lanyardData?.activities.find(
    (a) => a.type === 0 || a.type === 2
  );

  const customStatus = lanyardData?.activities.find((a) => a.type === 4);

  return (
    <Card className="bg-card border-border hover:border-primary/50 hover:bg-card transition-colors duration-300 overflow-hidden h-full flex flex-col">
      <div className="h-28 w-full relative bg-secondary/60">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt="Bannière Discord"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-tr from-secondary via-secondary/70 to-primary/10 opacity-70" />
        )}
        <div  className="w-full h-full bg-linear-to-t from-card via-transparent to-transparent" />
      </div>

      <CardContent className="flex flex-col items-start px-5 sm:px-6 -mt-14 relative z-10 grow pb-6 w-full">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-card bg-secondary">
            <AvatarImage
              src={avatarUrl}
              alt={displayName}
              className="object-cover"
            />
            <AvatarFallback className="bg-secondary text-foreground text-xl font-black">
              {loading ? (
                <Loader2 className="animate-spin text-primary" />
              ) : (
                displayName.substring(0, 2).toUpperCase()
              )}
            </AvatarFallback>
          </Avatar>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
<div
                    className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-card ${getStatusColor(
                      status
                    )} transition-colors cursor-pointer`}
                  />
              </TooltipTrigger>
              <TooltipContent className="bg-popover border-border text-popover-foreground text-xs shadow-md font-black">
                <p>{getStatusLabel(status)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="mt-3 w-full">
          <h3 className="text-lg sm:text-xl font-black text-foreground group-hover:text-primary transition-colors truncate tracking-tight">
            {loading ? "Chargement..." : displayName}
          </h3>
          {user && (
            <p className="text-muted-foreground text-xs font-mono font-bold mb-2">
              @{user.username}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="outline"
            className="bg-secondary/40 border-border text-foreground gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider font-black"
          >
            {getRoleIcon(member.category)}
            {member.role}
          </Badge>
        </div>

        <Separator className="bg-border/60 mb-4" />

        <div className="w-full mt-auto min-h-14.5 text-xs">
          {mainActivity ? (
            <div className="flex items-start gap-3 bg-secondary/40 p-2.5 rounded-lg border border-border/60">
              <div className="mt-0.5 shrink-0">
                {mainActivity.name === "Spotify" ? (
                  <Music size={16} className="text-emerald-400" />
                ) : mainActivity.name === "Visual Studio Code" ? (
                  <Code size={16} className="text-primary" />
                ) : (
                  <Gamepad2 size={16} className="text-accent" />
                )}
              </div>
              <div className="overflow-hidden min-w-0">
                <p className="font-black text-muted-foreground truncate text-[10px] uppercase tracking-wider">
                  {mainActivity.type === 2 ? "Écoute" : "En jeu"}
                </p>
                <p className="font-black text-foreground truncate">
                  {mainActivity.name}
                </p>
                {mainActivity.details && (
                  <p className="text-muted-foreground text-[11px] font-medium truncate">
                    {mainActivity.details}
                  </p>
                )}
                {mainActivity.state && (
                  <p className="text-muted-foreground/80 text-[11px] font-medium truncate">
                    {mainActivity.state}
                  </p>
                )}
              </div>
            </div>
          ) : customStatus?.state ? (
            <div className="flex items-center gap-2.5 p-2.5 text-muted-foreground italic bg-secondary/30 rounded-lg border border-border/40 font-medium">
              <Coffee size={15} className="shrink-0" />
              <p className="text-[11px] line-clamp-2">« {customStatus.state} »</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground/60 p-2 font-medium">
              <Monitor size={15} />
              <p className="text-[11px]">Pas d'activité récente</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
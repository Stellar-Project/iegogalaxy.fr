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
      return <Sparkles size={12} className="text-yellow-400" />;
    case "dev":
      return <Code size={12} className="text-blue-400" />;
    case "trans":
      return <Languages size={12} className="text-green-400" />;
    case "art":
      return <PenTool size={12} className="text-pink-400" />;
    default:
      return <Users size={12} />;
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "online":
      return "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]";
    case "idle":
      return "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]";
    case "dnd":
      return "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]";
    default:
      return "bg-slate-500";
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
  const [lanyardData, setLanyardData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(
    !!member.discordId && member.discordId !== "000000000000000000"
  );

  useEffect(() => {
    if (!member.discordId || member.discordId === "000000000000000000") {
      setLoading(false);
      return;
    }

    const fetchData = () => {
      fetch(`https://api.lanyard.rest/v1/users/${member.discordId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setLanyardData(data.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [member.discordId]);

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
    <Card className="bg-slate-900/40 border-white/5 hover:border-yellow-500/30 hover:bg-slate-800/50 transition-all group overflow-hidden h-full flex flex-col">
      <div className="h-28 w-full relative bg-slate-950">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt="Discord Banner"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 opacity-80" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
      </div>

      <CardContent className="flex flex-col items-start px-6 -mt-14 relative z-10 grow pb-6 w-full">
        <div className="relative">
          <Avatar className="h-24 w-24 border-[6px] border-slate-900 shadow-2xl group-hover:border-slate-800 transition-colors bg-slate-950">
            <AvatarImage
              src={avatarUrl}
              alt={displayName}
              className="object-cover"
            />
            <AvatarFallback className="bg-slate-800 text-slate-400 text-xl font-bold">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                displayName?.substring(0, 2).toUpperCase()
              )}
            </AvatarFallback>
          </Avatar>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`absolute bottom-1 right-1 h-6 w-6 rounded-full border-4 border-slate-900 ${getStatusColor(
                    status
                  )} transition-colors`}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 border-white/10 text-white text-xs">
                <p>{getStatusLabel(status)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="mt-3 w-full">
          <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors truncate">
            {loading ? "Chargement..." : displayName}
          </h3>
          {user && (
            <p className="text-slate-500 text-xs font-mono mb-2">
              @{user.username}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="outline"
            className="bg-white/5 border-white/10 text-slate-300 gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider"
          >
            {getRoleIcon(member.category)}
            {member.role}
          </Badge>
        </div>

        <Separator className="bg-white/5 mb-4" />

        <div className="w-full mt-auto min-h-[60px] text-sm">
          {mainActivity ? (
            <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
              <div className="mt-0.5 shrink-0">
                {mainActivity.name === "Spotify" ? (
                  <Music size={18} className="text-green-400" />
                ) : mainActivity.name === "Visual Studio Code" ? (
                  <Code size={18} className="text-blue-400" />
                ) : (
                  <Gamepad2 size={18} className="text-purple-400" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-white truncate text-xs uppercase tracking-wide opacity-70">
                  {mainActivity.type === 2 ? "Écoute" : "Joue à"}
                </p>
                <p className="font-medium text-slate-200 truncate">
                  {mainActivity.name}
                </p>
                {mainActivity.details && (
                  <p className="text-slate-400 text-xs truncate">
                    {mainActivity.details}
                  </p>
                )}
                {mainActivity.state && (
                  <p className="text-slate-500 text-xs truncate">
                    {mainActivity.state}
                  </p>
                )}
              </div>
            </div>
          ) : customStatus?.state ? (
            <div className="flex items-center gap-3 p-3 text-slate-400 italic bg-white/5 rounded-lg border border-white/5">
              <Coffee size={16} />
              <p className="text-xs line-clamp-2">"{customStatus.state}"</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-600 p-3">
              <Monitor size={16} />
              <p className="text-xs">Pas d'activité récente</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
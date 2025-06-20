import {
  getAveragePostLengths,
  getIconPresenceStats,
  getPostCountByUser,
  getPostsGroupedBy,
  getPublishedStats,
  getTotalPostCount,
} from "@/actions/posts";
import {
  getActiveInactiveUsers,
  getNewUsersGroupedBy,
  getTotalUsers,
} from "@/actions/users";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendingUp } from "lucide-react";

function getCurrentYearMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getCurrentWeekYear() {
  const now = new Date();
  const date = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );

  const dayNum = date.getUTCDay() || 7;

  date.setUTCDate(date.getUTCDate() + 4 - dayNum);

  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));

  const weekNum = Math.ceil(
    ((date.getDate() - yearStart.getDate()) / 86400000 + 1) / 7
  );

  const year = date.getUTCFullYear();

  return `S${weekNum.toString().padStart(2, "0")}-${year}`;
}

export default async function StatistiquePage() {
  const totalPost = await getTotalPostCount();
  const postsByUser = await getPostCountByUser();
  const publishedStats = await getPublishedStats();
  const monthlyPost = await getPostsGroupedBy("monthly");
  const iconPresenceStats = await getIconPresenceStats();
  const avgPostLength = await getAveragePostLengths();
  const totalUsers = await getTotalUsers();

  const newUsers = await getNewUsersGroupedBy("weekly");

  const activeUsers = await getActiveInactiveUsers(10);

  const avgPostsByUser =
    postsByUser.length > 0 ? totalPost / postsByUser.length : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardDescription className="text-xs">
              Tous les posts créés depuis la création du Blog.
            </CardDescription>
            <CardTitle className="text-2xl">{totalPost} posts</CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <TrendingUp className="size-6" />
                {totalPost}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-medium">
              {monthlyPost[getCurrentYearMonth()] + " "}posts créé
              {monthlyPost[getCurrentYearMonth()] > 1 ? "s" : ""} durant ce
              mois.
            </p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardDescription className="text-xs">
              Nombre de posts moyen par utilisateur.
            </CardDescription>
            <CardTitle className="text-2xl">
              {avgPostsByUser} post{avgPostsByUser > 1 ? "s" : ""}
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <TrendingUp className="size-6" />
                {avgPostsByUser}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-medium">
              {publishedStats.published}{" "}
              {publishedStats.published > 1
                ? "posts sont publiés"
                : "post publié"}
            </p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
              Longueur moyen des titre.
            </CardTitle>
            <CardDescription className="text-xs flex gap-1">
              La longueur moyen des titres :
              <p className="font-medium">
                {avgPostLength["avgTitleLength"] + " caractères"}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold  text-sm text-muted-foreground">
              Avec{" "}
              {iconPresenceStats.withIcon > 0
                ? iconPresenceStats.withIcon + " posts avec un icon"
                : iconPresenceStats.withoutIcon + " posts sans icon"}
            </p>
          </CardContent>
        </Card>
      </div>
      <Separator />
      <div className="flex flex-wrap gap-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardDescription className="text-xs flex gap-1">
              Nombre d&apos;utilisateurs depuis la création du Blog.
            </CardDescription>
            <CardTitle className="text-2xl">
              {totalUsers + " utilisateurs"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold  text-sm text-muted-foreground">
              Avec{" "}
              {iconPresenceStats.withIcon > 0
                ? iconPresenceStats.withIcon + " posts avec un icon"
                : iconPresenceStats.withoutIcon + " posts sans icon"}
            </p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardDescription className="text-xs flex gap-1">
              Nouveau utilisateurs.
            </CardDescription>
            <CardTitle className="text-2xl">
              {newUsers[getCurrentWeekYear()] +
                " nouveau utilisateurs cette semaine"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold  text-sm text-muted-foreground">
              Avec{" "}
              {iconPresenceStats.withIcon > 0
                ? iconPresenceStats.withIcon + " posts avec un icon"
                : iconPresenceStats.withoutIcon + " posts sans icon"}
            </p>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardDescription className="text-xs flex gap-1">
              Utilisateurs actifs.
            </CardDescription>
            <CardTitle className="text-2xl">
              {activeUsers.active + " utilisateurs actifs"}
            </CardTitle>
            <CardDescription className="text-xs flex gap-1">
              Et {activeUsers.inactive + " utilisateurs inactifs"}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

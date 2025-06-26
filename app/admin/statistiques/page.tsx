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
import { getISOWeek, getISOWeekYear } from "date-fns";
import { TrendingUp } from "lucide-react";

function getCurrentYearMonth() {
  const now = new Date();
  const year = getISOWeekYear(now);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getCurrentWeekYear() {
  const now = new Date();
  const week = getISOWeek(now);
  const year = getISOWeekYear(now);

  return `S${week.toString().padStart(2, "0")}-${year}`;
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
      <div className="flex gap-4 flex-wrap items-stretch">
        <Card className="flex-1 min-w-[300px]">
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
              {Object.keys(monthlyPost).length !== 0
                ? monthlyPost[getCurrentYearMonth()] + " "
                : "0 "}
              post
              {Object.keys(monthlyPost).length !== 0
                ? monthlyPost[getCurrentYearMonth()] > 1
                  ? "s"
                  : ""
                : ""}{" "}
              créé
              {Object.keys(monthlyPost).length !== 0
                ? monthlyPost[getCurrentYearMonth()] > 1
                  ? "s"
                  : ""
                : ""}{" "}
              durant ce mois.
            </p>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[300px]">
          <CardHeader>
            <CardDescription className="text-xs">
              Nombre de posts moyen par utilisateur.
            </CardDescription>
            <CardTitle className="text-2xl">
              {avgPostsByUser.toPrecision(3)} post
              {avgPostsByUser > 1 ? "s" : ""}
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <TrendingUp className="size-6" />
                {avgPostsByUser.toPrecision(3)}
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

        <Card className="flex-1 min-w-[300px]">
          <CardHeader>
            <CardTitle className="text-2xl">
              Longueur moyen des titre.
            </CardTitle>
            <CardDescription className="text-xs flex gap-1">
              La longueur moyen des titres :
              <p className="font-medium">
                {avgPostLength["avgTitleLength"]
                  ? avgPostLength["avgTitleLength"].toPrecision(3) +
                    " caractères"
                  : "0 caractères"}
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium  text-sm text-muted-foreground">
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
        <Card className="flex-1 min-w-[300px]">
          <CardHeader>
            <CardDescription className="text-xs flex gap-1">
              Nombre d&apos;utilisateurs depuis la création du Blog.
            </CardDescription>
            <CardTitle className="text-2xl">
              {totalUsers + " utilisateurs"}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="flex-1 min-w-[300px]">
          <CardHeader>
            <CardDescription className="text-xs flex gap-1">
              Nouveau utilisateurs.
            </CardDescription>
            <CardTitle className="text-2xl">
              {newUsers[getCurrentWeekYear()] +
                " nouveau utilisateurs cette semaine"}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="flex-1 min-w-[300px]">
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

import { getAllPosts } from "@/actions/posts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function timeSince(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000); // <-- CORRECT

  const intervals = [
    { label: "an", seconds: 31536000 },
    { label: "mois", seconds: 2592000 },
    { label: "jour", seconds: 86400 },
    { label: "heure", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "seconde", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `Il y a ${count} ${interval.label}${count > 1 ? "s" : ""}`;
    }
  }

  return "À l’instant";
}

export const PostPreview = async () => {
  const posts = await getAllPosts();

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Découvrir les posts
        </h2>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, i) => (
          <Card key={i} className="shadow-none py-4">
            <CardHeader className="px-4">
              <div className="aspect-video bg-muted w-full rounded-md" />
            </CardHeader>
            <CardContent className="pt-4 pb-5">
              <Badge>Technology</Badge>

              <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">
                {post.title}
              </h3>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    {post.author.name && post.author.name[0].toUpperCase()}
                  </div>
                  <span className="text-muted-foreground font-semibold">
                    {post.author.name}
                  </span>
                </div>

                <span className="text-muted-foreground text-sm">
                  {timeSince(new Date(post.createdAt))}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

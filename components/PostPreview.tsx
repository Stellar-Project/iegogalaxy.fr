import { getAllPosts } from "@/actions/posts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeSince } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";

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
          <Link key={i} href={`/posts/${post.id}`}>
            <Card className="shadow-none py-4 h-[500px]">
              <CardHeader className="px-4">
                <div className="aspect-video bg-muted w-full rounded-md" />
              </CardHeader>
              <CardContent className="pt-4">
                <Badge>Technology</Badge>
              </CardContent>
              <CardFooter className="pt-4 pb-5 flex flex-col items-start">
                <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">
                  {post.title.substring(0, 32) + "..."}
                </h3>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {post.author.image ? (
                        <Image
                          src={post.author.image}
                          alt="Avatar"
                          width={24}
                          height={24}
                        />
                      ) : (
                        post.author.name && post.author.name[0].toUpperCase()
                      )}
                    </div>
                    <span className="text-muted-foreground font-semibold">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-muted-foreground text-sm">
                    {timeSince(new Date(post.createdAt))}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createNewPost, getAllPostsByUserId } from "@/actions/posts";
import { PostWithAuthor } from "@/lib/post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import PostRow from "./PostRow";

export function ListPosts({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllPostsByUserId(userId).then((postsRes) => {
      setPosts(postsRes);
    });
  }, []);

  const handleCreate = async () => {
    const res = await createNewPost(userId);
    if (res.success) {
      if (res.data?.id) {
        const myPromise = new Promise<{ name: string }>((resolve) => {
          setTimeout(() => {
            resolve({ name: "Patienter message" });
          }, 1000);
        });

        router.push(`/admin/posts/edit/${res.data?.id}`);

        toast.promise(myPromise, {
          loading: "Veuillez patienter...",
          success: () => {
            return `Post créé avec succès !`;
          },
          error: "Error",
        });
      }
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={handleCreate}>
        Créer un nouveau post
      </Button>
      <Table className="max-w-7xl">
        <TableCaption>A list of posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">AuthorId</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <PostRow
              postId={post.id!}
              title={post.title}
              author={post.author}
              published={post.published!}
              key={`Post-${index}`}
              setPosts={setPosts}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

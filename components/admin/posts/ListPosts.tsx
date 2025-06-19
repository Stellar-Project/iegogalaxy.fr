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
import { Button } from "../../ui/button";
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
    if (res.success && res.data?.id) {
      toast.loading("Veuillez patienter...");

      sessionStorage.setItem("postCreated", "true");

      router.push(`/admin/posts/edit/${res.data.id}`);
    } else {
      toast.error(res.message || "Une erreur est survenue.");
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleCreate}>Créer un nouveau post</Button>
      <Table className="max-w-7xl">
        <TableCaption>La liste des posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Titre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Auteur</TableHead>
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
    </div>
  );
}

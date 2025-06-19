"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllPosts } from "@/actions/posts";
import { PostWithAuthor } from "@/lib/post";
import { useEffect, useState } from "react";
import PostRow from "./PostRow";

export function ListPosts() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);

  useEffect(() => {
    getAllPosts().then((postsRes) => {
      setPosts(postsRes);
    });
  }, []);

  return (
    <>
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

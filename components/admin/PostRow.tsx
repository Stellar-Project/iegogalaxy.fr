"use client";

import { deletePostById } from "@/actions/posts";
import { PostWithAuthor } from "@/lib/post";
import { EllipsisVertical } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableCell, TableRow } from "../ui/table";

const PostRow = ({
  postId,
  title,
  published,
  author,
  setPosts,
}: {
  postId: number;
  title: string;
  published: boolean;
  author: { name: string | null };
  setPosts: Dispatch<SetStateAction<PostWithAuthor[]>>;
}) => {
  const handleRemove = async () => {
    const res = await deletePostById(postId);

    if (res.success) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{published ? "Publié" : "En attente"}</TableCell>
      <TableCell className="text-right">{author.name}</TableCell>
      <TableCell className="text-right flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-2 bg-transparent rounded-full hover:bg-primary/10 transition-all duration-200">
              <EllipsisVertical className="size-5 text-gray-950 cursor-pointer" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Voir</DropdownMenuItem>
              <DropdownMenuItem>Modifier</DropdownMenuItem>
              <DropdownMenuItem>Changer le statut</DropdownMenuItem>
              <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Partager</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleRemove}>
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default PostRow;

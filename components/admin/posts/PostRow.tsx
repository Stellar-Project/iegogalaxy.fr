"use client";

import { deletePostById, setNewTitle, setPostPublic } from "@/actions/posts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PostWithAuthor } from "@/lib/post";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { TableCell, TableRow } from "../../ui/table";

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
  const [titleValue, setTitleValue] = useState(title);
  const [statusValue, setStatusValue] = useState(published);
  const [inputValue, setInputValue] = useState(title);

  const router = useRouter();

  const handleRemove = async () => {
    const res = await deletePostById(postId);

    if (res.success) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleEdit = () => {
    const link = `/admin/posts/edit/${postId}`;
    router.push(link);
  };

  const handleSee = () => {
    const link = `/posts/${postId}`;
    router.push(link);
  };

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleRename = async () => {
    const res = await setNewTitle(postId, inputValue);

    if (res.success) {
      toast.success(res.message);
      setTitleValue(inputValue);
    } else {
      toast.error(res.message);
    }
  };

  const handlePublish = async () => {
    const res = await setPostPublic(postId, !statusValue);

    if (res.success) {
      toast.success(res.message);
      setStatusValue(!statusValue);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog>
      <TableRow>
        <TableCell onClick={handleEdit} className="font-medium cursor-pointer">
          {titleValue.substring(0, 10) + (titleValue.length >= 10 ? "..." : "")}
        </TableCell>
        <TableCell onClick={handleEdit} className="cursor-pointer">
          {statusValue ? "Publié" : "Privé"}
        </TableCell>
        <TableCell onClick={handleEdit} className="text-right cursor-pointer">
          {author.name}
        </TableCell>
        <TableCell className="text-right flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-2 bg-transparent rounded-full hover:bg-primary/10 transition-all duration-200">
                <EllipsisVertical className="size-5 text-gray-950 cursor-pointer" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DialogTrigger className="w-full">
                  <DropdownMenuItem>Renommer</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onClick={handleSee}>Voir</DropdownMenuItem>
                <DropdownMenuItem onClick={handleEdit}>
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePublish}>
                  Changer le statut
                </DropdownMenuItem>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Renommer</DialogTitle>
          <DialogDescription>Renommer le titre du post.</DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Annuler</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleRename}>Renommer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostRow;

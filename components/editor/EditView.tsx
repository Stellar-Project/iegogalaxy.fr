"use client";

import { PostType } from "@/lib/post";
import { toast } from "sonner";

export const EditView = ({
  success,
  message,
  post,
}: {
  success: boolean;
  message: string;
  post: PostType | null | object;
}) => {
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }

  return <div>{JSON.stringify(post)}</div>;
};

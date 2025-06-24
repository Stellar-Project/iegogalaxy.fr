"use client";

import { setNewContent } from "@/actions/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { PostType, PostWithAuthor } from "@/lib/post";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Toolbar } from "./Toolbar";

export const EditorView = ({
  post,
  editable,
}: {
  post: PostType;
  editable: boolean;
}) => {
  const [saveStatus, setSaveStatus] = useState(true);
  let debounceTimeout: NodeJS.Timeout;

  const onChange = async (newContent: string) => {
    setSaveStatus(false);
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      if (!post.id) return;

      const res = await setNewContent(post.id, newContent);

      if (res.success) {
        setSaveStatus(true);
      }

      setSaveStatus(true);
    }, 3000);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimeout);
  }, []);

  useEffect(() => {
    const justCreated = sessionStorage.getItem("postCreated");

    if (justCreated) {
      sessionStorage.removeItem("postCreated");
      toast.dismiss();
      toast.success("Post créé avec succès !");
    }
  }, []);

  const DynamicEditor = useMemo(
    () =>
      dynamic(() => import("./Editor").then((mod) => mod.Editor), {
        ssr: false,
        loading: () => (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </div>
        ),
      }),
    []
  );

  return (
    <div className="pb-40">
      <div
        className={cn(
          "md:max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-0 flex flex-col gap-2",
          editable && "ml-8"
        )}
      >
        <Toolbar
          initialData={post as PostWithAuthor}
          saved={saveStatus}
          preview={editable !== undefined ? !editable : false}
        />
        <DynamicEditor
          onChange={onChange}
          initialContent={post.content || undefined}
          editable={editable}
        />
      </div>
    </div>
  );
};

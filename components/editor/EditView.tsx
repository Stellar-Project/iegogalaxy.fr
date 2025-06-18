"use client";

import { setNewContent } from "@/actions/posts";
import { PostType } from "@/lib/post";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Toolbar } from "./Toolbar";

export const EditorView = ({ post }: { post: PostType }) => {
  const [saveStatus, setSaveStatus] = useState(true);
  let debounceTimeout: NodeJS.Timeout;

  const onChange = async (newContent: string) => {
    setSaveStatus(false);
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
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

  const DynamicEditor = useMemo(
    () =>
      dynamic(() => import("./Editor").then((mod) => mod.Editor), {
        ssr: false,
        loading: () => <div>Loading...</div>,
      }),
    []
  );

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={post} saved={saveStatus} />
        <DynamicEditor
          onChange={onChange}
          initialContent={post.content || undefined}
          editable={true}
        />
      </div>
    </div>
  );
};

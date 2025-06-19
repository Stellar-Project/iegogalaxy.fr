"use client";

import { setNewIcon, setNewTitle } from "@/actions/posts";
import { timeSince } from "@/lib/date";
import { PostWithAuthor } from "@/lib/post";
import { cn } from "@/lib/utils";
import { SmileIcon, X } from "lucide-react";
import React, { useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { toast } from "sonner";
import { IconPicker } from "../shared/icon-picker";
import { Button } from "../ui/button";

export function Toolbar({
  initialData,
  preview,
  saved = true,
}: {
  initialData: PostWithAuthor;
  preview?: boolean;
  saved: boolean;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [iconValue, setIconValue] = useState(initialData.icon);
  const [value, setValue] = useState(initialData.title);

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      if (!initialData.id) return;
      if (initialData.title === value) return;
      const res = await setNewTitle(initialData.id, value);
      if (!res.success) {
        setValue(initialData.title);
      }
    }, 3000);

    setDebounceTimeout(timeout);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = async (icon: string) => {
    if (!initialData.id) return;
    const res = await setNewIcon(initialData.id, icon);
    if (res.success) {
      setIconValue(icon);
    } else {
      toast.error(res.message);
    }
  };

  const onRemoveIcon = async () => {
    if (!initialData.id) return;
    const res = await setNewIcon(initialData.id, null);
    if (res.success) {
      setIconValue(null);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-row justify-between items-start",
        preview && "pt-36"
      )}
    >
      <div>
        {!!iconValue && !preview && (
          <div className="flex items-center gap-x-2 group/icon">
            <IconPicker onChange={onIconSelect}>
              <p className="text-6xl hover:opacity-75 transition">
                {iconValue}
              </p>
            </IconPicker>
            <Button
              onClick={onRemoveIcon}
              className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!!iconValue && preview && <p className="text-6xl pt-6">{iconValue}</p>}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
          {!iconValue && !preview && (
            <IconPicker onChange={onIconSelect} asChild>
              <Button
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
              >
                <SmileIcon className="size-4 mr-2" />
                Add icon
              </Button>
            </IconPicker>
          )}
        </div>
        {isEditing && !preview ? (
          <TextAreaAutoSize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={value}
            onChange={(e) => onInput(e.target.value)}
            className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          />
        ) : (
          <div
            onClick={enableInput}
            className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          >
            {value}
          </div>
        )}
      </div>
      {!preview && (
        <p className="text-xs text-muted-foreground bg-muted py-2 px-4 rounded-md border">
          {saved ? "Saved" : "Unsaved"}
        </p>
      )}
      {preview && (
        <div className="flex flex-row gap-2">
          <p className="text-xs text-muted-foreground bg-muted py-2 px-4 rounded-md border">
            Par {initialData.author?.name}
          </p>
          <p className="text-xs text-muted-foreground bg-muted py-2 px-4 rounded-md border">
            {timeSince(initialData?.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
}

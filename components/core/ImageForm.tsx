"use client";
import { cn } from "@/lib/utils";
import { User, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import Dropzone from "react-dropzone";
const ImagePreview = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => (
  <div className="relative aspect-square">
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>

    <Image
      src={url}
      height={500}
      width={500}
      alt=""
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);
export default function ImageForm({
  profilePicture,
  setProfilePicture,
}: {
  profilePicture: string | null;
  setProfilePicture: (value: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="cursor-pointer">
      <div className="mt-1 size-10 rounded-full">
        {profilePicture ? (
          <ImagePreview
            url={profilePicture}
            onRemove={() => {
              setProfilePicture(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          />
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setProfilePicture(imageUrl);

                // Remplir l'input caché avec le fichier
                if (inputRef.current) {
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(file);
                  inputRef.current.files = dataTransfer.files;
                }
              }
            }}
            accept={{
              "image/png": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxFiles={1}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "size-10 border border-dashed flex items-center justify-center rounded-md focus:outline-none focus:border-primary",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input {...getInputProps()} id="profile" />
                <User className="size-8" strokeWidth={1.25} />
              </div>
            )}
          </Dropzone>
        )}
      </div>
      <input ref={inputRef} name="image" type="file" className="hidden" />
    </div>
  );
}

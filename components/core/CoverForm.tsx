"use client";

import { ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ImageForm from "./ImageForm";

export const CoverForm = ({
  label,
  setCover,
  cover,
}: {
  label?: string;
  setCover: (path: string | null) => void;
  cover: string | null;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-muted-foreground text-xs"
          variant="outline"
          size="sm"
        >
          <ImageIcon className="size-4 mr-2" />
          {label || "Add Cover"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une image de couverture</DialogTitle>
          <DialogDescription>
            Cette image sera afficher à l&apos;accueil et dans les metadonnées.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-row">
          <ImageForm profilePicture={cover} setProfilePicture={setCover} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

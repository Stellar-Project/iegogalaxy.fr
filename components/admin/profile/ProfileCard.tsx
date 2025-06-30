"use client";

import { uploadImage } from "@/actions/files";
import { setUserInfo } from "@/actions/users";
import ImageForm from "@/components/core/ImageForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "better-auth";
import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Champs } from "./Champs";

export function ProfileCard({ user }: { user: User }) {
  const router = useRouter();
  const { image, email, emailVerified, name } = user;
  const [profilePicture, setProfilePicture] = useState<string | null>(
    image || null
  );

  const profileAction = async (formData: FormData) => {
    const { name, email } = Object.fromEntries(formData) as Record<
      string,
      string
    >;
    const file = formData.get("image") as File | null;
    if (!file) return;

    const uploadRes = await uploadImage(file);

    if (!uploadRes.success) {
      toast.error(uploadRes.message);
      return;
    }

    const res = await setUserInfo(
      user.id,
      name,
      email,
      `/uploads/${file?.name}`
    );

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form action={profileAction}>
      <Card className="max-w-xl  w-full mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Modifier toutes les informations</CardDescription>
          <CardAction>
            <ImageForm
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
            />
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-2">
          <Champs
            value={email}
            label="email"
            icon={emailVerified ? <CheckCheck className="size-4" /> : undefined}
            type="email"
          />
          <Champs value={name} label="name" />
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" type="button">
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

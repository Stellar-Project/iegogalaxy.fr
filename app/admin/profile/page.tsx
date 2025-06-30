import { ProfileCard } from "@/components/admin/profile/ProfileCard";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return;
  const user = session.user;

  return <ProfileCard user={user} />;
}

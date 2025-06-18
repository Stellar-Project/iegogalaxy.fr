import { getPostById } from "@/actions/posts";
import { EditView } from "@/components/editor/EditView";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;

  if (!parseInt(id)) {
    redirect("/admin");
  }

  const {
    success,
    message,
    data: post,
  } = await getPostById(parseInt(id), user.id);

  return <EditView success={success} message={message} post={post} />;
}

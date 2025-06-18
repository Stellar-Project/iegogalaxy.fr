import { getPostById } from "@/actions/posts";
import { EditorView } from "@/components/editor/EditView";
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

  const { data: post } = await getPostById(parseInt(id), user.id);

  if (!post) redirect("/admin");

  return <EditorView post={post} />;
}

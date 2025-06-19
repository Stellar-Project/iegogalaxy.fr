import { getPostPreview } from "@/actions/posts";
import { EditorView } from "@/components/editor/EditView";
import { redirect } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostPreview(parseInt(slug));

  if (!post) redirect("/");

  return <EditorView post={post} editable={false} />;
}

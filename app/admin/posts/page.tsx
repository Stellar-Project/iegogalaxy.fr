import { ListPosts } from "@/components/admin/ListPosts";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PostsAdmin = async () => {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
      redirect("/sign-in");
    }
  
    const user = session.user;
  return (
    <div>
      <ListPosts userId={user.id} />
    </div>
  );
};

export default PostsAdmin;

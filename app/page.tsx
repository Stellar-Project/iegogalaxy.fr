import NavBar from "@/components/core/NavBar";
import { PostPreview } from "@/components/PostPreview";

export default async function Home() {
  return (
    <>
      <NavBar />
      <main className="w-screen h-screen overflow-x-hidden pt-12">
        <PostPreview />
      </main>
    </>
  );
}

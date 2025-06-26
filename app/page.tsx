import { NavBar } from "@/components/core/NavBar";
import { Hero } from "@/components/Hero";
import { PostPreview } from "@/components/PostPreview";

export default async function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <main className="w-screen min-h-screen overflow-hidden pt-12 bg-white z-10">
        <PostPreview />
      </main>
    </>
  );
}

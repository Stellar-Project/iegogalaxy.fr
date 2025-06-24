import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";
import { Hamburger } from "./Hamburger";
import { Navigation } from "./Navigation";
import { getLatestPost } from "@/actions/posts";

export const NavBar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const posts = await getLatestPost();

  return (
    <>
      <div className="w-screen bg-white fixed top-0 left-0 py-5 z-50">
        <div className="md:container mx-auto flex items-center justify-between px-4">
          <Link href="/">
            <h2>IE</h2>
          </Link>
          <div className="flex items-center justify-end relative w-1/2">
            <div className="-translate-x-1/2 left-0 hidden md:block absolute">
              <Navigation posts={posts} />
            </div>
            <div className="hidden md:block">
              {session && session.user ? (
                <Link href="/admin">
                  <Button variant="default">dashboard</Button>
                </Link>
              ) : (
                <Link href="/sign-in">
                  <Button variant="outline">Se connecter</Button>
                </Link>
              )}
            </div>
            <div className="block md:hidden">
              <Hamburger isConnected={!!(session && session.user)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

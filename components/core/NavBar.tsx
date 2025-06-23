import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";
import { Navigation } from "./Navigation";

export const NavBar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="w-screen bg-white fixed top-0 left-0 py-5 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h2>IE</h2>
        </Link>
        <div className="flex items-center justify-end relative w-1/2">
          <div className="absolute -translate-x-1/2 left-0">
            <Navigation />
          </div>
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
      </div>
    </div>
  );
};

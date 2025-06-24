"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BookOpenIcon, FileTextIcon, HomeIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

export function Hamburger({ isConnected }: { isConnected: boolean }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-700">
          <MenuIcon className="size-6" />{" "}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-white p-4">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="pb-2 border-b">
            <DrawerTitle className="text-xl font-semibold">Menu</DrawerTitle>
            <DrawerDescription className="text-sm text-gray-500">
              Accédez rapidement aux sections
            </DrawerDescription>
          </DrawerHeader>

          <nav className="p-4 pt-8">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-3 text-lg font-medium text-gray-700"
                >
                  <HomeIcon className="w-5 h-5" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="flex items-center gap-3 text-lg font-medium text-gray-700"
                >
                  <FileTextIcon className="w-5 h-5" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/wiki"
                  className="flex items-center gap-3 text-lg font-medium text-gray-700"
                >
                  <BookOpenIcon className="w-5 h-5" />
                  Wiki
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <DrawerFooter className="w-full pt-4 border-t">
          {isConnected ? (
            <Link href="/admin" className="w-full">
              <Button variant="default" className="w-full">
                Tableau de bord
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in" className="w-full">
              <Button variant="outline" className="w-full">
                Se connecter
              </Button>
            </Link>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const posts: { title: string; href: string; description: string }[] = [
  {
    title: "1er post",
    href: "/posts/1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore repudiandae deleniti ducimus suscipit, molestiae ullam?",
  },
  {
    title: "2eme post",
    href: "/posts/1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore repudiandae deleniti ducimus suscipit, molestiae ullam?",
  },
  {
    title: "3eme post",
    href: "/posts/1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore repudiandae deleniti ducimus suscipit, molestiae ullam?",
  },
  {
    title: "4eme post",
    href: "/posts/1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore repudiandae deleniti ducimus suscipit, molestiae ullam?",
  },
  {
    title: "5eme post",
    href: "/posts/1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore repudiandae deleniti ducimus suscipit, molestiae ullam?",
  },
  {
    title: "6eme post",
    href: "/posts/1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore repudiandae deleniti ducimus suscipit, molestiae ullam?",
  },
];

export function Navigation() {
  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {posts.map((post) => (
                <ListItem key={post.title} title={post.title} href={post.href}>
                  {post.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/wiki">Wiki</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

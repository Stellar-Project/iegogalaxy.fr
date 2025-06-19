import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const NavBar = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  const user = session ? session.user : null;

  const links = [
    {
      url: "/",
      label: "Home",
    },
    {
      url: "/about",
      label: "About",
    },
    {
      url: "/contact",
      label: "Contact",
    },
  ];

  return (
    <header className="w-full py-4 bg-white fixed top-0 left-0 border-b border-gray-300 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="w-1/3">
          <Link href={"/"} className="w-fit">
            IE
          </Link>
        </div>

        <ul className="flex gap-4 w-1/3 justify-center">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex w-1/3 justify-end">
          {user ? (
            <a className={buttonVariants()} href="/admin">
              Dashboard
            </a>
          ) : (
            <a className={buttonVariants()} href="/sign-in">
              Sign-In
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;

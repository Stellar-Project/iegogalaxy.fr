"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

export function NavBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full px-6 md:px-8 py-4 border-b border-gray-700 bg-neutral-950 text-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-16 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-10 items-center text-lg font-semibold">
              <NavigationMenuItem>
                <Link to="/" className="hover:text-white text-gray-200">
                  Accueil
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className="hover:text-white text-gray-200">
                  À propos
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/wiki" className="hover:text-white text-gray-200">
                  Wiki
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/telechargement"
                  className="hover:text-white text-gray-200"
                >
                  Téléchargement
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 w-full bg-neutral-950 flex flex-col gap-2 px-6 py-4 z-40"
        >
          <Link
            to="/"
            className="w-full text-gray-200 hover:text-white py-2 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/about"
            className="w-full text-gray-200 hover:text-white py-2 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            À propos
          </Link>
          <Link
            to="/wiki"
            className="w-full text-gray-200 hover:text-white py-2 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Wiki
          </Link>
          <Link
            to="/telechargement"
            className="w-full text-gray-200 hover:text-white py-2 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Téléchargement
          </Link>
        </div>
      )}
    </header>
  );
}

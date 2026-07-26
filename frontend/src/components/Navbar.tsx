import { useState, useEffect } from "react";
import { Menu, Github, Twitter, Youtube, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchDialog from "@/components/SearchDialog";

type NavItem = {
  name: string;
  href: string;
  imgOff: string;
  imgOn: string;
};

const navLinks: NavItem[] = [
  {
    name: "Accueil",
    href: "/",
    imgOff: "/assets/nav/home_off.png",
    imgOn: "/assets/nav/home_on.png",
  },
  {
    name: "Wiki",
    href: "/wiki",
    imgOff: "/assets/nav/wiki_off.png",
    imgOn: "/assets/nav/wiki_on.png",
  },
  {
    name: "Tutoriel",
    href: "/tutoriel",
    imgOff: "/assets/nav/tutorial_off.png",
    imgOn: "/assets/nav/tutorial_on.png",
  },
  {
    name: "A Propos",
    href: "/apropos",
    imgOff: "/assets/nav/about_off.png",
    imgOn: "/assets/nav/about_on.png",
  },
  {
    name: "Téléchargement",
    href: "/telechargement",
    imgOff: "/assets/nav/download_off.png",
    imgOn: "/assets/nav/download_on.png",
  },
];

const NavGameButton = ({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={item.href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="transition-transform active:scale-95 block"
    >
      <img
        src={isActive || isHovered ? item.imgOn : item.imgOff}
        alt={item.name}
        className="h-12 w-auto object-contain transition-all duration-200"
      />
    </a>
  );
};

export const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("#home");
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setCurrentPath(href);
    setIsOpen(false);
  };

  return (
    <div className="w-full z-50 flex flex-col">
      <div className="bg-black text-white h-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 text-sm border-b border-white/10 relative z-30">
        <div className="shrink-0">
          <span className="text-white font-semibold">Stellar-Project</span>
          {/* <img
            src="/assets/team_logo.png"
            alt="Team Logo"
            className="h-8 w-auto object-contain"
          /> */}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(true)} className="text-gray-400 hover:text-white transition-colors" title="Rechercher (Ctrl+K)">
            <Search size={18} />
          </button>
          <a
            href="https://x.com/INEGGSNBBFR"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 text-gray-400"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://github.com/Stellar-Project"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white text-gray-400"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.youtube.com/channel/UClqF38koy3zeCTdFDkEIXbg"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-500 text-gray-400"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>

      <nav className="relative w-full border-b border-white/10 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: "url('/assets/global/bg/bg_repeat.png')",
              backgroundRepeat: "repeat",
              backgroundPosition: "center top",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div
              className="shrink-0 cursor-pointer pt-2"
              onClick={() => handleNavClick("#home")}
            >
              <a href="/">
                <img
                  src="/assets/pages/home/SN_BB_Logo_HD.png"
                  alt="Inazuma Eleven Go Galaxy FR"
                  className="h-[70px] w-auto object-contain"
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavGameButton
                  key={link.name}
                  item={link}
                  isActive={currentPath === link.href}
                  onClick={() => handleNavClick(link.href)}
                />
              ))}
            </div>

            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-8 w-8" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-slate-950 border-l border-white/10 text-white w-[300px]"
                >
                  <div className="flex flex-col items-center space-y-6 mt-10">
                    {navLinks.map((link) => (
                      <NavGameButton
                        key={link.name}
                        item={link}
                        isActive={currentPath === link.href}
                        onClick={() => handleNavClick(link.href)}
                      />
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Globe, Share2, Video, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import SearchDialog from "@/components/SearchDialog";

type NavItem = {
  name: string;
  href: string;
  imgOff?: string;
  imgOn?: string;
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
    name: "Jeux & Mods",
    href: "/jeux",
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
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!item.imgOff || !item.imgOn) {
    return (
      <Link
        to={item.href}
        onClick={onClick}
        className={`shrink-0 px-3 py-1.5 rounded-lg font-black text-sm tracking-tight transition-colors cursor-pointer ${
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <Link
      to={item.href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="transition-transform duration-150 active:scale-95 block shrink-0 cursor-pointer"
    >
      <img
        src={isActive || isHovered ? item.imgOn : item.imgOff}
        alt={item.name}
        className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-all duration-200"
      />
    </Link>
  );
};

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="w-full z-50 flex flex-col sticky top-0">
        <div className="bg-card text-foreground border-b border-border/80">
          <div className="max-w-7xl mx-auto h-9 sm:h-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 text-xs sm:text-sm">
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-primary font-mono font-black tracking-tight">STELLAR</span>
              <span className="text-muted-foreground text-[11px] font-black tracking-wider uppercase hidden sm:inline-block">
                • Project
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <Search size={14} />
                <span className="hidden sm:inline">Recherche</span>
                <kbd className="hidden sm:inline-flex text-[10px] font-mono font-black bg-secondary px-1.5 py-0.5 rounded border border-border">
                  ⌘K
                </kbd>
              </Button>

              <div className="h-3 w-px bg-border/80" />

              <div className="flex items-center gap-2 sm:gap-2.5 text-muted-foreground">
                <a
                  href="https://x.com/INEGGSNBBFR"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="hover:text-primary transition-colors p-1 cursor-pointer"
                >
                  <Globe size={15} />
                </a>
                <a
                  href="https://github.com/Stellar-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-foreground transition-colors p-1 cursor-pointer"
                >
                  <Share2 size={15} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UClqF38koy3zeCTdFDkEIXbg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:text-destructive transition-colors p-1 cursor-pointer"
                >
                  <Video size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <nav className="relative w-full border-b border-border/80 bg-background overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "url('/assets/global/bg/bg_repeat.png')",
                backgroundRepeat: "repeat",
                backgroundPosition: "center top",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/90 to-background" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 sm:h-24">
              <div className="shrink-0 flex items-center">
                <Link to="/" className="inline-block py-2 cursor-pointer">
                  <img
                    src="/assets/pages/home/SN_BB_Logo_HD.png"
                    alt="Inazuma Eleven GO Galaxy FR"
                    className="h-14 sm:h-16 md:h-17 w-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-5">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(link.href);

                  return (
                    <NavGameButton
                      key={link.name}
                      item={link}
                      isActive={isActive}
                    />
                  );
                })}
              </div>

              <div className="md:hidden flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="text-foreground h-9 w-9 cursor-pointer"
                  aria-label="Recherche"
                >
                  <Search size={20} />
                </Button>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-foreground h-9 w-9 cursor-pointer"
                      aria-label="Menu de navigation"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="bg-card border-l border-border text-foreground w-70 p-6"
                  >
                    <SheetTitle className="text-base font-black text-foreground mb-6">
                      Navigation
                    </SheetTitle>
                    <div className="flex flex-col items-center space-y-5">
                      {navLinks.map((link) => {
                        const isActive =
                          link.href === "/"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(link.href);

                        return (
                          <NavGameButton
                            key={link.name}
                            item={link}
                            isActive={isActive}
                            onClick={() => setIsOpen(false)}
                          />
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
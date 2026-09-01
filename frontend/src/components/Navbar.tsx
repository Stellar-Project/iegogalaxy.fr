import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Globe, Share2, Video, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import SearchDialog from "@/components/SearchDialog"

type NavItem = {
  name: string
  href: string
  imgOff?: string
  imgOn?: string
}

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
]

const NavGameButton = ({
  item,
  isActive,
  onClick,
}: {
  item: NavItem
  isActive: boolean
  onClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)

  if (!item.imgOff || !item.imgOn) {
    return (
      <Link
        to={item.href}
        onClick={onClick}
        className={`shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-sm font-black tracking-tight transition-colors ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
      >
        {item.name}
      </Link>
    )
  }

  return (
    <Link
      to={item.href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block shrink-0 cursor-pointer transition-transform duration-150 active:scale-95"
    >
      <img
        src={isActive || isHovered ? item.imgOn : item.imgOff}
        alt={item.name}
        className="h-10 w-auto object-contain transition-all duration-200 sm:h-11 md:h-12"
      />
    </Link>
  )
}

export const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full flex-col">
        <div className="border-b border-border/80 bg-card text-foreground">
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:h-10 sm:px-6 sm:text-sm lg:px-8">
            <div className="flex shrink-0 items-center gap-2">
              <span className="font-mono font-black tracking-tight text-primary">
                STELLAR
              </span>
              <span className="hidden text-[11px] font-black tracking-wider text-muted-foreground uppercase sm:inline-block">
                • Project
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="flex h-7 cursor-pointer items-center gap-1.5 px-2.5 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Search size={14} />
                <span className="hidden sm:inline">Recherche</span>
                <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-black sm:inline-flex">
                  ⌘K
                </kbd>
              </Button>

              <div className="h-3 w-px bg-border/80" />

              <div className="flex items-center gap-2 text-muted-foreground sm:gap-2.5">
                <a
                  href="https://x.com/INEGGSNBBFR"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="cursor-pointer p-1 transition-colors hover:text-primary"
                >
                  <Globe size={15} />
                </a>
                <a
                  href="https://github.com/Stellar-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="cursor-pointer p-1 transition-colors hover:text-foreground"
                >
                  <Share2 size={15} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UClqF38koy3zeCTdFDkEIXbg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="cursor-pointer p-1 transition-colors hover:text-destructive"
                >
                  <Video size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <nav className="relative w-full overflow-hidden border-b border-border/80 bg-background">
          <div className="pointer-events-none absolute inset-0 z-0">
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

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between sm:h-24">
              <div className="flex shrink-0 items-center">
                <Link to="/" className="inline-block cursor-pointer py-2">
                  <img
                    src="/assets/pages/home/SN_BB_Logo_HD.png"
                    alt="Inazuma Eleven GO Galaxy FR"
                    className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-16 md:h-17"
                  />
                </Link>
              </div>

              <div className="hidden items-center gap-3 md:flex lg:gap-4 xl:gap-5">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(link.href)

                  return (
                    <NavGameButton
                      key={link.name}
                      item={link}
                      isActive={isActive}
                    />
                  )
                })}
              </div>

              <div className="flex items-center gap-2 md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  className="h-9 w-9 cursor-pointer text-foreground"
                  aria-label="Recherche"
                >
                  <Search size={20} />
                </Button>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 cursor-pointer text-foreground"
                      aria-label="Menu de navigation"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-70 border-l border-border bg-card p-6 text-foreground"
                  >
                    <SheetTitle className="mb-6 text-base font-black text-foreground">
                      Navigation
                    </SheetTitle>
                    <div className="flex flex-col items-center space-y-5">
                      {navLinks.map((link) => {
                        const isActive =
                          link.href === "/"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(link.href)

                        return (
                          <NavGameButton
                            key={link.name}
                            item={link}
                            isActive={isActive}
                            onClick={() => setIsOpen(false)}
                          />
                        )
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
  )
}

export default Navbar

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Share2, Video, Heart, Code2, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/api/client";
import type { SiteConfig } from "@/api/types";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const websiteVersion = import.meta.env.VITE_APP_VERSION || "v1.0";
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.getConfig()
      .then((data) => {
        if (isMounted) setConfig(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const socialLinks = [
    {
      icon: Globe,
      href: "https://x.com/INEGGSNBBFR",
      colorClass: "hover:text-primary hover:bg-primary/10",
      label: "Twitter / X",
    },
    {
      icon: Share2,
      href: "https://github.com/Stellar-Project",
      colorClass: "hover:text-foreground hover:bg-secondary",
      label: "GitHub",
    },
    {
      icon: Video,
      href: "https://www.youtube.com/channel/UClqF38koy3zeCTdFDkEIXbg",
      colorClass: "hover:text-destructive hover:bg-destructive/10",
      label: "YouTube",
    },
    {
      icon: Rss,
      href: "/rss.xml",
      colorClass: "hover:text-accent hover:bg-accent/10",
      label: "Flux RSS",
    },
  ];

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Wiki & Outils", href: "/wiki" },
    { label: "Tutoriels", href: "/tutoriel" },
    { label: "À Propos", href: "/apropos" },
    { label: "Téléchargements", href: "/telechargement" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ];

  return (
    <footer className="relative bg-background text-muted-foreground text-sm overflow-hidden z-20 border-t border-border">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/assets/global/bg/bg_repeat.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/95" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="space-y-4">
              <Link to="/" className="inline-block cursor-pointer">
                <img
                  src="/assets/pages/home/SN_BB_Logo_HD.png"
                  alt="Inazuma Eleven GO Galaxy"
                  className="h-20 sm:h-24 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
                />
              </Link>
              <p className="leading-relaxed text-muted-foreground text-xs sm:text-sm">
                Le patch de traduction française complet pour Inazuma Eleven GO Galaxy. Redécouvrez l'aventure spatiale sur Nintendo 3DS sans barrière de langue.
              </p>
              <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                Inazuma Eleven est une marque déposée de <strong className="text-foreground/80 font-black">Level-5 Inc.</strong> Projet bénévole à but non lucratif réalisé par la communauté.
              </p>
            </div>

            <div>
              <h3 className="text-foreground font-black text-base mb-4 tracking-tight">Navigation</h3>
              <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm inline-block py-0.5 cursor-pointer font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start md:items-end space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-foreground font-black tracking-tight">Stellar-Project</span>
              </div>
              <p className="text-left md:text-right text-muted-foreground text-xs">
                Suivez les actualités et les mises à jour du projet sur nos plateformes :
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`h-9 w-9 bg-card border-border text-foreground transition-all duration-300 cursor-pointer shadow-xs ${social.colorClass}`}
                    asChild
                  >
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
              <p className="text-muted-foreground text-xs font-mono font-black">
                Site {websiteVersion} — Patch {config?.patchVersion || "1.0.0"}
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p className="text-muted-foreground font-medium">
              © {currentYear} Stellar Project. Tous droits réservés.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <span>Fait avec</span>
                <Heart size={13} className="text-destructive fill-destructive animate-pulse" />
                <span>par la communauté</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Code2 size={13} className="text-primary" />
                <div className="flex gap-1.5">
                  <Badge variant="outline" className="border-border text-muted-foreground bg-secondary/50 text-[10px] font-mono font-black px-2 py-0">
                    React
                  </Badge>
                  <Badge variant="outline" className="border-border text-muted-foreground bg-secondary/50 text-[10px] font-mono font-black px-2 py-0">
                    Tailwind
                  </Badge>
                  <Badge variant="outline" className="border-border text-muted-foreground bg-secondary/50 text-[10px] font-mono font-black px-2 py-0">
                    Vite
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
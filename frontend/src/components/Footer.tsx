import { Github, Twitter, Youtube, Heart, Code2, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useConfig } from "@/api/useData";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const websiteVersion = import.meta.env.VITE_APP_VERSION || "dev";
  const { data: config } = useConfig();

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/INEGGSNBBFR", colorClass: "hover:text-blue-400 hover:bg-blue-400/10", label: "Twitter" },
    { icon: Github, href: "https://github.com/Stellar-Project", colorClass: "hover:text-white hover:bg-white/10", label: "GitHub" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UClqF38koy3zeCTdFDkEIXbg", colorClass: "hover:text-red-500 hover:bg-red-500/10", label: "YouTube" },
  ];

  return (
    <footer className="relative bg-slate-950 text-slate-400 text-sm overflow-hidden z-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url('/assets/global/bg/bg_repeat.png')", backgroundRepeat: "repeat", backgroundPosition: "center top" }} />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
      </div>

      <div className="relative z-10">
        <Separator className="bg-white/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <img src="/assets/pages/home/SN_BB_Logo_HD.png" alt="Inazuma Eleven Go Galaxy" className="h-24 w-auto object-contain opacity-90" />
              <p className="leading-relaxed text-slate-500">
                Le patch de traduction française complet pour Inazuma Eleven GO Galaxy. Redécouvrez l'aventure spatiale sans barrière de langue.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2">
                {[
                  { label: "Accueil", href: "/" },
                  { label: "Wiki", href: "/wiki" },
                  { label: "Tutoriel", href: "/tutoriel" },
                  { label: "A Propos", href: "/apropos" },
                  { label: "Téléchargement", href: "/telechargement" },
                ].map((link) => (
                  <li key={link.href}>
                    <Button variant="link" className="p-0 h-auto text-slate-400 hover:text-yellow-400 transition-colors" asChild>
                      <a href={link.href}>{link.label}</a>
                    </Button>
                  </li>
                ))}
                <li><a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-slate-500 hover:text-orange-400 hover:border-orange-500/30 transition-all"><Rss size={18} /></a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Mentions Légales</h3>
              <ul className="space-y-2 text-slate-500">
                <li>Inazuma Eleven est une marque déposée de <strong className="text-slate-400">Level-5 Inc.</strong></li>
                <li>Ce projet est un fan-made à but non lucratif.</li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-slate-500 hover:text-white underline decoration-slate-700 underline-offset-4" asChild>
                    <a href="/mentions-legales">Politique de confidentialité</a>
                  </Button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start md:items-end space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">Stellar-Project</span>
              </div>
              <p className="text-right text-slate-500 hidden md:block">Suivez-nous sur nos réseaux</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button key={index} variant="outline" size="icon" className={`bg-slate-900 border-white/5 text-slate-300 transition-all duration-300 hover:scale-110 hover:border-white/10 ${social.colorClass}`} asChild>
                    <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
              <p className="text-slate-500 text-xs">Site v{websiteVersion} — Patch {config.patchVersion || "?"}</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
            <p>© {currentYear} Stellar Project. Tous droits réservés.</p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <div className="flex items-center gap-2 text-slate-500">
                <span>Fait avec</span>
                <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
                <span>par la communauté.</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-blue-400" />
                <span className="text-slate-500">Propulsé par</span>
                <div className="flex gap-2">
                  <Badge variant="outline" className="border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 text-[10px]">React</Badge>
                  <Badge variant="outline" className="border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 text-[10px]">Tailwind</Badge>
                  <Badge variant="outline" className="border-white/10 text-slate-400 bg-white/5 hover:bg-white/10 text-[10px]">Vite</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

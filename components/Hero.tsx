import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Book } from "lucide-react";
import { BackgroundPattern } from "./background-pattern";

export const Hero = () => {
  return (
    <div className="h-screen flex items-center justify-center px-6 overflow-hidden z-0">

      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-2xl">
        <Badge variant="outline">
          La version 1.0.0 vient d&apos;être publiée
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Suivez les mises à jour d’Inazuma Eleven DS
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Patches, correctifs et améliorations : restez informé sur l’évolution
          du jeu et des projets communautaires.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="text-base cursor-pointer">
            Lire le plus récent <ArrowUpRight className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base shadow-none cursor-pointer"
          >
            <Book className="size-5" /> Lire le Wiki
          </Button>
        </div>
      </div>
    </div>
  );
};

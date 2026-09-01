import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeta } from "@/lib/useMeta";

export default function NotFound() {
  const navigate = useNavigate();

  useMeta({
    title: "Page introuvable (404)",
    description: "La page demandée n'existe pas ou a été déplacée.",
  });

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-foreground bg-background overflow-hidden px-4 py-16 text-center">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/assets/global/bg/bg_repeat.png')",
          backgroundRepeat: "repeat",
          backgroundPosition: "center top",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <span className="text-[7rem] sm:text-[10rem] md:text-[12rem] leading-none font-black text-foreground select-none tracking-tighter">
          404
        </span>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            Oups ! Ton tir est sorti du terrain
          </h1>

          <p className="text-muted-foreground text-sm sm:text-lg max-w-md mx-auto leading-relaxed">
            Coup de sifflet de l'arbitre ! La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4 w-full sm:w-auto">
          <Button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }}
            variant="outline"
            className="w-full sm:w-auto text-foreground border-border hover:bg-secondary hover:text-foreground h-11 px-6 text-sm font-black cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour en arrière
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-black h-11 px-6 text-sm cursor-pointer"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Revenir à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

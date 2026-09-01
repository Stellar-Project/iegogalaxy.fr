import { motion } from "framer-motion";
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
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/assets/global/bg/bg_repeat.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)/0.08,transparent_65%)]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
        >
          <span className="text-[7rem] sm:text-[10rem] md:text-[12rem] leading-none font-black text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground/70 to-muted-foreground/20 drop-shadow-2xl select-none tracking-tighter">
            404
          </span>
        </motion.div>

        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl sm:text-4xl font-black text-foreground tracking-tight"
          >
            Oups ! Ton tir est sorti du terrain
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground text-sm sm:text-lg max-w-md mx-auto leading-relaxed"
          >
            Coup de sifflet de l'arbitre ! La page que vous cherchez n'existe pas ou a été déplacée.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 pt-4 w-full sm:w-auto"
        >
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
            className="w-full sm:w-auto text-foreground border-border hover:bg-secondary hover:text-foreground h-11 px-6 text-sm font-black cursor-pointer shadow-xs transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour en arrière
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-black h-11 px-6 text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Revenir à l'accueil
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
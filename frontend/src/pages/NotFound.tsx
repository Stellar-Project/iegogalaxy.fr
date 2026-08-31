import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-slate-200 bg-background overflow-hidden px-4 text-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/assets/global/bg/bg_repeat.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.05),transparent_60%)]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        >
          <h1 className="text-[8rem] md:text-[12rem] leading-none font-extrabold text-transparent bg-clip-text bg-linear-to-b from-white to-slate-600 drop-shadow-2xl select-none">
            404
          </h1>
        </motion.div>

        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-bold text-yellow-400"
          >
            Oups ! Ton tir est sorti du terrain
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl"
          >
            Coup de sifflet ! Cette page est signalée hors-jeu.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <Button
            onClick={() => { if (window.history.length > 1) navigate(-1); else navigate("/"); }}
            variant="outline"
            className="text-white border-yellow-500/30 hover:bg-yellow-500/10 h-12 px-8 text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour en arrière
          </Button>

          <Button
            asChild
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-12 px-8 text-base shadow-lg shadow-yellow-500/10"
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

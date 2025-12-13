import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Unavailable() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-slate-200 bg-slate-950 overflow-hidden px-4 text-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/assets/bg/bg_repeat.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/80 to-slate-950" />
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.08),transparent_60%)]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="relative"
        >
          <Construction className="h-24 w-24 md:h-32 md:w-32 text-yellow-500 mb-4 mx-auto opacity-80" />
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
            Wiki
          </h1>
        </motion.div>

        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-yellow-400"
          >
            En construction
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg mx-auto"
          >
            Le Wiki d’
            <strong className="text-slate-200">
              Inazuma Eleven GO Galaxy
            </strong>{" "}
            n’est pas encore disponible. Il sera bientôt prêt pour dévoiler
            toutes les ressources, outils et guides !
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Button
            onClick={() => navigate(-1)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-12 px-8 text-base shadow-lg shadow-yellow-500/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour en arrière
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden bg-gradient-to-b from-blue-950 via-black to-indigo-900 px-4 text-center">
      <div
        className="absolute inset-0 bg-[url('/images/block.png')] bg-cover bg-center opacity-20 z-0"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] z-0"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[8rem] md:text-[12rem] font-extrabold drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] select-none"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-4"
        >
          Oups ! Ton tir est sorti du terrain
        </motion.p>

        <p className="mb-8 max-w-md text-gray-300">
          La page que tu cherches semble avoir disparu dans une tornade Inazuma.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-md transition-transform hover:scale-105"
        >
          Retour à l&apos;accueil
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-500/10 to-transparent blur-3xl z-0" />
    </div>
  );
}

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { usePatches } from "@/api/useData";

export function CurrentChangelog() {
  const { data: patches } = usePatches();
  const currentPatch = patches.find((p) => p.isLatest) || patches[0];

  if (!currentPatch) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mt-12 mb-8 px-4"
    >
      <div className="bg-slate-900/40 backdrop-blur-md border border-blue-500/20 rounded-2xl overflow-hidden relative group hover:border-blue-500/30 transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

        <div className="absolute -left-10 -top-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
              <Sparkles size={20} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Nouveautés de la version {currentPatch.version}
            </h3>
          </div>

          <div className="grid gap-4">
            {currentPatch.changelog.map((change, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-3 group/item"
              >
                <CheckCircle2
                  size={18}
                  className="text-blue-500/70 mt-0.5 shrink-0 group-hover/item:text-blue-400 transition-colors"
                />
                <span className="text-slate-300 text-sm md:text-base leading-relaxed group-hover/item:text-slate-200 transition-colors">
                  {change}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-500">
            <AlertCircle size={12} />
            <span>
              Note : Ce projet est une création de fans à but non lucratif. Tous
              les droits appartiennent à Level-5.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

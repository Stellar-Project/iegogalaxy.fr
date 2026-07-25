import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

export function ImageModal({ src, onClose }: ImageModalProps) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors p-2 z-50"
            onClick={onClose}
          >
            <X size={40} />
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={src}
            alt="Aperçu Fullscreen"
            className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

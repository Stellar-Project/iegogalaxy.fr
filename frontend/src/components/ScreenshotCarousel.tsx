import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useScreenshots } from "@/api/useData";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface ScreenshotCarouselProps {
  onSelect: (src: string) => void;
}

export function ScreenshotCarousel({ onSelect }: ScreenshotCarouselProps) {
  const { data: screenshots } = useScreenshots();
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = screenshots.length > 0 ? Math.abs(page % screenshots.length) : 0;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <section className="relative z-10 py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
          Aperçu In-Game
        </h2>

        <div className="relative w-full aspect-video md:aspect-2400/1350 max-w-4xl mx-auto bg-slate-900/50 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={screenshots[imageIndex]?.imageUrl}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              onClick={() => screenshots[imageIndex] && onSelect(screenshots[imageIndex].imageUrl)}
              className="absolute inset-0 w-full h-full object-contain cursor-grab active:cursor-grabbing"
              alt="Gameplay Screenshot"
            />
          </AnimatePresence>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-2 md:px-4 z-10">
            <button
              className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 backdrop-blur-sm transition-all hover:scale-110"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 backdrop-blur-sm transition-all hover:scale-110"
              onClick={() => paginate(1)}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {screenshots.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === imageIndex ? "w-8 bg-blue-500" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          <div className="absolute inset-0 pointer-events-none flex items-end justify-end p-4 opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
              <ZoomIn size={14} /> Cliquer pour agrandir
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

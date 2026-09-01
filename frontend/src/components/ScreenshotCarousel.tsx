import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon } from "lucide-react";
import { api } from "@/api/client";
import type { Screenshot } from "@/api/types";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 800 : -800,
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
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    let isMounted = true;
    api
      .getScreenshots()
      .then((data) => {
        if (isMounted) {
          setScreenshots(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const imageIndex =
    screenshots.length > 0
      ? ((page % screenshots.length) + screenshots.length) % screenshots.length
      : 0;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const goToSlide = (index: number) => {
    const diff = index - imageIndex;
    if (diff !== 0) {
      setPage([page + diff, diff > 0 ? 1 : -1]);
    }
  };

  useEffect(() => {
    if (screenshots.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 4000);

    return () => clearInterval(timer);
  }, [paginate, screenshots.length, isPaused]);

  if (loading || screenshots.length === 0) return null;

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="border-l-4 border-supernova pl-4 space-y-1">
          <div className="flex items-center gap-1.5 text-supernova text-xs font-black uppercase tracking-wider">
            <ImageIcon size={13} />
            Galerie Visuelle
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Aperçu In-Game
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Découvrez la traduction française en action directement sur les dialogues, menus et cinématiques.
          </p>
        </div>

        <div
          className="relative w-full aspect-video md:aspect-video max-w-4xl mx-auto bg-background rounded-lg overflow-hidden border border-border group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
                x: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.25 },
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
              onClick={() =>
                screenshots[imageIndex] &&
                onSelect(screenshots[imageIndex].imageUrl)
              }
              className="absolute inset-0 w-full h-full object-contain cursor-grab active:cursor-grabbing select-none"
              alt={`Capture de jeu ${imageIndex + 1}`}
            />
          </AnimatePresence>

          <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-3 sm:px-5 z-10">
            <button
              type="button"
              className="pointer-events-auto bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground rounded-full p-2.5 sm:p-3 border border-border transition-colors cursor-pointer"
              onClick={() => paginate(-1)}
              aria-label="Image précédente"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="pointer-events-auto bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground rounded-full p-2.5 sm:p-3 border border-border transition-colors cursor-pointer"
              onClick={() => paginate(1)}
              aria-label="Image suivante"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <div className="bg-background border border-border px-3 py-1.5 rounded-full text-xs text-foreground font-medium flex items-center gap-1.5">
              <ZoomIn size={14} className="text-primary" /> Cliquer pour agrandir
            </div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 z-10">
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Aller à la capture ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === imageIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
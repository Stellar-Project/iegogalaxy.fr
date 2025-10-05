"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number; // en ms
  height?: string; // ex: "500px" ou "70vh"
}

export default function Carousel({
  images,
  autoPlay = true,
  interval = 5000,
  height = "500px",
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      next();
    }, interval);
    return () => clearInterval(timer);
  }, [index, autoPlay, interval]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Parallax léger sur scroll
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div
      ref={carouselRef}
      className="relative w-full overflow-hidden rounded-2xl shadow-lg"
      style={{ height }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="w-full h-full max-h-full object-contain rounded-2xl"
          loading="lazy"
          style={{ y: yParallax }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl pointer-events-none" />

      {/* Flèches */}
      <button
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ScreenshotCarousel } from "@/components/screenshot-carousel";
import { ImageModal } from "@/components/image-modal";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  return (
    <main className="relative min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/90 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <HeroSection />
      <AboutSection />
      <ScreenshotCarousel onSelect={setSelectedImage} />

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  );
}

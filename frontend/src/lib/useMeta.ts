import { useEffect } from "react";

interface MetaOptions {
  title?: string;
  description?: string;
  image?: string;
}

const defaults = {
  title: "Stellar Project — Traduction française Inazuma Eleven GO Galaxy",
  description:
    "Projet de traduction française des jeux Inazuma Eleven GO Galaxy (Supernova & Big Bang). Patches, outils, tutoriels et ressources.",
  image: "/assets/pages/home/SN_BB_Logo_HD.png",
};

export function useMeta({ title: pageTitle, description: pageDescription, image: pageImage }: MetaOptions = {}) {
  useEffect(() => {
    const fullTitle = pageTitle ? `${pageTitle} — Stellar Project` : defaults.title;
    const finalDescription = pageDescription || defaults.description;
    
    const rawImage = pageImage || defaults.image;
    const finalImage = rawImage.startsWith("http")
      ? rawImage
      : `${window.location.origin}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

    document.title = fullTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(
        `meta[name="${name}"], meta[property="${name}"]`
      ) as HTMLMetaElement | null;

      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;

    setMeta("description", finalDescription);
    setMeta("og:title", fullTitle);
    setMeta("og:description", finalDescription);
    setMeta("og:image", finalImage);
    setMeta("og:type", "website");
    setMeta("og:url", window.location.href);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", finalDescription);
    setMeta("twitter:image", finalImage);

    return () => {
      document.title = defaults.title;
    };
  }, [pageTitle, pageDescription, pageImage]);
}
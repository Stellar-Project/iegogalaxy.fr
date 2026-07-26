import { useEffect } from "react";

const defaults = {
  title: "Stellar Project — Traduction française Inazuma Eleven GO Galaxy",
  description: "Projet de traduction française des jeux Inazuma Eleven GO Galaxy (Supernova & Big Bang). Patches, outils, tutoriels et ressources.",
  image: "/assets/pages/home/SN_BB_Logo_HD.png",
};

export function useMeta(overrides: { title?: string; description?: string; image?: string }) {
  useEffect(() => {
    const title = overrides.title ? `${overrides.title} — Stellar Project` : defaults.title;
    const description = overrides.description || defaults.description;
    const image = overrides.image || defaults.image;

    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(name.startsWith("og:") ? "property" : "name", name); document.head.appendChild(el); }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", image);
    setMeta("og:type", "website");
    setMeta("og:url", window.location.href);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [overrides.title, overrides.description, overrides.image]);
}

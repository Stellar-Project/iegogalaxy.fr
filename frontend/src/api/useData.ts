import { useState, useEffect } from "react";
import { api } from "./client";
import { PATCH_HISTORY as FALLBACK_PATCHES } from "@/lib/patch-data";
import { HERO_BACKGROUNDS as FALLBACK_HERO, SCREENSHOTS as FALLBACK_SCREENSHOTS } from "@/lib/constants";
import type { PatchVersion, Screenshot, HeroBackground, TeamMember, TimelineEvent, Credit, WikiTool, SiteConfig } from "./types";

function useFetch<T>(fetcher: () => Promise<T>, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetcher().then(setData).catch(() => {}).finally(() => setLoading(false));
  }, []);
  return { data, loading };
}

export function usePatches() {
  return useFetch(api.getPatches, FALLBACK_PATCHES.map((p) => ({
    id: "", version: p.version, date: p.date, size: p.size,
    supernovaLink: p.links.supernova, bigbangLink: p.links.bigbang,
    changelog: p.changelog, isLatest: false, createdAt: "", updatedAt: "",
  })));
}

export function useScreenshots() {
  return useFetch(api.getScreenshots, FALLBACK_SCREENSHOTS.map((url, i) => ({ id: "", imageUrl: url, sortOrder: i })));
}

export function useHeroBackgrounds() {
  return useFetch(api.getHero, FALLBACK_HERO.map((url, i) => ({ id: "", imageUrl: url, sortOrder: i })));
}

export function useTeam() {
  return useFetch(api.getTeam, [
    { id: "", name: "Rinzler", role: "Chef de Projet", category: "lead", discordId: "590070698140237826", avatarUrl: null, sortOrder: 0 },
    { id: "", name: "gwen9p1", role: "Traduction & Correction", category: "trans", discordId: "1245424439420780633", avatarUrl: null, sortOrder: 1 },
    { id: "", name: "Hydra", role: "Voix FR & Traduction", category: "trans", discordId: "1061296038650052688", avatarUrl: null, sortOrder: 2 },
  ]);
}

export function useTimeline() {
  return useFetch(api.getTimeline, [
    { id: "", date: "Janvier 2024", title: "Lancement du Projet", description: "Début de l'aventure et analyse des fichiers du jeu.", sortOrder: 0 },
    { id: "", date: "Juin 2024", title: "Première version du patch", description: "Sortie de la première version jouable pour tous.", sortOrder: 1 },
    { id: "", date: "Septembre 2024", title: "Pause du Projet", description: "Mise en pause du projet due à des raisons personnelles.", sortOrder: 2 },
    { id: "", date: "Décembre 2025", title: "Reprise du Projet", description: "Reprise du projet suite à la pause.", sortOrder: 3 },
  ]);
}

export function useCredits() {
  return useFetch(api.getCredits, [
    { id: "", category: "Graphismes & Visuels", personName: "Rinzler", task: "Création du site internet", socialLink: null, sortOrder: 0 },
    { id: "", category: "Graphismes & Visuels", personName: "Level-10 Team", task: "Partage de leur Logo", socialLink: null, sortOrder: 1 },
    { id: "", category: "Graphismes & Visuels", personName: "gwen9p1", task: "Assets du jeu refait pour le site", socialLink: null, sortOrder: 2 },
    { id: "", category: "Anciens Traducteurs", personName: "Kotei Project", task: "Base technique, icônes et objets", socialLink: null, sortOrder: 0 },
    { id: "", category: "Anciens Traducteurs", personName: "MrFox4", task: "Techniques spéciales et totems", socialLink: null, sortOrder: 1 },
    { id: "", category: "Remerciements Spéciaux", personName: "Level-5", task: "Pour avoir créé cette licence incroyable", socialLink: null, sortOrder: 0 },
    { id: "", category: "Remerciements Spéciaux", personName: "La Communauté", task: "Pour votre soutien indéfectible", socialLink: null, sortOrder: 1 },
  ]);
}

export function useWikiTools() {
  return useFetch(api.getWikiTools, []);
}

export function useConfig() {
  return useFetch(api.getConfig, {
    patchVersion: import.meta.env.VITE_PATCH_VERSION || "1.0",
    patchDate: import.meta.env.VITE_PATCH_DATE || "28 Juin 2024",
    patchSize: import.meta.env.VITE_PATCH_SIZE || "1,08 Go",
    supernovaLink: import.meta.env.VITE_SUPERNOVA_PATCH_LINK || "#",
    bigbangLink: import.meta.env.VITE_BIGBANG_PATCH_LINK || "#",
    supernovaRomLink: "", bigbangRomLink: "", supernovaRomSize: "", bigbangRomSize: "",
    showPatch: true, showRom: false,
  });
}

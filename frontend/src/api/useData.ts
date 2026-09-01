import { useState, useEffect, useCallback } from "react";
import { api } from "./client";
import type {
  PatchVersion,
  Screenshot,
  HeroBackground,
  TeamMember,
  TimelineEvent,
  Credit,
  WikiTool,
  SiteConfig,
} from "./types";

interface UseFetchResult<T> {
  data: T;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function useFetch<T>(fetcher: () => Promise<T>, fallback: T): UseFetchResult<T> {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetcher();
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

export function usePatches() {
  return useFetch<PatchVersion[]>(api.getPatches, []);
}

export function useScreenshots() {
  return useFetch<Screenshot[]>(api.getScreenshots, []);
}

export function useHeroBackgrounds() {
  return useFetch<HeroBackground[]>(api.getHero, []);
}

export function useTeam() {
  return useFetch<TeamMember[]>(api.getTeam, []);
}

export function useTimeline() {
  return useFetch<TimelineEvent[]>(api.getTimeline, []);
}

export function useCredits() {
  return useFetch<Credit[]>(api.getCredits, []);
}

export function useWikiTools() {
  return useFetch<WikiTool[]>(() => api.getWikiTools(), []);
}

export function useConfig() {
  return useFetch<SiteConfig>(api.getConfig, {
    patchVersion: import.meta.env.VITE_PATCH_VERSION || "1.0",
    patchDate: import.meta.env.VITE_PATCH_DATE || "28 Juin 2024",
    patchSize: import.meta.env.VITE_PATCH_SIZE || "1,08 Go",
    supernovaLink: import.meta.env.VITE_SUPERNOVA_PATCH_LINK || "#",
    bigbangLink: import.meta.env.VITE_BIGBANG_PATCH_LINK || "#",
    supernovaRomLink: "",
    bigbangRomLink: "",
    supernovaRomSize: "",
    bigbangRomSize: "",
    showPatch: true,
    showRom: false,
  });
}
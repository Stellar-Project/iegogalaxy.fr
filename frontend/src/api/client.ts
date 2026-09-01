import type {
  PatchVersion,
  TeamMember,
  TimelineEvent,
  Credit,
  Screenshot,
  Post,
  PostInput,
  HeroBackground,
  WikiTool,
  WikiPage,
  SiteConfig,
  AnalyticsStats,
  SearchResults,
  Game,
  FaqItem,
  AdminUser,
} from "./types";

const API_BASE = "/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    credentials: "include",
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Erreur requête (${res.status})`);
  }

  // Gestion des réponses sans contenu (ex: 204 No Content)
  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

export const api = {
  // Patches
  getPatches: () => request<PatchVersion[]>("/patches"),
  getLatestPatch: () => request<PatchVersion>("/patches/latest"),
  getPatch: (id: string) => request<PatchVersion>(`/patches/${id}`),
  createPatch: (data: Partial<PatchVersion>) =>
    request<PatchVersion>("/patches", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updatePatch: (id: string, data: Partial<PatchVersion>) =>
    request<PatchVersion>(`/patches/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deletePatch: (id: string) =>
    request<{ success: boolean }>(`/patches/${id}`, { method: "DELETE" }),
  setLatestPatch: (id: string) =>
    request<PatchVersion>(`/patches/${id}/set-latest`, { method: "PUT" }),

  // Team
  getTeam: () => request<TeamMember[]>("/team"),
  createTeamMember: (data: Partial<TeamMember>) =>
    request<TeamMember>("/team", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTeamMember: (id: string, data: Partial<TeamMember>) =>
    request<TeamMember>(`/team/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteTeamMember: (id: string) =>
    request<{ success: boolean }>(`/team/${id}`, { method: "DELETE" }),

  // Timeline
  getTimeline: () => request<TimelineEvent[]>("/timeline"),
  createTimelineEvent: (data: Partial<TimelineEvent>) =>
    request<TimelineEvent>("/timeline", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateTimelineEvent: (id: string, data: Partial<TimelineEvent>) =>
    request<TimelineEvent>(`/timeline/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteTimelineEvent: (id: string) =>
    request<{ success: boolean }>(`/timeline/${id}`, { method: "DELETE" }),

  // Credits
  getCredits: () => request<Credit[]>("/credits"),
  createCredit: (data: Partial<Credit>) =>
    request<Credit>("/credits", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCredit: (id: string, data: Partial<Credit>) =>
    request<Credit>(`/credits/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteCredit: (id: string) =>
    request<{ success: boolean }>(`/credits/${id}`, { method: "DELETE" }),

  // Screenshots
  getScreenshots: () => request<Screenshot[]>("/screenshots"),
  createScreenshot: (data: Partial<Screenshot>) =>
    request<Screenshot>("/screenshots", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateScreenshot: (id: string, data: Partial<Screenshot>) =>
    request<Screenshot>(`/screenshots/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteScreenshot: (id: string) =>
    request<{ success: boolean }>(`/screenshots/${id}`, { method: "DELETE" }),

  // Blog
  getPosts: (all?: boolean) => request<Post[]>(all ? "/blog/all" : "/blog"),
  getPost: (slug: string) => request<Post>(`/blog/${slug}`),
  createPost: (data: PostInput) =>
    request<Post>("/blog", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updatePost: (id: string, data: Partial<PostInput>) =>
    request<Post>(`/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deletePost: (id: string) =>
    request<{ success: boolean }>(`/blog/${id}`, { method: "DELETE" }),

  // Export
  exportData: () => request<Record<string, unknown>>("/export"),

  // Upload
  uploadFile: async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      credentials: "include",
      body: form,
    });
    if (!res.ok) throw new Error("Échec du téléversement du fichier");
    return res.json() as Promise<{ url: string }>;
  },

  // Hero
  getHero: () => request<HeroBackground[]>("/hero"),
  createHero: (data: Partial<HeroBackground>) =>
    request<HeroBackground>("/hero", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateHero: (id: string, data: Partial<HeroBackground>) =>
    request<HeroBackground>(`/hero/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteHero: (id: string) =>
    request<{ success: boolean }>(`/hero/${id}`, { method: "DELETE" }),

  // Wiki
  getWikiTools: (all?: boolean) =>
    request<WikiTool[]>(`/wiki/tools${all ? "?all=true" : ""}`),
  createWikiTool: (data: Partial<WikiTool>) =>
    request<WikiTool>("/wiki/tools", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateWikiTool: (id: string, data: Partial<WikiTool>) =>
    request<WikiTool>(`/wiki/tools/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteWikiTool: (id: string) =>
    request<{ success: boolean }>(`/wiki/tools/${id}`, { method: "DELETE" }),
  getWikiPages: () => request<WikiPage[]>("/wiki/pages"),
  getWikiPage: (slug: string) => request<WikiPage>(`/wiki/pages/${slug}`),
  createWikiPage: (data: Partial<WikiPage>) =>
    request<WikiPage>("/wiki/pages", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateWikiPage: (id: string, data: Partial<WikiPage>) =>
    request<WikiPage>(`/wiki/pages/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteWikiPage: (id: string) =>
    request<{ success: boolean }>(`/wiki/pages/${id}`, { method: "DELETE" }),

  // Analytics
  getAnalytics: () => request<AnalyticsStats>("/analytics/stats"),
  resetAnalytics: (scope?: "views" | "downloads") =>
    request<{ ok: boolean }>("/analytics/reset", {
      method: "POST",
      body: JSON.stringify({ scope }),
    }),

  // Config
  getConfig: () => request<SiteConfig>("/config"),
  updateConfig: (data: Partial<SiteConfig>) =>
    request<SiteConfig>("/config", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Search
  search: (q: string) =>
    request<SearchResults>(`/search?q=${encodeURIComponent(q)}`),

  // Games
  getGames: () => request<Game[]>("/games"),
  getPublishedGames: () => request<Game[]>("/games/published"),
  getGame: (slug: string) => request<Game>(`/games/${slug}`),
  createGame: (data: Partial<Game>) =>
    request<Game>("/games", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateGame: (id: string, data: Partial<Game>) =>
    request<Game>(`/games/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteGame: (id: string) =>
    request<{ success: boolean }>(`/games/${id}`, { method: "DELETE" }),

  // FAQ
  getFaq: () => request<FaqItem[]>("/faq"),
  getFaqAll: () => request<FaqItem[]>("/faq/all"),
  createFaq: (data: Partial<FaqItem>) =>
    request<FaqItem>("/faq", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateFaq: (id: string, data: Partial<FaqItem>) =>
    request<FaqItem>(`/faq/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteFaq: (id: string) =>
    request<{ success: boolean }>(`/faq/${id}`, { method: "DELETE" }),

  // Users (admin)
  getUsers: () => request<AdminUser[]>("/users"),
  updateUser: (id: string, data: Partial<AdminUser>) =>
    request<AdminUser>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
export interface PatchVersion {
  id: string
  version: string
  date: string
  size: string
  supernovaLink: string | null
  bigbangLink: string | null
  changelog: string[]
  isLatest: boolean
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  category: string
  discordId: string | null
  avatarUrl: string | null
  sortOrder: number
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  sortOrder: number
}

export interface Credit {
  id: string
  category: string
  personName: string
  task: string | null
  socialLink: string | null
  sortOrder: number
}

export interface Screenshot {
  id: string
  imageUrl: string
  sortOrder: number
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published?: boolean;
}

export interface HeroBackground {
  id: string
  imageUrl: string
  sortOrder: number
}

export interface WikiTool {
  id: string
  name: string
  description: string
  imagePath: string | null
  link: string | null
  tags: string[]
  sortOrder: number
  pages?: { id: string; slug: string; title: string }[]
}

export interface WikiPage {
  id: string
  slug: string
  title: string
  content: string
  toolId: string | null
  published: boolean
  tool?: { id: string; name: string } | null
  createdAt: string
  updatedAt: string
}

export interface SiteConfig {
  patchVersion: string;
  patchDate: string;
  patchSize: string;
  supernovaLink: string;
  bigbangLink: string;
  supernovaRomLink?: string;
  bigbangRomLink?: string;
  supernovaRomSize?: string;
  bigbangRomSize?: string;
  showPatch?: boolean;
  showRom?: boolean;
}

export interface AnalyticsStats {
  totalViews: number;
  todayViews: number;
  viewsByPage: { path: string; _count: number }[];
  viewsByDay: { date: string; count: number }[];
  totalDownloads: number;
  downloadsByFile: { file: string; _count: number }[];
  downloadsByDay: { date: string; count: number }[];
  uniqueVisitors: number;
  topReferrers: { referrer: string; _count: number }[];
}

export interface SearchResults {
  pages: { id: string; slug: string; title: string; tool: { name: string } | null }[];
  tools: { id: string; name: string; description: string; imagePath: string | null }[];
  posts: { id: string; slug: string; title: string; excerpt: string | null }[];
}
  id: string
  email: string
  name: string
}

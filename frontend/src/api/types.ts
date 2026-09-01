// ==========================================
// Patchs & Téléchargements
// ==========================================

export interface PatchVersion {
  id: string;
  version: string;
  date: string;
  size: string;
  supernovaLink: string | null;
  bigbangLink: string | null;
  supernovaRomLink: string | null;
  bigbangRomLink: string | null;
  supernovaRomSize: string | null;
  bigbangRomSize: string | null;
  changelog: string[];
  isLatest: boolean;
  createdAt: string;
  updatedAt: string;
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

// ==========================================
// Équipe, Timeline & Crédits
// ==========================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  discordId: string | null;
  avatarUrl: string | null;
  sortOrder: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  sortOrder: number;
}

export interface Credit {
  id: string;
  category: string;
  personName: string;
  task: string | null;
  socialLink: string | null;
  sortOrder: number;
}

// ==========================================
// Médias & Galerie
// ==========================================

export interface Screenshot {
  id: string;
  imageUrl: string;
  sortOrder: number;
}

export interface HeroBackground {
  id: string;
  imageUrl: string;
  sortOrder: number;
}

// ==========================================
// Blog & Actualités
// ==========================================

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  published?: boolean;
}

// ==========================================
// Wiki & Documentation
// ==========================================

export interface WikiPageSummary {
  id: string;
  slug: string;
  title: string;
}

export interface WikiTool {
  id: string;
  name: string;
  description: string;
  imagePath: string | null;
  link: string | null;
  tags: string[];
  sortOrder: number;
  published: boolean;
  pages?: WikiPageSummary[];
}

export interface WikiPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  toolId: string | null;
  published: boolean;
  sortOrder: number;
  tool?: { id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// Jeux & FAQ
// ==========================================

export interface Game {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string | null;
  status: string;
  releaseDate: string | null;
  downloadUrl: string | null;
  filePath: string | null;
  fileSize: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// Recherche & Analytics
// ==========================================

export interface SearchResults {
  pages: { id: string; slug: string; title: string; tool: { name: string } | null }[];
  tools: { id: string; name: string; description: string; imagePath: string | null }[];
  posts: { id: string; slug: string; title: string; excerpt: string | null }[];
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

export interface TrackEventPayload {
  path: string;
  userAgent?: string;
  referrer?: string | null;
}

// ==========================================
// Utilisateurs & Administration
// ==========================================

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: string | null;
  createdAt: string;
}

export interface AuthSession {
  user: AdminUser | null;
  token?: string;
}
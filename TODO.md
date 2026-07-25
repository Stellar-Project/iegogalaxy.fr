# Todo - Iegogalaxy.fr

## Backend (Fastify 5 + Prisma + PostgreSQL)

- [x] Auth JWT (login, middleware, seed admin)
- [x] Rate limiting (5 tentatives/15min)
- [x] CRUD patches
- [x] CRUD team
- [x] CRUD timeline
- [x] CRUD credits
- [x] CRUD screenshots
- [x] CRUD hero backgrounds
- [x] CRUD wiki (tools + pages)
- [x] CRUD config site
- [x] CRUD blog / actualités
- [x] Upload fichiers (images)
- [x] Export BDD (JSON)
- [x] Serveur fichiers statiques (uploads)

## Frontend (React 19 + Vite 7 + Tailwind v4)

### Pages publiques
- [x] Home (Hero, About, Screenshots carousel, News section)
- [x] Download (GameCards avec patch + ROM)
- [x] About (team, timeline, credits)
- [x] Tutorial
- [x] Wiki (Kuriimu1)
- [x] Mentions légales
- [x] Blog post viewer (/actualites/:slug)

### Admin (/admin)
- [x] Login
- [x] Dashboard (stats + export JSON + placeholder stats visiteurs)
- [x] Patches CRUD
- [x] Team CRUD
- [x] Timeline CRUD
- [x] Credits CRUD
- [x] Screenshots CRUD + upload
- [x] Hero backgrounds CRUD + upload
- [x] Wiki CRUD (tools + pages)
- [x] Blog CRUD
- [x] Configuration (patchs + ROMs)

### Composants
- [x] GameCard (patch + ROM buttons)
- [x] HeroSection
- [x] AboutSection
- [x] ScreenshotCarousel
- [x] ImageModal
- [x] HistoryTimeline
- [x] CurrentChangelog
- [x] Admin Layout + nav

## Infrastructure
- [x] Vite proxy `/api` → localhost:3000
- [x] Static file serving (uploads)
- [x] .gitignore (global, pas de duplicata)
- [x] .gitkeep dans uploads/

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma.js";

export default async function seoRoutes(fastify: FastifyInstance) {
  fastify.get("/robots.txt", async (_req, reply) => {
    reply.header("Content-Type", "text/plain");
    return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://iegogalaxy.fr/sitemap.xml`;
  });

  fastify.get("/sitemap.xml", async (_req, reply) => {
    const [pages, posts, games] = await Promise.all([
      prisma.wikiPage.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      prisma.game.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ]);

    const urls: { loc: string; lastmod?: string; priority: string }[] = [
      { loc: "https://iegogalaxy.fr/", priority: "1.0" },
      { loc: "https://iegogalaxy.fr/wiki", priority: "0.9" },
      { loc: "https://iegogalaxy.fr/tutoriel", priority: "0.8" },
      { loc: "https://iegogalaxy.fr/telechargement", priority: "0.9" },
      { loc: "https://iegogalaxy.fr/apropos", priority: "0.7" },
      { loc: "https://iegogalaxy.fr/mentions-legales", priority: "0.3" },
      { loc: "https://iegogalaxy.fr/faq", priority: "0.5" },
      ...pages.map((p) => ({ loc: `https://iegogalaxy.fr/wiki/${p.slug}`, lastmod: p.updatedAt.toISOString(), priority: "0.7" })),
      ...posts.map((p) => ({ loc: `https://iegogalaxy.fr/actualites/${p.slug}`, lastmod: p.updatedAt.toISOString(), priority: "0.6" })),
      ...games.map((g) => ({ loc: `https://iegogalaxy.fr/jeux/${g.slug}`, lastmod: g.updatedAt.toISOString(), priority: "0.8" })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>\n    ` : ""}<changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>`;

    reply.header("Content-Type", "application/xml");
    return xml;
  });

  fastify.get("/rss.xml", async (_req, reply) => {
    const [posts, patches] = await Promise.all([
      prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 20 }),
      prisma.patchVersion.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

    const items = [
      ...posts.map((p) => ({
        title: p.title,
        link: `https://iegogalaxy.fr/actualites/${p.slug}`,
        description: p.excerpt || p.content.replace(/<[^>]*>/g, "").slice(0, 200),
        pubDate: p.createdAt.toUTCString(),
        guid: `post-${p.id}`,
      })),
      ...patches.map((p) => ({
        title: `Patch ${p.version} disponible`,
        link: "https://iegogalaxy.fr/telechargement",
        description: `La version ${p.version} du patch de traduction est disponible. Date : ${p.date}. Taille : ${p.size}.`,
        pubDate: p.createdAt.toUTCString(),
        guid: `patch-${p.id}`,
      })),
    ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 20);

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Stellar Project — Traduction française Inazuma Eleven GO Galaxy</title>
  <link>https://iegogalaxy.fr</link>
  <description>Actualités et mises à jour du projet de traduction française</description>
  <language>fr</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="https://iegogalaxy.fr/rss.xml" rel="self" type="application/rss+xml"/>
${items.map((item) => `  <item>\n    <title>${escapeXml(item.title)}</title>\n    <link>${item.link}</link>\n    <description>${escapeXml(item.description)}</description>\n    <pubDate>${item.pubDate}</pubDate>\n    <guid>${item.guid}</guid>\n  </item>`).join("\n")}
</channel>
</rss>`;

    reply.header("Content-Type", "application/rss+xml; charset=utf-8");
    return rss;
  });
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

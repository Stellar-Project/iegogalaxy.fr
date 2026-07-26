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
}

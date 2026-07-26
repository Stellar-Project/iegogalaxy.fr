import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma.js";

export default async function searchRoutes(fastify: FastifyInstance) {
  fastify.get("/api/search", async (request) => {
    const { q } = request.query as { q?: string };
    if (!q || q.length < 2) return { pages: [], tools: [], posts: [] };

    const query = q.trim();

    const [pages, tools, posts] = await Promise.all([
      prisma.wikiPage.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        select: { id: true, slug: true, title: true, tool: { select: { name: true } } },
        take: 5,
      }),
      prisma.wikiTool.findMany({
        where: {
          pages: { some: { published: true } },
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        select: { id: true, name: true, description: true, imagePath: true },
        take: 5,
      }),
      prisma.post.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        },
        select: { id: true, slug: true, title: true, excerpt: true },
        take: 5,
      }),
    ]);

    return { pages, tools, posts };
  });
}

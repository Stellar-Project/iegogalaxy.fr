import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function exportRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    await requireAdmin(request, reply);
  });

  fastify.get("/api/export", async () => {
    const [patches, team, timeline, credits, screenshots, hero, wikiTools, wikiPages, config, posts] = await Promise.all([
      prisma.patchVersion.findMany(),
      prisma.teamMember.findMany(),
      prisma.timelineEvent.findMany(),
      prisma.credit.findMany(),
      prisma.screenshot.findMany(),
      prisma.heroBackground.findMany(),
      prisma.wikiTool.findMany(),
      prisma.wikiPage.findMany(),
      prisma.siteConfig.findUnique({ where: { id: "default" } }),
      prisma.post.findMany(),
    ]);
    return { patches, team, timeline, credits, screenshots, hero, wikiTools, wikiPages, config, posts, exportedAt: new Date().toISOString() };
  });
}

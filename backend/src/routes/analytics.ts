import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function analyticsRoutes(fastify: FastifyInstance) {
  fastify.post("/api/analytics/track", async (request, reply) => {
    const { path, userAgent } = (request.body || {}) as { path?: string; userAgent?: string };
    if (!path) return reply.status(400).send({ error: "path required" });
    await prisma.pageView.create({ data: { path, userAgent: userAgent || "" } });
    return { ok: true };
  });

  fastify.get("/api/analytics/stats", async (request, reply) => {
    await authenticate(request, reply);

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalViews, todayViews, viewsByPage, viewsByDay] = await Promise.all([
      prisma.pageView.count(),
      prisma.pageView.count({ where: { date: { gte: todayStart } } }),
      prisma.pageView.groupBy({ by: ["path"], _count: true, orderBy: { _count: { path: "desc" } }, take: 10 }),
      prisma.pageView.findMany({
        where: { date: { gte: thirtyDaysAgo } },
        select: { date: true },
        orderBy: { date: "asc" },
      }),
    ]);

    const dayCount: Record<string, number> = {};
    for (const v of viewsByDay) {
      const day = v.date.toISOString().slice(0, 10);
      dayCount[day] = (dayCount[day] || 0) + 1;
    }
    const byDay = Object.entries(dayCount).map(([date, count]) => ({ date, count }));

    return { totalViews, todayViews, viewsByPage, viewsByDay: byDay };
  });
}

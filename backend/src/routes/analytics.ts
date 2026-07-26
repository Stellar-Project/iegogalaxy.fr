import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function analyticsRoutes(fastify: FastifyInstance) {
  fastify.post("/api/analytics/track", async (request, reply) => {
    const { path, userAgent, referrer } = (request.body || {}) as { path?: string; userAgent?: string; referrer?: string };
    if (!path) return reply.status(400).send({ error: "path required" });
    await prisma.pageView.create({ data: { path, userAgent: userAgent || "", referrer: referrer || null } });
    return { ok: true };
  });

  fastify.post("/api/analytics/track-download", async (request, reply) => {
    const { file, userAgent } = (request.body || {}) as { file?: string; userAgent?: string };
    if (!file) return reply.status(400).send({ error: "file required" });
    await prisma.downloadEvent.create({ data: { file, userAgent: userAgent || "" } });
    return { ok: true };
  });

  fastify.post("/api/analytics/reset", async (request, reply) => {
    await requireAdmin(request, reply);
    const { scope } = (request.body || {}) as { scope?: string };
    if (scope === "views") await prisma.pageView.deleteMany();
    else if (scope === "downloads") await prisma.downloadEvent.deleteMany();
    else { await prisma.pageView.deleteMany(); await prisma.downloadEvent.deleteMany(); }
    return { ok: true };
  });

  fastify.get("/api/analytics/stats", async (request, reply) => {
    await requireAdmin(request, reply);

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalViews, todayViews, viewsByPage, viewsByDay, totalDownloads, downloadsByFile, dailyDownloads] = await Promise.all([
      prisma.pageView.count(),
      prisma.pageView.count({ where: { date: { gte: todayStart } } }),
      prisma.pageView.groupBy({ by: ["path"], _count: true, orderBy: { _count: { path: "desc" } }, take: 20 }),
      prisma.pageView.findMany({
        where: { date: { gte: thirtyDaysAgo } },
        select: { date: true },
        orderBy: { date: "asc" },
      }),
      prisma.downloadEvent.count(),
      prisma.downloadEvent.groupBy({ by: ["file"], _count: true, orderBy: { _count: { file: "desc" } }, take: 20 }),
      prisma.downloadEvent.findMany({
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

    const dlDayCount: Record<string, number> = {};
    for (const v of dailyDownloads) {
      const day = v.date.toISOString().slice(0, 10);
      dlDayCount[day] = (dlDayCount[day] || 0) + 1;
    }
    const dlByDay = Object.entries(dlDayCount).map(([date, count]) => ({ date, count }));

    const uniqueVisitors = await prisma.pageView.groupBy({ by: ["userAgent"], _count: true });
    const uniqueReferrers = await prisma.pageView.groupBy({ by: ["referrer"], _count: true, orderBy: { _count: { referrer: "desc" } }, take: 10 });

    return {
      totalViews,
      todayViews,
      viewsByPage,
      viewsByDay: byDay,
      totalDownloads,
      downloadsByFile,
      downloadsByDay: dlByDay,
      uniqueVisitors: uniqueVisitors.length,
      topReferrers: uniqueReferrers.filter((r) => r.referrer),
    };
  });
}

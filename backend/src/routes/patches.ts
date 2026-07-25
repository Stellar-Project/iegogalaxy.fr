import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function patchRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await authenticate(request, reply);
    }
  });

  fastify.get("/api/patches", async () => {
    return prisma.patchVersion.findMany({ orderBy: { createdAt: "desc" } });
  });

  fastify.get("/api/patches/:id", async (request) => {
    const { id } = request.params as { id: string };
    const patch = await prisma.patchVersion.findUnique({ where: { id } });
    if (!patch) return { error: "Not found" };
    return patch;
  });

  fastify.post("/api/patches", async (request, reply) => {
    const body = request.body as any;
    const patch = await prisma.patchVersion.create({
      data: {
        version: body.version,
        date: body.date,
        size: body.size,
        supernovaLink: body.supernovaLink || null,
        bigbangLink: body.bigbangLink || null,
        changelog: body.changelog || [],
        isLatest: body.isLatest ?? false,
      },
    });
    return reply.status(201).send(patch);
  });

  fastify.put("/api/patches/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.patchVersion.update({
      where: { id },
      data: {
        version: body.version,
        date: body.date,
        size: body.size,
        supernovaLink: body.supernovaLink,
        bigbangLink: body.bigbangLink,
        changelog: body.changelog,
        isLatest: body.isLatest,
      },
    });
  });

  fastify.delete("/api/patches/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.patchVersion.delete({ where: { id } });
    return { success: true };
  });
}

import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function screenshotRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await requireAdmin(request, reply);
    }
  });

  fastify.get("/api/screenshots", async () => {
    return prisma.screenshot.findMany({ orderBy: { sortOrder: "asc" } });
  });

  fastify.post("/api/screenshots", async (request, reply) => {
    const body = request.body as any;
    const screenshot = await prisma.screenshot.create({ data: body });
    return reply.status(201).send(screenshot);
  });

  fastify.put("/api/screenshots/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.screenshot.update({ where: { id }, data: body });
  });

  fastify.delete("/api/screenshots/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.screenshot.delete({ where: { id } });
    return { success: true };
  });
}

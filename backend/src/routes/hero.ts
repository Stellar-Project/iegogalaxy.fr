import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function heroRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await authenticate(request, reply);
    }
  });

  fastify.get("/api/hero", async () => {
    return prisma.heroBackground.findMany({ orderBy: { sortOrder: "asc" } });
  });

  fastify.post("/api/hero", async (request, reply) => {
    const body = request.body as any;
    const bg = await prisma.heroBackground.create({ data: body });
    return reply.status(201).send(bg);
  });

  fastify.put("/api/hero/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.heroBackground.update({ where: { id }, data: body });
  });

  fastify.delete("/api/hero/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.heroBackground.delete({ where: { id } });
    return { success: true };
  });
}

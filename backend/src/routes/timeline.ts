import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function timelineRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await authenticate(request, reply);
    }
  });

  fastify.get("/api/timeline", async () => {
    return prisma.timelineEvent.findMany({ orderBy: { sortOrder: "asc" } });
  });

  fastify.post("/api/timeline", async (request, reply) => {
    const body = request.body as any;
    const event = await prisma.timelineEvent.create({ data: body });
    return reply.status(201).send(event);
  });

  fastify.put("/api/timeline/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.timelineEvent.update({ where: { id }, data: body });
  });

  fastify.delete("/api/timeline/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.timelineEvent.delete({ where: { id } });
    return { success: true };
  });
}

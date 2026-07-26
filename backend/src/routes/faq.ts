import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function faqRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await requireAdmin(request, reply);
    }
  });

  fastify.get("/api/faq", async () => {
    return prisma.faqItem.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  });

  fastify.get("/api/faq/all", async (request, reply) => {
    await requireAdmin(request, reply);
    return prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });
  });

  fastify.post("/api/faq", async (request, reply) => {
    const body = request.body as any;
    const item = await prisma.faqItem.create({ data: body });
    return reply.status(201).send(item);
  });

  fastify.put("/api/faq/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.faqItem.update({ where: { id }, data: body });
  });

  fastify.delete("/api/faq/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.faqItem.delete({ where: { id } });
    return { success: true };
  });
}

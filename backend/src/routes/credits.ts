import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function creditRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await requireAdmin(request, reply);
    }
  });

  fastify.get("/api/credits", async () => {
    return prisma.credit.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  });

  fastify.post("/api/credits", async (request, reply) => {
    const body = request.body as any;
    const credit = await prisma.credit.create({ data: body });
    return reply.status(201).send(credit);
  });

  fastify.put("/api/credits/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.credit.update({ where: { id }, data: body });
  });

  fastify.delete("/api/credits/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.credit.delete({ where: { id } });
    return { success: true };
  });
}

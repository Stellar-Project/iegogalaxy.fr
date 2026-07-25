import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function teamRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await authenticate(request, reply);
    }
  });

  fastify.get("/api/team", async () => {
    return prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
  });

  fastify.post("/api/team", async (request, reply) => {
    const body = request.body as any;
    const member = await prisma.teamMember.create({ data: body });
    return reply.status(201).send(member);
  });

  fastify.put("/api/team/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.teamMember.update({ where: { id }, data: body });
  });

  fastify.delete("/api/team/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.teamMember.delete({ where: { id } });
    return { success: true };
  });
}

import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function usersRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await requireAdmin(request, reply);
    }
  });

  fastify.get("/api/users", async (request, reply) => {
    await requireAdmin(request, reply);
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, banned: true, banReason: true, banExpires: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    return users;
  });

  fastify.put("/api/users/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as { role?: string; banned?: boolean; banReason?: string; banExpires?: string | null };
    const data: Record<string, unknown> = {};
    if (body.role !== undefined) data.role = body.role;
    if (body.banned !== undefined) data.banned = body.banned;
    if (body.banReason !== undefined) data.banReason = body.banReason;
    if (body.banExpires !== undefined) data.banExpires = body.banExpires ? new Date(body.banExpires) : null;
    return prisma.user.update({ where: { id }, data });
  });
}

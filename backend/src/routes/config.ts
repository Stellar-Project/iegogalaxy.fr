import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function configRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["PUT"].includes(request.method)) {
      await requireAdmin(request, reply);
    }
  });

  fastify.get("/api/config", async () => {
    const config = await prisma.siteConfig.findUnique({ where: { id: "default" } });
    return config || {};
  });

  fastify.put("/api/config", async (request) => {
    const body = request.body as any;
    return prisma.siteConfig.upsert({
      where: { id: "default" },
      update: body,
      create: { id: "default", ...body },
    });
  });
}

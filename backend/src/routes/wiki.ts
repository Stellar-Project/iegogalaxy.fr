import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function wikiRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await authenticate(request, reply);
    }
  });

  fastify.get("/api/wiki/tools", async () => {
    return prisma.wikiTool.findMany({
      orderBy: { sortOrder: "asc" },
      include: { pages: { where: { published: true }, select: { id: true, slug: true, title: true } } },
    });
  });

  fastify.post("/api/wiki/tools", async (request, reply) => {
    const body = request.body as any;
    const tool = await prisma.wikiTool.create({ data: body });
    return reply.status(201).send(tool);
  });

  fastify.put("/api/wiki/tools/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.wikiTool.update({ where: { id }, data: body });
  });

  fastify.delete("/api/wiki/tools/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.wikiTool.delete({ where: { id } });
    return { success: true };
  });

  fastify.get("/api/wiki/pages", async () => {
    return prisma.wikiPage.findMany({ orderBy: { createdAt: "desc" }, include: { tool: { select: { id: true, name: true } } } });
  });

  fastify.get("/api/wiki/pages/:slug", async (request) => {
    const { slug } = request.params as { slug: string };
    const page = await prisma.wikiPage.findFirst({ where: { slug }, include: { tool: true } });
    if (!page || (!page.published && !request.user)) {
      return { error: "Not found" };
    }
    return page;
  });

  fastify.post("/api/wiki/pages", async (request, reply) => {
    const body = request.body as any;
    const page = await prisma.wikiPage.create({ data: body });
    return reply.status(201).send(page);
  });

  fastify.put("/api/wiki/pages/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.wikiPage.update({ where: { id }, data: body });
  });

  fastify.delete("/api/wiki/pages/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.wikiPage.delete({ where: { id } });
    return { success: true };
  });
}

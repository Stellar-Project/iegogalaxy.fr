import { FastifyInstance } from "fastify";
import { authenticate } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function blogRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await authenticate(request, reply);
    }
  });

  fastify.get("/api/blog", async () => {
    return prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  });

  fastify.get("/api/blog/all", async (request, reply) => {
    await authenticate(request, reply);
    return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  });

  fastify.get("/api/blog/:slug", async (request) => {
    const { slug } = request.params as { slug: string };
    return prisma.post.findUnique({ where: { slug } });
  });

  fastify.post("/api/blog", async (request, reply) => {
    const body = request.body as any;
    const post = await prisma.post.create({ data: body });
    return reply.status(201).send(post);
  });

  fastify.put("/api/blog/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.post.update({ where: { id }, data: body });
  });

  fastify.delete("/api/blog/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.post.delete({ where: { id } });
    return { success: true };
  });
}

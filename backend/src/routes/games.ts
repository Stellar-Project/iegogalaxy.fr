import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";
import { createReadStream } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function gameRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    if (["POST", "PUT", "DELETE"].includes(request.method)) {
      await requireAdmin(request, reply);
    }
  });

  fastify.get("/api/games", async () => {
    return prisma.game.findMany({ orderBy: { sortOrder: "asc" } });
  });

  fastify.get("/api/games/published", async () => {
    return prisma.game.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  });

  fastify.get("/api/games/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const game = await prisma.game.findUnique({ where: { slug } });
    if (!game || !game.published) return reply.status(404).send({ error: "Jeu introuvable" });
    return game;
  });

  fastify.get("/api/games/:slug/download", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const game = await prisma.game.findUnique({ where: { slug } });
    if (!game || !game.published) return reply.status(404).send({ error: "Jeu introuvable" });

    if (game.downloadUrl) return reply.redirect(game.downloadUrl);

    if (game.filePath) {
      const filePath = join(__dirname, "../../uploads", game.filePath);
      return reply.type("application/octet-stream").send(createReadStream(filePath));
    }

    return reply.status(404).send({ error: "Aucun fichier disponible" });
  });

  fastify.post("/api/games", async (request, reply) => {
    const body = request.body as any;
    const game = await prisma.game.create({ data: body });
    return reply.status(201).send(game);
  });

  fastify.put("/api/games/:id", async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as any;
    return prisma.game.update({ where: { id }, data: body });
  });

  fastify.delete("/api/games/:id", async (request) => {
    const { id } = request.params as { id: string };
    await prisma.game.delete({ where: { id } });
    return { success: true };
  });
}

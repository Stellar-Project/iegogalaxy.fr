import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { createWriteStream } from "fs";
import { join, extname, dirname } from "path";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import { requireAdmin } from "../plugins/auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = join(__dirname, "../../uploads");

export default async function uploadRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    await requireAdmin(request, reply);
  });

  fastify.post("/api/upload", async (request, reply) => {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: "No file uploaded" });
    }

    const ext = extname(data.filename);
    const filename = `${randomUUID()}${ext}`;
    const filepath = join(UPLOADS_DIR, filename);

    await pipeline(data.file, createWriteStream(filepath));

    return { url: `/uploads/${filename}` };
  });
}

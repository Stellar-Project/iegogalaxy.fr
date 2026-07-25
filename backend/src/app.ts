import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import staticFiles from "@fastify/static";
import multipart from "@fastify/multipart";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import authRoutes from "./routes/auth.js";
import patchRoutes from "./routes/patches.js";
import teamRoutes from "./routes/team.js";
import timelineRoutes from "./routes/timeline.js";
import creditRoutes from "./routes/credits.js";
import screenshotRoutes from "./routes/screenshots.js";
import heroRoutes from "./routes/hero.js";
import wikiRoutes from "./routes/wiki.js";
import configRoutes from "./routes/config.js";
import blogRoutes from "./routes/blog.js";
import exportRoutes from "./routes/export.js";
import uploadRoutes from "./routes/upload.js";
import analyticsRoutes from "./routes/analytics.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({ logger: true });
fastify.addContentTypeParser("application/json", { parseAs: "buffer" }, (_req, body: Buffer, _done) => {
  _done(null, body.length ? JSON.parse(body.toString()) : {});
});

await fastify.register(cors, { origin: true });
await fastify.register(rateLimit, { global: false });
await fastify.register(multipart);
await fastify.register(staticFiles, {
  root: join(__dirname, "../uploads"),
  prefix: "/uploads/",
});
await fastify.register(authRoutes);
await fastify.register(patchRoutes);
await fastify.register(teamRoutes);
await fastify.register(timelineRoutes);
await fastify.register(creditRoutes);
await fastify.register(screenshotRoutes);
await fastify.register(heroRoutes);
await fastify.register(wikiRoutes);
await fastify.register(configRoutes);
await fastify.register(blogRoutes);
await fastify.register(exportRoutes);
await fastify.register(uploadRoutes);
await fastify.register(analyticsRoutes);

const port = parseInt(process.env.PORT || "3000");
try {
  await fastify.listen({ port, host: "0.0.0.0" });
  console.log(`Server running on http://localhost:${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

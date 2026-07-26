import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import staticFiles from "@fastify/static";
import multipart from "@fastify/multipart";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, mkdirSync } from "fs";

import { auth } from "./lib/auth.js";
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
import searchRoutes from "./routes/search.js";
import seoRoutes from "./routes/seo.js";
import gameRoutes from "./routes/games.js";
import faqRoutes from "./routes/faq.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({ logger: true });

fastify.addContentTypeParser("application/json", { parseAs: "string", bodyLimit: 1048576 }, (_req, body, _done) => {
  _done(null, body.length ? JSON.parse(body as string) : {});
});

await fastify.register(cors, { origin: true, credentials: true });
await fastify.register(rateLimit, { global: false });
await fastify.register(multipart);
const uploadsDir = join(__dirname, "../uploads");
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true, mode: 0o755 });

await fastify.register(staticFiles, {
  root: uploadsDir,
  prefix: "/uploads/",
  cacheControl: true,
  maxAge: "7d",
});

fastify.all("/api/auth/*", async (req, reply) => {
  const url = new URL(req.url, process.env.BETTER_AUTH_URL || "http://localhost:3000");
  const raw = ["GET", "HEAD"].includes(req.method) ? undefined : JSON.stringify(req.body);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v && !["host", "connection", "content-length"].includes(k)) headers.set(k, String(v));
  }
  const webRes = await auth.handler(new Request(url, { method: req.method, headers, body: raw }));
  reply.code(webRes.status);
  webRes.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") reply.header(key, value);
    else reply.header(key, value);
  });
  const text = await webRes.text();
  if (text) return JSON.parse(text);
});

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
await fastify.register(searchRoutes);
await fastify.register(seoRoutes);
await fastify.register(gameRoutes);
await fastify.register(faqRoutes);

const port = parseInt(process.env.PORT || "3000");
try {
  await fastify.listen({ port, host: "0.0.0.0" });
  console.log(`Server running on http://localhost:${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

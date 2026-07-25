import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { signToken } from "../plugins/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/api/auth/login", {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: "15 minutes",
        keyGenerator: (request) => request.ip,
        errorResponseBuilder: () => ({
          error: "Trop de tentatives. Réessayez dans 15 minutes.",
        }),
      },
    },
  }, async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    if (!email || !password) {
      return reply.status(400).send({ error: "Email and password required" });
    }

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) {
      return reply.status(401).send({ error: "Identifiants incorrects" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return reply.status(401).send({ error: "Identifiants incorrects" });
    }

    const token = signToken({ id: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  });
}

import { FastifyRequest, FastifyReply } from "fastify";
import { auth } from "../lib/auth.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: { id: string; email: string; name: string; role?: string | null };
  }
}

export async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
  const session = await auth.api.getSession({ headers: request.headers as Record<string, string> });
  if (!session) {
    reply.status(401).send({ error: "Non autorisé" });
    return;
  }
  request.user = { id: session.user.id, email: session.user.email, name: session.user.name, role: (session.user as any).role };
}

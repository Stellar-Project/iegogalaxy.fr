import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export interface JwtPayload {
  id: string;
  email: string;
}

declare module "fastify" {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const header = request.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    reply.status(401).send({ error: "Missing or invalid token" });
    return;
  }
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    request.user = decoded;
  } catch {
    reply.status(401).send({ error: "Invalid token" });
  }
}

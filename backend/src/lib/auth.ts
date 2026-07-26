import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { username } from "better-auth/plugins/username";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  plugins: [username()],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/auth`,
  trustedOrigins: ["http://localhost:5173", "https://iegogalaxy.fr", "http://iegogalaxy.fr"],
  rateLimit: { window: 60, max: 20 },
});

import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

const users = await prisma.user.findMany({ include: { accounts: true } });
for (const u of users) {
  console.log(u.email, "|", u.name, "|", "username:", u.username, "|", u.accounts.map((a: any) => a.providerId).join(", "));
}
await prisma.$disconnect();

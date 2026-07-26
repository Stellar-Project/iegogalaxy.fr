import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

const oldEmail = process.argv[2];
const newEmail = process.argv[3];

if (!oldEmail || !newEmail) {
  console.log("Usage: npx tsx scripts/update-email.ts <ancien-email> <nouvel-email>");
  process.exit(1);
}

const user = await prisma.user.findUnique({ where: { email: oldEmail } });
if (!user) {
  console.log(`✗ Utilisateur ${oldEmail} introuvable`);
  process.exit(1);
}

await prisma.user.update({ where: { email: oldEmail }, data: { email: newEmail } });
await prisma.account.updateMany({ where: { userId: user.id, providerId: "credential" }, data: { email: newEmail } });

console.log(`✓ Email mis à jour : ${oldEmail} → ${newEmail}`);
await prisma.$disconnect();

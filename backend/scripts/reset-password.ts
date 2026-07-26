import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.argv[2];
  const newPassword = process.argv[3];

  if (!email || !newPassword) {
    console.log("Usage: npx tsx scripts/reset-password.ts <email> <new-password>");
    process.exit(1);
  }

  const account = await prisma.account.findFirst({
    where: { providerId: "credential", user: { email } },
    include: { user: true },
  });

  if (!account) {
    console.log(`✗ Aucun compte email/mot de passe trouvé pour ${email}`);
    process.exit(1);
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.account.update({
    where: { id: account.id },
    data: { password: hash },
  });

  console.log(`✓ Mot de passe mis à jour pour ${account.user.name} (${email})`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());

import { PrismaClient } from "../src/generated/prisma";
import { writeFileSync } from "fs";

const prisma = new PrismaClient();

const models = [
  "user", "verification",
  "patchVersion", "teamMember", "timelineEvent", "credit",
  "screenshot", "heroBackground", "wikiTool", "wikiPage",
  "siteConfig", "post", "game", "faqItem",
  "session", "account",
  "pageView", "downloadEvent",
] as const;

async function main() {
  const data: Record<string, unknown[]> = {};

  for (const model of models) {
    try {
      data[model] = await (prisma as any)[model].findMany();
      console.log(`✓ ${model}: ${data[model].length} lignes`);
    } catch {
      console.log(`✗ ${model}: ignoré`);
    }
  }

  writeFileSync("exported-data.json", JSON.stringify(data, null, 2));
  console.log("\n✅ Fini → exported-data.json");
}

main().catch(console.error).finally(() => prisma.$disconnect());

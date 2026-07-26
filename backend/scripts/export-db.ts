import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";
import { writeFileSync } from "fs";

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
    } catch (e) {
      console.log(`✗ ${model}: ${(e as Error).message}`);
    }
  }

  writeFileSync("exported-data.json", JSON.stringify(data, null, 2));
  console.log("\n✅ Fini → exported-data.json");
}

main().catch(console.error).finally(() => prisma.$disconnect());

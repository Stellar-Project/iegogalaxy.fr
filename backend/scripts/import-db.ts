import { PrismaClient } from "../src/generated/prisma";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

const models = [
  "user", "verification",
  "patchVersion", "teamMember", "timelineEvent", "credit",
  "screenshot", "heroBackground", "wikiTool", "wikiPage",
  "siteConfig", "post", "game", "faqItem",
  "session", "account",
  "pageView", "downloadEvent",
];

async function main() {
  const data = JSON.parse(readFileSync("exported-data.json", "utf-8"));

  for (const model of models) {
    const records = data[model];
    if (!Array.isArray(records) || records.length === 0) {
      console.log(`- ${model}: 0 lignes`);
      continue;
    }

    let imported = 0;
    for (const record of records) {
      const { id, createdAt, updatedAt, ...rest } = record as any;
      try {
        await (prisma as any)[model].upsert({
          where: { id },
          create: record,
          update: rest,
        });
        imported++;
      } catch (e: any) {
        console.log(`✗ ${model} ${record.id}: ${e.message?.slice(0, 80)}`);
      }
    }
    console.log(`✓ ${model}: ${imported}/${records.length} importés`);
  }

  console.log("\n✅ Import terminé");
}

main().catch(console.error).finally(() => prisma.$disconnect());

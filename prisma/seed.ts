import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { addDays, startOfWeek, subMonths } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  // Supprimer toutes les données existantes
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  // Créer un utilisateur unique
  const user = await prisma.user.create({
    data: {
      email: "testuser@example.com",
      name: faker.person.fullName(),
      emailVerified: true,
      image: faker.image.avatar(),
    },
  });

  const today = new Date();
  const startDate = subMonths(today, 4);

  const postsData = [];

  for (let week = 0; week < 17; week++) {
    const weekStart = addDays(startOfWeek(startDate), week * 7);
    const numPosts = Math.random() < 0.25 ? 2 : 1;

    for (let p = 0; p < numPosts; p++) {
      const dayOffset = Math.floor(Math.random() * 7);
      const postDate = addDays(weekStart, dayOffset);

      postsData.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        icon: Math.round(Math.random()) === 0 ? "🤣" : null,
        published: Math.random() < 0.8,
        createdAt: postDate,
        updatedAt: postDate,
        authorId: user.id,
      });
    }
  }

  // Insertion de tous les posts
  await prisma.post.createMany({
    data: postsData,
  });

  console.log(
    `✅ Seed terminé : ${postsData.length} posts créés pour l'utilisateur ${user.email}`
  );
}

main()
  .catch((e) => {
    console.error("Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

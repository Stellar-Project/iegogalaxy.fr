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
        content: JSON.stringify([
          {
            id: "40ca1940-5143-40b9-8c42-4aff641fbd0e",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [
              {
                type: "text",
                text: "Coucou ",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "efc633f3-e163-4ef3-bed4-90b04287581f",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [
              {
                type: "text",
                text: "Voici un contenu",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "c8f758cc-36c9-45ec-a5cc-325ad59e0c68",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [],
            children: [],
          },
          {
            id: "e467a834-2fae-4c21-9c93-bd3f900a0bc2",
            type: "heading",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              level: 1,
            },
            content: [
              {
                type: "text",
                text: "Titre",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "00081ef4-8bd1-44ef-8c95-c0298090fd88",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [],
            children: [],
          },
          {
            id: "3f75b253-5962-4e3e-8f44-ca5e67f7b241",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [],
            children: [],
          },
          {
            id: "2f5fed7f-de9a-4817-a169-94a7b46554a2",
            type: "quote",
            props: {
              textColor: "default",
              backgroundColor: "default",
            },
            content: [
              {
                type: "text",
                text: "Citation",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "a5b4bf91-2fe4-4fe5-8e8d-5140e628066a",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [],
            children: [],
          },
          {
            id: "9f97aa4f-c5ae-4713-998e-85ddfd7e4a41",
            type: "checkListItem",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              checked: false,
            },
            content: [
              {
                type: "text",
                text: "azdazd",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "64a27cea-6e93-42a4-a436-6e20124ae53d",
            type: "checkListItem",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              checked: false,
            },
            content: [
              {
                type: "text",
                text: "azdazd",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "87d933f5-8107-418b-9767-e10bde5aa6f9",
            type: "checkListItem",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              checked: false,
            },
            content: [
              {
                type: "text",
                text: "azd",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "50c78e0d-4f83-4f74-b59e-120f52f237ca",
            type: "checkListItem",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              checked: false,
            },
            content: [
              {
                type: "text",
                text: "azd",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "056b190e-2b8d-489a-816e-e810e7ffc568",
            type: "checkListItem",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              checked: false,
            },
            content: [
              {
                type: "text",
                text: "azd",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "6ad9a08c-3fb8-4dd8-9926-5cd41d2ccf9b",
            type: "paragraph",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
            },
            content: [],
            children: [],
          },
        ]),
        icon: Math.round(Math.random()) === 0 ? "🤣" : null,
        published: Math.random() < 0.8,
        createdAt: postDate,
        updatedAt: postDate,
        authorId: user.id,
        cover: faker.image.urlPicsumPhotos(),
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

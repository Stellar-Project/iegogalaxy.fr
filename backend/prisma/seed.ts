import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@iegogalaxy.fr" },
    update: {},
    create: { email: "admin@iegogalaxy.fr", password: adminPassword, name: "Admin" },
  });

  await prisma.siteConfig.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      patchVersion: "1.0",
      patchDate: "28 Juin 2024",
      patchSize: "1,08 Go",
      supernovaLink: "#",
      bigbangLink: "#",
    },
  });

  const existingPatches = await prisma.patchVersion.count();
  if (existingPatches === 0) {
    await prisma.patchVersion.create({
      data: {
        version: "1.0",
        date: "28 Juin 2024",
        size: "1.1 GB",
        supernovaLink: "#",
        bigbangLink: "#",
        isLatest: true,
        changelog: [
          "Correction du bug de la Gare d'Inazuma où il était impossible de prendre le train.",
          "Correction d'un bug : lorsque vous parlez à Sky sur le terrain, le jeu se fige avec les joueurs animés.",
          "Correction du bug au chapitre 5 où le jeu crash au moment où Zak tire avec son Totem.",
          "Correction d'un bug dans les derniers chapitres où l'animation de JP n'était pas présente pendant un match.",
          "Traduction des textes des différents menus du jeu, des bonus, du Multi, et plus.",
          "Traduction des icônes sur les menus du jeu.",
        ],
      },
    });
  }

  const existingMembers = await prisma.teamMember.count();
  if (existingMembers === 0) {
    await prisma.teamMember.createMany({
      data: [
        { name: "Rinzler", role: "Chef de Projet", category: "lead", discordId: "590070698140237826", sortOrder: 0 },
        { name: "gwen9p1", role: "Traduction & Correction", category: "trans", discordId: "1245424439420780633", sortOrder: 1 },
        { name: "Hydra", role: "Voix FR & Traduction", category: "trans", discordId: "1061296038650052688", sortOrder: 2 },
      ],
    });
  }

  const existingTimeline = await prisma.timelineEvent.count();
  if (existingTimeline === 0) {
    await prisma.timelineEvent.createMany({
      data: [
        { date: "Janvier 2024", title: "Lancement du Projet", description: "Début de l'aventure et analyse des fichiers du jeu.", sortOrder: 0 },
        { date: "Juin 2024", title: "Première version du patch", description: "Sortie de la première version jouable pour tous.", sortOrder: 1 },
        { date: "Septembre 2024", title: "Pause du Projet", description: "Mise en pause du projet due à des raisons personnelles.", sortOrder: 2 },
        { date: "Décembre 2025", title: "Reprise du Projet", description: "Reprise du projet suite à la pause.", sortOrder: 3 },
      ],
    });
  }

  const existingCredits = await prisma.credit.count();
  if (existingCredits === 0) {
    await prisma.credit.createMany({
      data: [
        { category: "Graphismes & Visuels", personName: "Rinzler", task: "Création du site internet", sortOrder: 0 },
        { category: "Graphismes & Visuels", personName: "Level-10 Team", task: "Partage de leur Logo", sortOrder: 1 },
        { category: "Graphismes & Visuels", personName: "gwen9p1", task: "Assets du jeu refait pour le site", sortOrder: 2 },
        { category: "Anciens Traducteurs", personName: "Kotei Project", task: "Base technique, icônes et objets", sortOrder: 0 },
        { category: "Anciens Traducteurs", personName: "MrFox4", task: "Techniques spéciales et totems", sortOrder: 1 },
        { category: "Remerciements Spéciaux", personName: "Level-5", task: "Pour avoir créé cette licence incroyable", sortOrder: 0 },
        { category: "Remerciements Spéciaux", personName: "La Communauté", task: "Pour votre soutien indéfectible", sortOrder: 1 },
      ],
    });
  }

  const existingScreenshots = await prisma.screenshot.count();
  if (existingScreenshots === 0) {
    for (let i = 1; i <= 5; i++) {
      await prisma.screenshot.create({ data: { imageUrl: `/assets/screenshots/Screenshots-${i}.png`, sortOrder: i - 1 } });
    }
  }

  const existingHero = await prisma.heroBackground.count();
  if (existingHero === 0) {
    for (let i = 1; i <= 3; i++) {
      await prisma.heroBackground.create({ data: { imageUrl: `/assets/bg/mainVisual_0${i}.png`, sortOrder: i - 1 } });
    }
  }

  const existingPosts = await prisma.post.count();
  if (existingPosts === 0) {
    await prisma.post.create({
      data: {
        title: "Bienvenue sur Stellar Project !",
        slug: "bienvenue",
        excerpt: "Le projet de traduction française d'Inazuma Eleven GO Galaxy est enfin lancé.",
        content: "# Bienvenue\n\nLe projet Stellar Project est heureux de vous annoncer le début de la traduction française d'Inazuma Eleven GO Galaxy.\n\n## Notre objectif\n\nRendre ce jeu accessible à tous les francophones qui attendaient une version française depuis des années.\n\nRestez connectés pour les prochaines actualités !",
        published: true,
      },
    });
  }

  const existingWikiTools = await prisma.wikiTool.count();
  if (existingWikiTools === 0) {
    await prisma.wikiTool.create({
      data: {
        name: "Kuriimu1",
        description: "Outil d'édition de fichiers de jeux Nintendo 3DS. Permet d'extraire, modifier et réimporter les textes, images et autres ressources des jeux Inazuma Eleven.",
        imagePath: "/assets/wiki/tools/kuriimu1.png",
        link: "/wiki/Kuriimu1",
        tags: ["3DS", "éditeur", "texte", "bannière"],
        sortOrder: 0,
      },
    });
  }

  const existingWikiPages = await prisma.wikiPage.count();
  if (existingWikiPages === 0) {
    await prisma.wikiPage.create({
      data: {
        slug: "Kuriimu1",
        title: "Kuriimu1 — Guide complet",
        content: `<h1>Kuriimu1 — Guide complet</h1>
<p>Kuriimu1 est un outil d'édition de fichiers pour les jeux Nintendo 3DS. Il est essentiel pour le projet de traduction d'Inazuma Eleven GO Galaxy.</p>
<h2>Installation</h2>
<p>Téléchargez la dernière version depuis le <a href="https://github.com/Stellar-Project/Kuriimu1/releases">GitHub officiel</a>.</p>
<h2>Utilisation de base</h2>
<p>Pour commencer à éditer les fichiers du jeu :</p>
<ol>
<li>Ouvrez Kuriimu1</li>
<li>Sélectionnez <strong>Fichier → Ouvrir</strong></li>
<li>Naviguez vers le dossier du jeu</li>
<li>Sélectionnez un fichier <code>.arc</code> ou <code>.bin</code></li>
</ol>
<h2>Fonctionnalités</h2>
<h3>Édition de texte</h3>
<p>Kuriimu1 permet d'éditer les chaînes de texte directement. Le support inclut :</p>
<ul>
<li>Les dialogues des personnages</li>
<li>Les noms des techniques spéciales</li>
<li>Les descriptions d'objets</li>
<li>Les menus et l'interface</li>
</ul>
<h3>Extraction d'images</h3>
<blockquote>Les images peuvent être exportées au format PNG, modifiées puis réimportées sans perte de qualité.</blockquote>
<h2>Exemple de code</h2>
<pre><code class="language-bash"># Extraire tous les textes du jeu
kuriimu1 extract --input game.arc --output ./texts

# Réimporter après traduction
kuriimu1 repack --input ./texts --output game_patched.arc</code></pre>
<h2>Tableau des formats supportés</h2>
<table>
<thead><tr><th>Extension</th><th>Type</th><th>Support</th></tr></thead>
<tbody>
<tr><td>.arc</td><td>Archive</td><td>Complet</td></tr>
<tr><td>.bin</td><td>Binaire</td><td>Partiel</td></tr>
<tr><td>.msbt</td><td>Message</td><td>Complet</td></tr>
<tr><td>.cgrp</td><td>Image</td><td>Complet</td></tr>
</tbody>
</table>
<h2>Raccourcis clavier</h2>
<p>Voici les raccourcis les plus utiles :</p>
<ul>
<li><kbd>Ctrl+O</kbd> — Ouvrir un fichier</li>
<li><kbd>Ctrl+S</kbd> — Sauvegarder</li>
<li><kbd>Ctrl+Shift+E</kbd> — Exporter tout</li>
</ul>
<p style="text-align: center;"><em>Documentation mise à jour pour la version 1.5 de Kuriimu1.</em></p>`.trim(),
        published: true,
      },
    });
  }

  console.log("Seed completed successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

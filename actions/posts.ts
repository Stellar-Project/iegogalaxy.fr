"use server";

import { Prisma } from "@/app/generated/prisma";
import { getISOWeek } from "@/lib/date";
import { PostWithAuthor } from "@/lib/post";
import db from "@/lib/prisma";
import { subDays, subMonths, subWeeks } from "date-fns";

export const getAllPosts = async () => {
  const posts: PostWithAuthor[] = await db.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return posts;
};

export const getPostById = async (postId: number, userId: string) => {
  try {
    const post = await db.post.findUnique({
      where: { id: postId, authorId: userId },
    });
    return {
      success: true,
      data: post,
      message: "Vous pouvez modifier ce post !",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: `Aucun post trouvé avec l'ID ${postId}.`,
        data: null,
      };
    } else {
      return {
        success: false,
        message: "Erreur lors de la récupération du post : " + error,
        data: null,
      };
    }
  }
};

export const getPostPreview = async (postId: number) => {
  const post = await db.post.findUnique({
    where: { id: postId },
    select: {
      content: true,
      title: true,
      icon: true,
      author: true,
      createdAt: true,
    },
  });

  return post;
};

export const setNewTitle = async (postId: number, title: string) => {
  if (typeof postId !== "number" || postId <= 0) {
    throw new Error("Invalid post ID.");
  }

  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("Title cannot be empty.");
  }

  try {
    const updatedPost = await db.post.update({
      where: { id: postId },
      data: { title },
    });

    return {
      success: true,
      message: "Titre mise à jour avec succès.",
      updatedPost,
    };
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la modification du titre :",
      error
    );
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const setNewIcon = async (postId: number, newIcon: string | null) => {
  if (typeof postId !== "number" || postId <= 0) {
    throw new Error("Invalid post ID.");
  }

  try {
    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        icon: newIcon,
      },
    });

    return {
      success: true,
      message: "Icon mise à jour avec succès.",
      updatedPost,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const setNewContent = async (
  postId: number,
  newContent: string | null
) => {
  if (typeof postId !== "number" || postId <= 0) {
    throw new Error("Invalid post ID.");
  }

  try {
    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        content: newContent,
      },
    });

    return {
      success: true,
      message: "Contenu mise à jour avec succès.",
      updatedPost,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const createNewPost = async (authId: string) => {
  try {
    const newPost = await db.post.create({
      data: {
        title: "Untitled",
        authorId: authId,
      },
    });
    return { success: true, data: newPost, message: "Post créé avec succès !" };
  } catch {
    return {
      success: false,
      data: null,
      message: "Erreur lors de la création du post.",
    };
  }
};

export const getAllPostsByUserId = async (authId: string) => {
  const posts: PostWithAuthor[] = await db.post.findMany({
    where: {
      authorId: authId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return posts;
};

export const deletePostById = async (postId: number) => {
  try {
    await db.post.delete({ where: { id: postId } });
    return { success: true, message: "Post supprimé avec succès !" };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: `Aucun post trouvé avec l'ID ${postId}.`,
      };
    } else {
      return {
        success: false,
        message: "Erreur lors de la suppression du post",
      };
    }
  }
};

export const setPostPublic = async (postId: number, status: boolean) => {
  try {
    await db.post.update({
      where: { id: postId },
      data: { published: status },
    });
    const state = status ? " publié " : " mis en privé ";
    return { success: true, message: "Post" + state + "avec succès !" };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: `Aucun post trouvé avec l'ID ${postId}.`,
      };
    } else {
      return {
        success: false,
        message: "Erreur lors de la publication du post",
      };
    }
  }
};

export async function getTotalPostCount() {
  const count = await db.post.count();
  return count;
}

export async function getPostCountByUser() {
  const result = await db.user.findMany({
    select: {
      id: true,
      name: true,
      posts: {
        select: { id: true },
      },
    },
  });

  return result.map((user) => ({
    id: user.id,
    name: user.name,
    postCount: user.posts.length,
  }));
}

export async function getPublishedStats() {
  const [published, drafts] = await Promise.all([
    db.post.count({ where: { published: true } }),
    db.post.count({ where: { published: false } }),
  ]);

  return { published, drafts };
}

export async function getPostsGroupedBy(
  period: "daily" | "weekly" | "monthly"
) {
  let fromDate: Date;

  switch (period) {
    case "daily":
      fromDate = subDays(new Date(), 30);
      break;
    case "weekly":
      fromDate = subWeeks(new Date(), 12);
      break;
    case "monthly":
      fromDate = subMonths(new Date(), 12);
      break;
    default:
      throw new Error("Invalid period");
  }

  const posts = await db.post.findMany({
    where: {
      createdAt: {
        gte: fromDate,
      },
    },
    select: {
      createdAt: true,
    },
  });

  const groups: Record<string, number> = {};

  for (const post of posts) {
    let key: string;
    const date = post.createdAt;

    if (period === "daily") {
      key = date.toISOString().split("T")[0];
    } else if (period === "weekly") {
      const week = getISOWeek(date);
      const year = date.getFullYear();
      key = `S${week}-${year}`;
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    }

    groups[key] = (groups[key] || 0) + 1;
  }

  return groups;
}

export async function getIconPresenceStats() {
  const [withIcon, withoutIcon] = await Promise.all([
    db.post.count({ where: { icon: { not: null } } }),
    db.post.count({ where: { icon: null } }),
  ]);

  return { withIcon, withoutIcon };
}

export async function getAveragePostLengths() {
  const posts = await db.post.findMany({
    select: {
      title: true,
    },
  });

  const total = posts.length;
  const titleAvg =
    posts.reduce((acc, post) => acc + post.title.length, 0) / total;

  return {
    avgTitleLength: Math.round(titleAvg),
  };
}

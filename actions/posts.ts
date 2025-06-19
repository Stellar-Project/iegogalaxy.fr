"use server";

import { Prisma } from "@/app/generated/prisma";
import { PostWithAuthor } from "@/lib/post";
import db from "@/lib/prisma";

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

export const getAllPostsByUserId = async () => {};

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

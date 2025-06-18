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
        data: {},
      };
    } else {
      return {
        success: false,
        message: "Erreur lors de la récupération du post : " + error,
        data: {},
      };
    }
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

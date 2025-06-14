"use server";

import { Prisma } from "@/app/generated/prisma";
import { PostWithAuthor } from "@/lib/post";
import db from "@/lib/prisma";

export const getAllPosts = async () => {
  const posts: PostWithAuthor[] = await db.post.findMany({
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

"use server";

import db from "@/lib/prisma";

export const getAllUsers = async () => {
  const users = await db.user.findMany();

  return users;
};

export const getUserById = async (id: number) => {
  if (id === 0) return;

  const user = await db.user.findUnique({ where: { id } });

  if (!user) return "User not found";

  return user;
};

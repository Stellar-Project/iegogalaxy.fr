"use server";

import db from "@/lib/prisma";

export const getAllUsers = async () => {
  const users = await db.user.findMany();

  return users;
};

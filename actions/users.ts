"use server";
import { getISOWeek } from "@/lib/date";
import db from "@/lib/prisma";
import { subDays, subMonths, subWeeks } from "date-fns";

export async function getTotalUsers() {
  const count = await db.user.count();
  return count;
}

export const getAllUsers = async () => {
  const users = await db.user.findMany();

  return users;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({ where: { id } });

  if (!user) return "User not found";

  return user;
};

export async function getNewUsersGroupedBy(
  period: "daily" | "weekly" | "monthly"
) {
  let fromDate: Date;

  switch (period) {
    case "daily":
      fromDate = subDays(new Date(), 30); // derniers 30 jours
      break;
    case "weekly":
      fromDate = subWeeks(new Date(), 12); // dernières 12 semaines
      break;
    case "monthly":
      fromDate = subMonths(new Date(), 12); // 12 derniers mois
      break;
    default:
      throw new Error("Invalid period");
  }

  const users = await db.user.findMany({
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

  for (const user of users) {
    let key: string;
    const date = user.createdAt;

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

export async function getActiveInactiveUsers(daysAgo = 30) {
  const activeSince = subDays(new Date(), daysAgo);

  const activeUserIds = await db.session.findMany({
    where: {
      createdAt: {
        gte: activeSince,
      },
    },
    select: {
      userId: true,
    },
    distinct: ["userId"],
  });

  const totalUsers = await db.user.count();
  const activeCount = activeUserIds.length;
  const inactiveCount = totalUsers - activeCount;

  return {
    active: activeCount,
    inactive: inactiveCount,
  };
}

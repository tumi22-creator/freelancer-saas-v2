import { prisma } from "@/lib/prisma";

export async function logActivity(
  userId: string,
  message: string
) {
  await prisma.activity.create({
    data: {
      userId,
      message,
    },
  });
}
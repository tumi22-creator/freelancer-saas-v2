import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function getUser(req: Request) {
  const cookie = req.headers.get("cookie") || "";

  const token = cookie
    .split("token=")[1]
    ?.split(";")[0];

  if (!token) return null;

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string;
    };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const user = getUser(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const activities =
    await prisma.activity.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

  return NextResponse.json(activities);
}
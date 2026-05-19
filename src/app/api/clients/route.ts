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

  const clients = await prisma.client.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(clients);
}

export async function POST(req: Request) {
  const user = getUser(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const client = await prisma.client.create({
    data: {
      name: body.name,
      email: body.email,
      company: body.company,
      userId: user.id,
    },
  });

  return NextResponse.json(client);
}
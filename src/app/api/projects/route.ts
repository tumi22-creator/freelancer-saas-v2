import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function getUser(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.split("token=")[1]?.split(";")[0];

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
const user = getUser(req);
if (!user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

  const projects = await prisma.project.findMany({
    where: { user },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
   const user = getUser(req);
if (!user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

    const body = await req.json();
    const { title, description } = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        user,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
  export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await prisma.project.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
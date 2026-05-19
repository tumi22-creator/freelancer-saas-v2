import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { logActivity } from "@/lib/activity";

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
      email: string;
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

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects);
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

  const project = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description,
      priority: body.priority,
      dueDate: body.dueDate
        ? new Date(body.dueDate)
        : null,
      userId: user.id,
    },
  });

  // LOG ACTIVITY
  await logActivity(
    user.id,
    `Created project: ${project.title}`
  );

  return NextResponse.json(project);
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const project = await prisma.project.update({
    where: {
      id: body.id,
    },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing ID" },
      { status: 400 }
    );
  }

  // FIND PROJECT FIRST
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  // LOG DELETE
  await logActivity(
    project.userId,
    `Deleted project: ${project.title}`
  );

  // DELETE PROJECT
  await prisma.project.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, status } = body;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
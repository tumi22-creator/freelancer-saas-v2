import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, title, status } = body;

    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        ...(title && { title }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
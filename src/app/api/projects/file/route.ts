import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const updated =
      await prisma.project.update({
        where: {
          id: body.projectId,
        },
        data: {
          fileUrl: body.fileUrl,
        },
      });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save file" },
      { status: 500 }
    );
  }
}
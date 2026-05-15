import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // TODO: verify user with Prisma (you already have this)

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET!
  );

  const res = NextResponse.json({ message: "Login successful" });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
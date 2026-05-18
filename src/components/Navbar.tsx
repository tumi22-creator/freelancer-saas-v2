"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b bg-white px-8 py-4">
      <h1 className="text-xl font-bold">
        Freelancer SaaS
      </h1>

      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </div>
    </nav>
  );
}
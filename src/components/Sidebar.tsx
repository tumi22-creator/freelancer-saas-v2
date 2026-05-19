"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-black dark:text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        Freelancer SaaS
      </h1>

      <div className="space-y-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-lg px-4 py-3 transition ${
              pathname === link.href
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="mt-10">
      <ThemeToggle />
    </div>
    </div>
  );
}
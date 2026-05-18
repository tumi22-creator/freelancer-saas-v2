import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-blue-400">
          Freelancer SaaS
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-6xl font-bold max-w-4xl leading-tight">
          Manage Freelancer Projects Like a Pro
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Track projects, manage clients, and organize your freelance business in one dashboard.
        </p>

        <Link
          href="/signup"
          className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
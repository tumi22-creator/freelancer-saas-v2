import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-black dark:text-white">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-blue-400">
          Freelancer SaaS
        </h1>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded-lg border border-white/20 px-5 py-2 hover:bg-white dark:bg-slate-900 dark:bg-slate-900 dark:bg-slate-900/10 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-10 py-24 text-center">
        <h1 className="text-6xl font-extrabold leading-tight">
          Manage Freelance Projects
          <span className="block text-blue-400">
            Like a Professional
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          Organize clients, projects, analytics, deadlines,
          and productivity in one powerful dashboard.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <Link
            href="/signup"
            className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Free
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-white/20 px-8 py-4 text-lg hover:bg-white dark:bg-slate-900 dark:bg-slate-900 dark:bg-slate-900/10 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-10 pb-24 md:grid-cols-3">
        
        <div className="rounded-2xl border border-white/10 bg-white dark:bg-slate-900 dark:bg-slate-900 dark:bg-slate-900/5 p-8 backdrop-blur">
          <h3 className="text-2xl font-bold text-blue-400">
            Project Tracking
          </h3>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Track active and completed freelance projects
            with ease.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white dark:bg-slate-900 dark:bg-slate-900 dark:bg-slate-900/5 p-8 backdrop-blur">
          <h3 className="text-2xl font-bold text-blue-400">
            Analytics
          </h3>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Visualize your work progress and productivity
            through smart insights.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white dark:bg-slate-900 dark:bg-slate-900 dark:bg-slate-900/5 p-8 backdrop-blur">
          <h3 className="text-2xl font-bold text-blue-400">
            Team Collaboration
          </h3>

          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Work with clients and teams in a centralized
            workspace.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-400">
        © 2026 Freelancer SaaS. Built by Tumi.
      </footer>
    </div>
  );
}
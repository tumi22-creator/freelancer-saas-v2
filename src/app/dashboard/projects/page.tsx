"use client";

import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");

    const data = await res.json();

    setProjects(data);
  };

  const moveProject = async (
    id: string,
    status: string
  ) => {
    await fetch("/api/projects", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
      }),
    });

    fetchProjects();
  };

  const todo = projects.filter(
    (p) => p.status === "todo"
  );

  const active = projects.filter(
    (p) => p.status === "active"
  );

  const completed = projects.filter(
    (p) => p.status === "completed"
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Kanban Board
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TODO */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow">
          <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
            Todo
          </h2>

          <div className="space-y-4">
            {todo.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border p-4"
              >
                <h3 className="font-bold">
                  {p.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                  {p.description}
                </p>

                <button
                  onClick={() =>
                    moveProject(
                      p.id,
                      "active"
                    )
                  }
                  className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Start
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ACTIVE */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow">
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            Active
          </h2>

          <div className="space-y-4">
            {active.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border p-4"
              >
                <h3 className="font-bold">
                  {p.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                  {p.description}
                </p>

                <button
                  onClick={() =>
                    moveProject(
                      p.id,
                      "completed"
                    )
                  }
                  className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
                >
                  Complete
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* COMPLETED */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow">
          <h2 className="text-xl font-bold mb-4 text-green-700">
            Completed
          </h2>

          <div className="space-y-4">
            {completed.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border p-4"
              >
                <h3 className="font-bold">
                  {p.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                  {p.description}
                </p>

                <button
                  onClick={() =>
                    moveProject(
                      p.id,
                      "todo"
                    )
                  }
                  className="mt-4 rounded bg-gray-700 px-4 py-2 text-white"
                >
                  Reopen
                </button>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
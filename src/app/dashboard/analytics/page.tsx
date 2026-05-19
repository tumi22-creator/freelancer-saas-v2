"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  status: string;
  priority?: string;
};

export default function AnalyticsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");

    const data = await res.json();

    setProjects(data);
  };

  const total = projects.length;

  const completed = projects.filter(
    (p) => p.status === "completed"
  ).length;

  const active = projects.filter(
    (p) => p.status === "active"
  ).length;

  const todo = projects.filter(
    (p) => p.status === "todo"
  ).length;

  const highPriority = projects.filter(
    (p) => p.priority === "high"
  ).length;

  const pieData = [
    {
      name: "Todo",
      value: todo,
    },
    {
      name: "Active",
      value: active,
    },
    {
      name: "Completed",
      value: completed,
    },
  ];

  const barData = [
    {
      name: "Projects",
      total,
      completed,
      active,
      highPriority,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#10B981",
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 dark:text-black dark:text-white">
        Analytics Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">
          <p className="text-gray-500 dark:text-gray-700 dark:text-gray-300">
            Total Projects
          </p>

          <h2 className="mt-2 text-4xl font-bold dark:text-black dark:text-white">
            {total}
          </h2>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">
          <p className="text-gray-500 dark:text-gray-700 dark:text-gray-300">
            Completed
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {completed}
          </h2>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">
          <p className="text-gray-500 dark:text-gray-700 dark:text-gray-300">
            Active
          </p>

          <h2 className="mt-2 text-4xl font-bold text-yellow-500">
            {active}
          </h2>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">
          <p className="text-gray-500 dark:text-gray-700 dark:text-gray-300">
            High Priority
          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-500">
            {highPriority}
          </h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* PIE CHART */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">
          <h2 className="text-2xl font-bold mb-6 dark:text-black dark:text-white">
            Project Status
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow">
          <h2 className="text-2xl font-bold mb-6 dark:text-black dark:text-white">
            Productivity
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="completed" fill="#10B981" />

                <Bar dataKey="active" fill="#F59E0B" />

                <Bar dataKey="highPriority" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
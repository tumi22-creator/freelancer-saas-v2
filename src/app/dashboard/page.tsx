"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import FileUpload from "@/components/upload-button";
import { Bell } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

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

import { motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
  fileUrl?: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  /* ---------------- STATES ---------------- */

  const [mounted, setMounted] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(false);

  const [latestActivity, setLatestActivity] =
    useState("");

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    fetchProjects();
    fetchActivities();

    const interval = setInterval(() => {
      fetchProjects();
      fetchActivities();
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  /* ---------------- FUNCTIONS ---------------- */

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/projects");

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/activity");

      const data = await res.json();

      setActivities(data);

      if (data.length > 0) {
        setLatestActivity(data[0].message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createProject = async () => {
    if (!title) return;

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate,
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");

      fetchProjects();
    }
  };

  const deleteProject = async (id: string) => {
    await fetch(`/api/projects?id=${id}`, {
      method: "DELETE",
    });

    fetchProjects();
  };

  const toggleStatus = async (
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
        status:
          status === "active"
            ? "completed"
            : "active",
      }),
    });

    fetchProjects();
  };

  const updateProjectStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const projectId = result.draggableId;
    const newStatus =
      result.destination.droppableId;

    updateProjectStatus(
      projectId,
      newStatus
    );
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  /* ---------------- CHART DATA ---------------- */

  const chartData = [
    {
      name: "Active",
      value: projects.filter(
        (p) => p.status === "active"
      ).length,
    },
    {
      name: "Completed",
      value: projects.filter(
        (p) => p.status === "completed"
      ).length,
    },
  ];

  const priorityData = [
    {
      name: "Low",
      value: projects.filter(
        (p) => p.priority === "low"
      ).length,
    },
    {
      name: "Medium",
      value: projects.filter(
        (p) => p.priority === "medium"
      ).length,
    },
    {
      name: "High",
      value: projects.filter(
        (p) => p.priority === "high"
      ).length,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
  ];

  /* ---------------- FIX HYDRATION ---------------- */

  if (!mounted) return null;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-900 dark:via-blue-950 dark:to-slate-950 p-8 text-black dark:text-white transition-all duration-300">

      {/* HEADER */}

      <div className="flex gap-3 mb-8">
        <button
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
          className="rounded-xl bg-white dark:bg-slate-900/40 px-5 py-2 font-semibold backdrop-blur"
        >
          {theme === "dark"
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>

        <button
          onClick={logout}
          className="rounded-xl bg-red-500 px-5 py-2 font-semibold hover:bg-red-600"
        >
          Logout
        </button>

        <a
          href="/clients"
          className="rounded-xl bg-blue-600 px-5 py-2 font-semibold"
        >
          Clients
        </a>
      </div>

      {/* ACTIVITY */}

      {latestActivity && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
          <Bell className="text-blue-400" />

          <div>
            <p className="font-semibold">
              New Activity
            </p>

            <p className="text-sm text-gray-300">
              {latestActivity}
            </p>
          </div>
        </div>
      )}

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="rounded-2xl bg-white dark:bg-slate-900/40 p-6">
          <p>Total Projects</p>

          <h2 className="text-4xl font-bold mt-2">
            {projects.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-500/20 p-6">
          <p>Active</p>

          <h2 className="text-4xl font-bold mt-2">
            {
              projects.filter(
                (p) => p.status === "active"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-2xl bg-green-500/20 p-6">
          <p>Completed</p>

          <h2 className="text-4xl font-bold mt-2">
            {
              projects.filter(
                (p) =>
                  p.status === "completed"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Project Status
          </h2>

          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={80}
                  label
                >
                  {chartData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Priority Overview
          </h2>

          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={priorityData}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#6366F1"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CREATE PROJECT */}

      <div className="mb-10 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg">
  <h2 className="text-2xl font-bold mb-5 text-black dark:text-white">
    Create Project
  </h2>

  <div className="space-y-4">

    <input
      type="text"
      placeholder="Project title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:border-blue-500"
    />

    <textarea
      placeholder="Description"
      value={description}
      onChange={(e) =>
        setDescription(e.target.value)
      }
      className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none focus:border-blue-500"
    />

    <select
      value={priority}
      onChange={(e) =>
        setPriority(e.target.value)
      }
      className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-black dark:text-white outline-none focus:border-blue-500"
    >
      <option value="low">
        Low Priority
      </option>

      <option value="medium">
        Medium Priority
      </option>

      <option value="high">
        High Priority
      </option>
    </select>

    <input
      type="date"
      value={dueDate}
      onChange={(e) =>
        setDueDate(e.target.value)
      }
      className="w-full rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-black dark:text-white outline-none focus:border-blue-500"
    />

    <button
      onClick={createProject}
      className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      Create Project
    </button>

  </div>
</div>

      {/* PROJECTS */}

      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          {["active", "completed"].map(
            (status) => (
              <Droppable
                droppableId={status}
                key={status}
              >
                {(provided) => (
                  <div
                    ref={
                      provided.innerRef
                    }
                    {...provided.droppableProps}
                    className="rounded-2xl bg-white dark:bg-slate-900/40 p-5 min-h-[500px]"
                  >
                    <h2 className="mb-5 text-2xl font-bold capitalize">
                      {status}
                    </h2>

                    <div className="space-y-4">

                      {projects
                        .filter(
                          (p) =>
                            p.status ===
                            status
                        )
                        .map(
                          (
                            p,
                            index
                          ) => (
                            <Draggable
                              key={p.id}
                              draggableId={
                                p.id
                              }
                              index={
                                index
                              }
                            >
                              {(
                                provided
                              ) => (
                                <motion.div
                                  ref={provided.innerRef}
                                  {...(provided.draggableProps as any)}
                                  {...(provided.dragHandleProps as any)}
                                  initial={{
                                    opacity: 0,
                                    y: 20,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 shadow-lg"
                                >
                                  <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold">
                                      {
                                        p.title
                                      }
                                    </h3>

                                    <span className="rounded-full px-3 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-300">
                                      {
                                        p.status
                                      }
                                    </span>
                                  </div>

                                  <p className="mt-3 text-gray-300">
                                    {
                                      p.description
                                    }
                                  </p>

                                  <p className="text-sm text-yellow-400 mt-3">
                                    Priority:{" "}
                                    {p.priority}
                                  </p>

                                  <p className="text-sm text-gray-400 mt-1">
                                    Due:{" "}
                                    {p.dueDate
                                      ? new Date(
                                          p.dueDate
                                        ).toLocaleDateString()
                                      : "No due date"}
                                  </p>

                                  {p.fileUrl && (
  <a
    href={p.fileUrl}
    target="_blank"
    className="mt-2 block text-sm text-blue-500 underline"
  >
    View Uploaded File
  </a>
)}

                                  {/* FILE UPLOAD */}

                                  <div className="mt-4">
                                    <FileUpload
                                      projectId={p.id}
                                      onUploaded={fetchProjects}
                                      />
                                  </div>

                                  <div className="mt-6 flex flex-wrap gap-3">

                                    <button
                                      onClick={() =>
                                        toggleStatus(
                                          p.id,
                                          p.status
                                        )
                                      }
                                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold"
                                    >
                                      {p.status ===
                                      "active"
                                        ? "Complete"
                                        : "Reopen"}
                                    </button>

                                    <button
                                      onClick={() =>
                                        deleteProject(
                                          p.id
                                        )
                                      }
                                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold"
                                    >
                                      Delete
                                    </button>

                                  </div>
                                </motion.div>
                              )}
                            </Draggable>
                          )
                        )}

                      {
                        provided.placeholder
                      }
                    </div>
                  </div>
                )}
              </Droppable>
            )
          )}
        </div>
      </DragDropContext>
    </div>
  );
}
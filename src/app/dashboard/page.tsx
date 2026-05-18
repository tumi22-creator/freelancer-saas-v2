"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  description?: string;
  status: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

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
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      fetchProjects();
    }
  };

  const deleteProject = async (id: string) => {
    await fetch(`/api/projects?id=${id}`, {
      method: "DELETE",
    });

    fetchProjects();
  };

  const completeProject = async (id: string) => {
    await fetch("/api/projects/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: "completed",
      }),
    });

    fetchProjects();
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 p-8 text-white">
      {/* HEADER */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Freelancer Dashboard</h1>
          <p className="text-gray-300 mt-1">
            Manage your client projects easily
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-xl bg-red-500 px-5 py-2 font-semibold transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="rounded-2xl bg-white/10 backdrop-blur p-6 border border-white/10">
          <p className="text-gray-300">Total Projects</p>
          <h2 className="text-4xl font-bold mt-2">
            {projects.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-blue-500/20 backdrop-blur p-6 border border-blue-400/20">
          <p className="text-blue-200">Active</p>
          <h2 className="text-4xl font-bold mt-2">
            {
              projects.filter(
                (p) => p.status === "active"
              ).length
            }
          </h2>
        </div>

        <div className="rounded-2xl bg-green-500/20 backdrop-blur p-6 border border-green-400/20">
          <p className="text-green-200">Completed</p>
          <h2 className="text-4xl font-bold mt-2">
            {
              projects.filter(
                (p) => p.status === "completed"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* CREATE PROJECT */}
      <div className="mb-10 rounded-2xl bg-white/10 backdrop-blur p-6 border border-white/10">
        <h2 className="text-2xl font-bold mb-5">
          Create Project
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={createProject}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </div>

      {/* PROJECTS */}
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl bg-white/10 p-10 text-center">
  <h2 className="text-2xl font-bold">
    No projects yet
  </h2>

  <p className="mt-2 text-gray-300">
    Create your first freelancer project.
  </p>
</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-5"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold">
                  {p.title}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    p.status === "completed"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <p className="mt-3 text-gray-300">
                {p.description}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() =>
                    completeProject(p.id)
                  }
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold hover:bg-green-700"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    deleteProject(p.id)
                  }
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700"
                >
                  Delete
                </button>

                <button
  onClick={async () => {
    const newTitle = prompt("New project title");

    if (!newTitle) return;

    await fetch("/api/projects/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: p.id,
        title: newTitle,
      }),
    });

    fetchProjects();
  }}
  className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold hover:bg-yellow-600"
>
  Edit
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
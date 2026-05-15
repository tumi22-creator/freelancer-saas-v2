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
    ;

    if (!token) {
      router.push("/login");
      return;
    }

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
  setLoading(true);

  const res = await fetch("/api/projects");
  const data = await res.json();

  setProjects(data);
  setLoading(false);
};

  const createProject = async () => {
  ;

  const res = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const deleteProject = async (id: string) => {
  await fetch(`/api/projects?id=${id}`, {
    method: "DELETE",
  });

  fetchProjects();
};

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={logout}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
  <div className="p-4 border rounded-xl bg-white">
    <p className="text-sm text-gray-500">Total</p>
    <p className="text-2xl font-bold">{projects.length}</p>
  </div>

  <div className="p-4 border rounded-xl bg-white">
    <p className="text-sm text-gray-500">Active</p>
    <p className="text-2xl font-bold">
      {projects.filter(p => p.status === "active").length}
    </p>
  </div>

  <div className="p-4 border rounded-xl bg-white">
    <p className="text-sm text-gray-500">Completed</p>
    <p className="text-2xl font-bold">
      {projects.filter(p => p.status === "completed").length}
    </p>
  </div>
</div>

      {/* PROJECT CARDS */}
   <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
  {loading ? (
    <p>Loading projects...</p>
  ) : projects.length === 0 ? (
    <p>No projects yet</p>
  ) : (
    projects.map((p) => (
      <div key={p.id} className="border rounded-xl p-4 bg-white">
        <h3 className="font-bold">{p.title}</h3>

        <p className="text-gray-600">{p.description}</p>

        <span className="text-sm text-green-600 block mt-1">
          {p.status}
        </span>

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => deleteProject(p.id)}
            className="text-sm text-red-500"
          >
            Delete
          </button>

          <button
            onClick={() => {
              setEditId(p.id);
              setEditTitle(p.title);
            }}
            className="text-sm text-blue-500"
          >
            Edit
          </button>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
} 
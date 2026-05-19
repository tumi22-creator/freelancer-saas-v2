"use client";

import { useEffect, useState } from "react";

type Client = {
  id: string;
  name: string;
  email: string;
  company?: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const fetchClients = async () => {
    const res = await fetch("/api/clients");

    const data = await res.json();

    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const createClient = async () => {
    await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company,
      }),
    });

    setName("");
    setEmail("");
    setCompany("");

    fetchClients();
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">
        Clients
      </h1>

      <div className="mb-10 rounded-2xl bg-white/10 p-6">
        <div className="space-y-4">
          <input
            placeholder="Client name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-xl p-3 text-black"
          />

          <input
            placeholder="Client email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl p-3 text-black"
          />

          <input
            placeholder="Company"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
            className="w-full rounded-xl p-3 text-black"
          />

          <button
            onClick={createClient}
            className="rounded-xl bg-blue-600 px-5 py-3"
          >
            Add Client
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="rounded-2xl bg-white/10 p-5"
          >
            <h2 className="text-2xl font-bold">
              {client.name}
            </h2>

            <p className="mt-2 text-gray-300">
              {client.email}
            </p>

            <p className="mt-1 text-blue-300">
              {client.company}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
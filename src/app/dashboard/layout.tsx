import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-slate-100 dark:bg-slate-950 min-h-screen p-8 transition-colors">
        {children}
      </main>
    </div>
  );
}
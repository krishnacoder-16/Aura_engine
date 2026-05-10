import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aura Engine | Dashboard",
  description: "Enterprise Inventory Management",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r bg-white dark:bg-zinc-950 hidden md:block">
        <div className="p-6 font-bold text-xl text-zinc-900 dark:text-zinc-50">
          Aura Engine
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Topbar Placeholder */}
        <header className="h-16 border-b bg-white dark:bg-zinc-950 flex items-center px-6">
          <span className="text-sm text-zinc-500">Dashboard</span>
        </header>

        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

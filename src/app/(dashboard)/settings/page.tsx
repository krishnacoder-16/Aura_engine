import PageHeader from "@/components/shared/PageHeader";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your system preferences and configuration." />
      <div className="rounded-2xl border border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <span className="text-2xl">⚙️</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">Settings Module</h2>
        <p className="text-muted-foreground max-w-sm mt-2">
          This module is currently under development. Here you will be able to configure system-wide settings, user permissions, and integrations.
        </p>
      </div>
    </>
  );
}

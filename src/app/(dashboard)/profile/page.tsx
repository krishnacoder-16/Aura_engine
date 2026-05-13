import PageHeader from "@/components/shared/PageHeader";

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="User Profile" subtitle="Manage your personal information and preferences." />
      <div className="rounded-2xl border border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground">User Profile</h2>
        <p className="text-muted-foreground max-w-sm mt-2">
          This module is currently under development. Here you will be able to manage your account details, security settings, and notification preferences.
        </p>
      </div>
    </>
  );
}

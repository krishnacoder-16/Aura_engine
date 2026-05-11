import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Aura Engine | Enterprise Inventory Management",
  description:
    "Aura Engine — Professional enterprise inventory management dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}

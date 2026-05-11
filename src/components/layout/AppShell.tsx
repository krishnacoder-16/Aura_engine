"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileSidebar from "@/components/layout/MobileSidebar";
import DashboardContainer from "@/components/layout/DashboardContainer";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />

      {/* Mobile Sidebar Drawer */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Right Column: Header + Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMobileMenuToggle={() => setMobileOpen(true)} />
        <DashboardContainer>{children}</DashboardContainer>
      </div>
    </div>
  );
}

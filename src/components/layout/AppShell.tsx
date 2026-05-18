"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileSidebar from "@/components/layout/MobileSidebar";
import DashboardContainer from "@/components/layout/DashboardContainer";
import CommandPalette from "@/features/search/components/CommandPalette";

interface AppShellProps {
  children: React.ReactNode;
}

import { useSettings } from "@/context/SettingsContext";

export default function AppShell({ children }: AppShellProps) {
  const { sidebarCollapsed, updateInstantSetting } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global command palette shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSidebar = () => {
    updateInstantSetting({ sidebarCollapsed: !sidebarCollapsed });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Mobile Sidebar Drawer */}
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Right Column: Header + Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header 
          onMobileMenuToggle={() => setMobileOpen(true)} 
        />
        <DashboardContainer>{children}</DashboardContainer>
      </div>

      {/* Global Search / Command Palette Overlay */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
      />
    </div>
  );
}

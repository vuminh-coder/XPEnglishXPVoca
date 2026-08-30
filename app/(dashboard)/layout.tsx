"use client";
import React from "react";
import Navbar from "@/shared/components/layout/Navbar";
import Sidebar from "@/shared/components/layout/Sidebar";
import BottomNav from "@/shared/components/layout/BottomNav";
import { ToastContainer } from "@/shared/components/ui/Toast";
import { useUiStore } from "@/stores/uiStore";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed, hideBottomNav } = useUiStore();
  const pathname = usePathname();
  const isExamWorkspaceActive = (pathname === "/study/exam-prep" || pathname?.startsWith("/study/exams")) && sidebarCollapsed;
  const isStudioWorkspaceActive = (pathname?.startsWith("/study/listening") || pathname?.startsWith("/study/shadowing") || pathname?.startsWith("/study/reading")) && hideBottomNav;

  return (
    <>
      <aside id="app-sidebar">
        <Sidebar />
      </aside>
      <main
        id="app-content"
        className={`main-content no-right-sidebar !p-0 ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        } ${isExamWorkspaceActive ? "exam-workspace-active" : ""} ${
          isStudioWorkspaceActive ? "studio-workspace-active" : ""
        }`}
      >
        <div id="app-view-container" className="animate-fade-in">
          {children}
        </div>
      </main>
      <BottomNav />
      <ToastContainer />
    </>
  );
}

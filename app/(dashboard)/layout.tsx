"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import { ToastContainer } from "@/components/ui/Toast";
import { useUiStore } from "@/lib/store/uiStore";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useUiStore();
  const pathname = usePathname();
  const isExamWorkspaceActive = (pathname?.startsWith("/study/exam-prep") || pathname?.startsWith("/study/exams")) && sidebarCollapsed;
  const isStudioWorkspaceActive = pathname?.startsWith("/study/listening") || pathname?.startsWith("/study/shadowing");

  return (
    <>
      {!isExamWorkspaceActive && !isStudioWorkspaceActive && (
        <header id="app-header" className="md:hidden">
          <Navbar />
        </header>
      )}
      <aside id="app-sidebar">
        <Sidebar />
      </aside>
      <main
        id="app-content"
        className={`main-content no-right-sidebar ${
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

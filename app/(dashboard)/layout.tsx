"use client";
import React, { Suspense, useEffect } from "react";
import Sidebar from "@/shared/components/layout/Sidebar";
import BottomNav from "@/shared/components/layout/BottomNav";
import { ToastContainer } from "@/shared/components/ui/Toast";
import { useUiStore } from "@/stores/uiStore";
import { useUserStore } from "@/stores/userStore";
import { usePathname, useSearchParams } from "next/navigation";

function DashboardSearchSync({ onSearchChange }: { onSearchChange: (search: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    onSearchChange(searchParams?.toString() || "");
  }, [searchParams, onSearchChange]);
  return null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed, hideBottomNav } = useUiStore();
  const pathname = usePathname();
  const [searchStr, setSearchStr] = React.useState("");

  useEffect(() => {
    useUserStore.getState().checkSession();
  }, []);

  const isExamWorkspaceActive =
    (pathname === "/study/exam-prep" || pathname?.startsWith("/study/exams")) &&
    sidebarCollapsed;

  const isClientStudioRoute = Boolean(
    searchStr.includes("id=") ||
    searchStr.includes("lessonId=") ||
    pathname?.includes("/comprehension")
  );

  const isStudioPracticeRoute = Boolean(
    pathname?.startsWith("/study/dictation") ||
    pathname?.startsWith("/study/listening") ||
    pathname?.startsWith("/study/shadowing") ||
    pathname?.startsWith("/study/reading")
  );

  const isStudioWorkspaceActive =
    isStudioPracticeRoute && (hideBottomNav || isClientStudioRoute);

  return (
    <>
      <Suspense fallback={null}>
        <DashboardSearchSync onSearchChange={setSearchStr} />
      </Suspense>
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

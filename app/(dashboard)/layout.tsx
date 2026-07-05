"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import BottomNav from "@/components/layout/BottomNav";
import { ToastContainer } from "@/components/ui/Toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header id="app-header">
        <Navbar />
      </header>
      <aside id="app-sidebar">
        <Sidebar />
      </aside>
      <main id="app-content" className="main-content">
        <div id="app-view-container" className="animate-fade-in">
          {children}
        </div>
      </main>
      <aside id="app-right-sidebar">
        <RightSidebar />
      </aside>
      <BottomNav />
      <ToastContainer />
    </>
  );
}

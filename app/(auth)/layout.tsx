'use client';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="app-content" className="main-content no-sidebars !mt-0 !pt-0 min-h-screen">
      <div id="app-view-container" className="w-full min-h-screen">
        {children}
      </div>
    </main>
  );
}

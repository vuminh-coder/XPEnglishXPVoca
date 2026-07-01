'use client';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="app-content" className="main-content no-sidebars">
      <div id="app-view-container">
        {children}
      </div>
    </main>
  );
}

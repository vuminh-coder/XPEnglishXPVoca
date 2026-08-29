"use client";
import React from "react";
import { ListeningListingSkeleton } from "@/features/listening/components/LoadingSkeletons";

/**
 * Next.js loading.tsx — hiển thị Listing skeleton mặc định.
 * Studio skeleton sẽ được render bên trong page.tsx khi có ?id= nhưng data chưa sẵn sàng.
 */
export default function ListeningLoading() {
  return <ListeningListingSkeleton />;
}

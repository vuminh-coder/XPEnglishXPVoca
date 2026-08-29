"use client";
import React from "react";
import { ShadowingListingSkeleton } from "@/features/shadowing/components/LoadingSkeletons";

/**
 * Next.js loading.tsx — hiển thị Listing skeleton mặc định.
 * Studio skeleton sẽ được render bên trong page.tsx khi có ?id= nhưng data chưa sẵn sàng.
 */
export default function ShadowingLoading() {
  return <ShadowingListingSkeleton />;
}

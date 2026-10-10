"use client";

import React, { use, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ReadingPracticeStudio,
  ReadingStudioSkeleton,
  READING_PASSAGES_DATA,
} from "@/features/reading";
import { useReadingCatalogStore } from "@/stores/readingCatalogStore";
import { ArrowLeft, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

function ReadingPracticePageContent({ targetId }: { targetId?: string }) {
  const router = useRouter();
  const routeParams = useParams();
  const rawId = (targetId || (routeParams?.id as string) || "").trim();

  // 1. Frame-0 Synchronous Passage Probe via Zustand Store & In-Memory Catalog
  const cachedPassage = useReadingCatalogStore(
    (s) => s.passageDetailCache[rawId]?.data || s.passageDetailCache[rawId.toLowerCase()]?.data
  );

  const passage = React.useMemo(() => {
    if (cachedPassage) return cachedPassage;
    if (!rawId) return null;

    const direct = READING_PASSAGES_DATA.find(
      (p) => p.id === rawId || p.id.toLowerCase() === rawId.toLowerCase()
    );
    if (direct) return direct;

    if (/^\d+$/.test(rawId)) {
      const prefixed = READING_PASSAGES_DATA.find((p) => p.id === `r${rawId}`);
      if (prefixed) return prefixed;
    }
    return null;
  }, [rawId, cachedPassage]);

  // Background SWR passage detail registration
  React.useEffect(() => {
    if (rawId) {
      useReadingCatalogStore.getState().fetchPassageDetail(rawId);
    }
  }, [rawId]);

  if (!rawId) {
    return <ReadingStudioSkeleton />;
  }

  if (!passage) {
    return (
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 font-display">
          Không tìm thấy bài đọc yêu cầu
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed">
          Bài đọc mã &quot;{rawId}&quot; không tồn tại hoặc đã được cập nhật. Vui lòng chọn bài đọc khác từ danh mục.
        </p>
        <button
          onClick={() => router.push("/study/reading")}
          className="px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-[#0059bb]/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh mục bài đọc</span>
        </button>
      </div>
    );
  }

  return (
    <ReadingPracticeStudio
      passage={passage}
      allPassages={READING_PASSAGES_DATA}
      onBack={() => router.push("/study/reading")}
    />
  );
}

export default function ReadingPracticeRoutePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  return (
    <Suspense fallback={<ReadingStudioSkeleton />}>
      <ReadingPracticePageContent targetId={id} />
    </Suspense>
  );
}

import { SkeletonChat } from "@/components/shared/SkeletonLoaders";

export default function AiLoading() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="h-8 w-48 bg-slate-200 dark:bg-neutral-850 rounded-lg mb-6 animate-pulse" />
      <SkeletonChat />
    </div>
  );
}

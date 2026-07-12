import { SkeletonCard } from "@/components/shared/SkeletonLoaders";

export default function CommunityLoading() {
  return (
    <div className="space-y-6 p-4 md:p-8 animate-pulse">
      <div className="h-8 w-48 bg-slate-200 dark:bg-neutral-850 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

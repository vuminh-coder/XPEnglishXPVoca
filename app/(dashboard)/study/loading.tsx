import { SkeletonExercise } from "@/shared/components/feedback/SkeletonLoaders";

export default function StudyLoading() {
  return (
    <div className="p-4 md:p-8">
      <SkeletonExercise />
    </div>
  );
}

import { SkeletonVocabList } from "@/components/shared/SkeletonLoaders";

export default function VocabularyLoading() {
  return (
    <div className="p-4 md:p-8">
      <SkeletonVocabList />
    </div>
  );
}

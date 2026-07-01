import { Vocabulary } from '@/types';
import VocabularyCard from './VocabularyCard';

export default function VocabularyList({ list }: { list: Vocabulary[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {list.map(v => (
        <VocabularyCard key={v.id} vocab={v} />
      ))}
    </div>
  );
}
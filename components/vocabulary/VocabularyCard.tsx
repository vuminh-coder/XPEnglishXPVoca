import { Vocabulary } from '@/types';

export default function VocabularyCard({ vocab }: { vocab: Vocabulary }) {
  return (
    <div className="p-5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl">
      <h4 className="font-bold text-lg text-cyan-500">{vocab.word}</h4>
      <p className="text-xs text-gray-400">{vocab.phonetic}</p>
      <p className="text-sm font-semibold mt-2">{vocab.definitionVn}</p>
    </div>
  );
}
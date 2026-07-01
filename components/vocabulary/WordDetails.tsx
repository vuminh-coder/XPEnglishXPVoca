import { Vocabulary } from '@/types';

export default function WordDetails({ vocab }: { vocab: Vocabulary }) {
  return (
    <div className="p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-3xl">
      <h3 className="text-2xl font-bold">{vocab.word}</h3>
      <span className="text-xs font-bold text-cyan-500">{vocab.pos}</span>
      <p className="text-sm mt-3">{vocab.definitionVn}</p>
      <p className="text-xs text-gray-500 mt-1 italic">{vocab.definition}</p>
    </div>
  );
}
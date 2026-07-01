export default function PostCard({ author, content }: { author: string, content: string }) {
  return (
    <div className="p-4 border rounded-2xl bg-white dark:bg-gray-900">
      <div className="font-bold text-sm mb-2">{author}</div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{content}</p>
    </div>
  );
}
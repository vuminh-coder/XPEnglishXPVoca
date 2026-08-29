export default function LevelBadge({ level, title }: { level: number, title: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 rounded-full font-bold text-xs">
      ⭐ Cấp độ {level} • {title}
    </div>
  );
}
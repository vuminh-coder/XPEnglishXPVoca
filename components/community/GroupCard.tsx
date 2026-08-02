export default function GroupCard({ name }: { name: string }) {
  return (
    <div className="p-4 border rounded-xs bg-white dark:bg-gray-900">
      <div className="font-bold text-sm">{name}</div>
      <button className="mt-3 px-3 py-1 bg-cyan-500 text-white rounded-xs text-xs">Tham gia</button>
    </div>
  );
}
export default function GroupCard({ name }: { name: string }) {
  return (
    <div className="p-4 border rounded-2xl bg-white dark:bg-gray-900">
      <h4 className="font-bold">{name}</h4>
      <button className="mt-3 px-3 py-1 bg-cyan-500 text-white rounded-lg text-xs">Tham gia</button>
    </div>
  );
}
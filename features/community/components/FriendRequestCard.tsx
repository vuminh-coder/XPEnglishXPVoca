export default function FriendRequestCard({ name }: { name: string }) {
  return (
    <div className="p-4 border rounded-xs flex justify-between items-center">
      <span className="font-bold text-sm">{name}</span>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-500 text-white rounded-xs text-xs">Đồng ý</button>
        <button className="px-3 py-1 border rounded-xs text-xs">Từ chối</button>
      </div>
    </div>
  );
}
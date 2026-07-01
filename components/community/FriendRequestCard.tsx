export default function FriendRequestCard({ name }: { name: string }) {
  return (
    <div className="p-4 border rounded-xl flex justify-between items-center">
      <span className="text-sm font-bold">{name} muốn kết bạn</span>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs">Đồng ý</button>
        <button className="px-3 py-1 border rounded-lg text-xs">Từ chối</button>
      </div>
    </div>
  );
}
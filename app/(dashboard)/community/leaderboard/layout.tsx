import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng Xếp Hạng Học Viên (Leaderboard)",
  description:
    "Bảng vinh danh top học viên chăm chỉ: Xếp hạng theo tuần, tháng và chuỗi ngày học liên tục.",
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

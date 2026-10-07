import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng Điều Khiển Học Tập (Dashboard)",
  description:
    "Tổng quan tiến trình học tập, chuỗi ngày học Streak, mục tiêu hàng ngày và các lối tắt luyện tập thông minh.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

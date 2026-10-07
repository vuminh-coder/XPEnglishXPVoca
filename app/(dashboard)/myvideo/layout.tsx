import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Của Tôi (My Videos)",
  description:
    "Thư viện video tiếng Anh cá nhân: Lưu trữ bài học video yêu thích, quản lý tiến độ học nghe và xem lại lịch sử.",
};

export default function MyVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

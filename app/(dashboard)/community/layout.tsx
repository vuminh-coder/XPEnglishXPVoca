import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cộng Đồng Học Viên (Community)",
  description:
    "Giao lưu học tập cùng cộng đồng người học tiếng Anh: Chia sẻ kinh nghiệm, thảo luận bài học và cùng nhau tiến bộ mỗi ngày.",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

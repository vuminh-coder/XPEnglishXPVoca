import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lộ Trình Học Cá Nhân Hóa (Roadmap)",
  description:
    "Lộ trình học tiếng Anh theo mục tiêu: TOEIC, IELTS, Giao tiếp hoặc Tiếng Anh công sở với từng mốc học cụ thể mỗi ngày.",
};

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

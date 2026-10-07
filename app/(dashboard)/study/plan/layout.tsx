import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kế Hoạch Học Tập (Study Plan)",
  description:
    "Kế hoạch học tập cá nhân hóa: Thiết lập mục tiêu hàng ngày, theo dõi nhiệm vụ và tích lũy XP thăng hạng.",
};

export default function StudyPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

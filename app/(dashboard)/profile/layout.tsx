import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ Sơ Cá Nhân (Profile)",
  description:
    "Xem thành tích học tập, huy hiệu đã đạt được, cấp độ hiện tại và lịch sử hoạt động trên XP English.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

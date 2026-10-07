import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gói Hội Viên Cao Cấp (Premium VIP)",
  description:
    "Nâng cấp gói Premium VIP: Mở khóa không giới hạn bài học, nhận diện giọng nói AI không giới hạn và tính năng nâng cao.",
};

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

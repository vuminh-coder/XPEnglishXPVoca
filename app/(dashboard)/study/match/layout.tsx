import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nối Cặp Từ Phản Xạ (Match Pairs) | XP English",
  description:
    "Rèn luyện phản xạ nhận diện mặt chữ và nối cặp từ vựng song ngữ Anh - Việt siêu tốc theo chủ đề bài học.",
};

export default function MatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

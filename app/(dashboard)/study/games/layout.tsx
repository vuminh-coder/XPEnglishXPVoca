import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Games & Thử Thách Tiếng Anh",
  description:
    "Kho trò chơi học từ vựng thú vị: Nối từ, giải đố chữ, săn kho báu và rèn luyện phản xạ ngữ nghĩa cùng người học khác.",
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

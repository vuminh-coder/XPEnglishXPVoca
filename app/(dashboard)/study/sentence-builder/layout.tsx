import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ghép Từ Thành Câu (Sentence Builder) | XP English",
  description:
    "Sắp xếp các khối từ vựng (Word Bank Tiles) thành câu giao tiếp hoàn chỉnh chuẩn ngữ pháp theo từng Unit.",
};

export default function SentenceBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

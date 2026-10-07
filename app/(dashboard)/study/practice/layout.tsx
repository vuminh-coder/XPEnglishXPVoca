import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luyện Tập Từ Vựng (Practice)",
  description:
    "Luyện tập từ vựng chuyên sâu với phương pháp Spaced Repetition SRS, flashcard tương tác và bài kiểm tra phản xạ đa dạng.",
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

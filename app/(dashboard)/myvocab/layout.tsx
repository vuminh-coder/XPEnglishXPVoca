import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sổ Tay Từ Vựng Của Tôi (My Vocabulary)",
  description:
    "Sổ tay từ vựng thông minh: Quản lý từ đã lưu, cấp độ ghi nhớ SRS, ghi chú ngữ cảnh và lịch ôn tập định kỳ.",
};

export default function MyVocabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

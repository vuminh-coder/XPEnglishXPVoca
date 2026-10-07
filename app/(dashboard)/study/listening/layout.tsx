import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luyện Nghe Chép Chính Tả (Dictation)",
  description:
    "Phòng luyện nghe chép chính tả tiếng Anh từng câu: Phụ đề song ngữ, phiên âm IPA chuẩn, tra từ điển một chạm và chấm điểm thời gian thực.",
};

export default function ListeningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

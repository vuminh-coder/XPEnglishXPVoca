import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng Phiên Âm Quốc Tế (IPA Pronunciation)",
  description:
    "Bảng phiên âm quốc tế IPA tương tác chuẩn Anh - Mỹ, hướng dẫn khẩu hình miệng, so sánh cặp âm tối thiểu (minimal pairs) và bài tập nhận diện âm.",
};

export default function IpaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

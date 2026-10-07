import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ôn Tập Ngắt Quãng (Spaced Repetition SRS)",
  description:
    "Thuật toán lặp lại ngắt quãng khoa học: Tối ưu hóa trí nhớ dài hạn, tự động lên lịch ôn tập cho các từ vựng đến hạn.",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

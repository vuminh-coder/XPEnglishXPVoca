import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gia Sư Tiếng Anh AI (AI Tutor)",
  description:
    "Trợ lý gia sư AI đồng hành 1-on-1: Giải đáp mọi thắc mắc ngữ pháp, chỉnh sửa lỗi phát âm và hướng dẫn phương pháp học hiệu quả.",
};

export default function AiTutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

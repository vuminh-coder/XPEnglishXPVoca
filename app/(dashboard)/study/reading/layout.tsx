import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luyện Đọc & Phân Tích Đoạn Văn (Reading)",
  description:
    "Luyện đọc hiểu tiếng Anh theo chủ đề, phân tích ngữ pháp câu văn, tra từ vựng ngữ cảnh một chạm và trắc nghiệm kiểm tra độ hiểu.",
};

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phòng Luyện Thi Chuẩn | Thi Thử TOEIC & IELTS",
  description:
    "Phòng luyện thi thử chứng chỉ tiếng Anh chuẩn format TOEIC, IELTS, VSTEP với đồng hồ đếm ngược, phân tích kết quả và gợi ý lộ trình AI.",
};

export default function ExamPrepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

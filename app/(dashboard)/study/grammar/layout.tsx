import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cẩm Nang Ngữ Pháp (Grammar)",
  description:
    "Hệ thống ngữ pháp tiếng Anh từ căn bản đến nâng cao: Giải thích trực quan, ví dụ song ngữ thực tế và bài tập ứng dụng thông minh.",
};

export default function GrammarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

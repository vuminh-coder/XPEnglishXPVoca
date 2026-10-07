import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luyện Giao Tiếp Với AI (AI Chat)",
  description:
    "Luyện hội thoại tiếng Anh nhập vai cùng AI theo đa dạng tình huống thực tế, nhận gợi ý từ vựng và chấm điểm độ lưu loát.",
};

export default function AiConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

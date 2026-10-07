import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kho Từ Vựng Theo Chủ Đề",
  description:
    "Kho từ vựng tiếng Anh phong phú theo cấp độ CEFR A1-C2, đề thi TOEIC/IELTS và chủ đề giao tiếp thực tế.",
};

export default function VocabularyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

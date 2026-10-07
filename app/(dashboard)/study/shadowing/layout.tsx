import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luyện Nói Nhại Âm (Shadowing)",
  description:
    "Phòng luyện nói nhại âm Shadowing chuẩn người bản xứ với AI chấm điểm chi tiết 6 tiêu chí phát âm và ngữ điệu.",
};

export default function ShadowingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

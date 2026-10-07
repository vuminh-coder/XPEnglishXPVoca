import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đấu Trường Đối Kháng (PvP Arena)",
  description:
    "Đấu trường đối kháng 1vs1 theo thời gian thực: Thi đấu từ vựng, phản xạ nghe và leo bảng xếp hạng mùa giải.",
};

export default function PvpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thống Kê Tiến Độ Học Tập (Analytics)",
  description:
    "Báo cáo phân tích chuyên sâu về thời gian học, số lượng từ đã nhớ, tỉ lệ chính xác và biểu đồ phát triển kỹ năng toàn diện.",
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

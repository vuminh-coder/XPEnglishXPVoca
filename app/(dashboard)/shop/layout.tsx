import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cửa Hàng Vật Phẩm & Huy Hiệu (Shop)",
  description:
    "Đổi xu thưởng tích lũy lấy khung đại diện độc quyền, bảo hiểm chuỗi Streak và nhiều vật phẩm giá trị.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

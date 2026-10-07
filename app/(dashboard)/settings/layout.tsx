import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cài Đặt Tài Khoản (Settings)",
  description:
    "Quản lý thông tin tài khoản, giọng đọc TTS mặc định, nhắc nhở học tập hàng ngày và tùy chọn hiển thị.",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

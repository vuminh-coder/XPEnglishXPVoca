// app/layout.tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import ClientClerkWrapper from "@/components/ClientClerkWrapper";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "XP English / XP Voca - Cộng Đồng Học Từ Vựng Tiếng Anh Thông Minh",
  description:
    "XP English (XP Voca) là nền tảng học từ vựng tiếng Anh cộng đồng thế hệ mới. Ứng dụng lặp lại ngắt quãng (Spaced Repetition) thông minh và luyện hội thoại với AI.",
  manifest: "/manifest.json?v=12",
  keywords: [
    "learn english",
    "study vocabulary",
    "tiếng anh",
    "spaced repetition",
    "học từ vựng",
    "ai english tutor",
  ],
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png?v=12", sizes: "32x32" },
      { url: "/icons/icon-any-192x192.png?v=12", sizes: "192x192" },
    ],
    shortcut: "/icons/favicon-32x32.png?v=12",
    apple: [{ url: "/icons/apple-touch-icon.png?v=12", sizes: "180x180" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-theme="light">
      <body
        className={`${beVietnamPro.className} ${beVietnamPro.variable} antialiased border-0`}
      >
        <ClientClerkWrapper>{children}</ClientClerkWrapper>
      </body>
    </html>
  );
}

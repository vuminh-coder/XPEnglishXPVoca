// app/layout.tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import ClientAuthWrapper from "@/components/ClientClerkWrapper";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "XP English / XP Voca - Cộng Đồng Học Từ Vựng Tiếng Anh Thông Minh",
  description:
    "XP English (XP Voca) là nền tảng học từ vựng tiếng Anh cộng đồng thế hệ mới. Ứng dụng lặp lại ngắt quãng (Spaced Repetition) thông minh và luyện hội thoại với AI.",
  manifest: "/manifest.json?v=25",
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
      { url: "/icons/icon-any-192x192.png?v=25", sizes: "192x192" },
      { url: "/icons/icon-any-512x512.png?v=25", sizes: "512x512" },
      { url: "/app-icon-horizontal-brand.png?v=25", sizes: "512x512" },
    ],
    shortcut: "/icons/icon-any-192x192.png?v=25",
    apple: [
      { url: "/icons/apple-touch-icon.png?v=25", sizes: "180x180" },
      { url: "/apple-touch-icon.png?v=25", sizes: "180x180" },
    ],
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
    <html lang="vi" data-theme="light" data-scroll-behavior="smooth">
      <body
        className={`${beVietnamPro.className} ${beVietnamPro.variable} antialiased border-0`}
      >
        <ClientAuthWrapper>{children}</ClientAuthWrapper>
      </body>
    </html>
  );
}

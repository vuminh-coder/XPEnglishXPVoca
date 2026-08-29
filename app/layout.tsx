// app/layout.tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import ClientAuthWrapper from "@/shared/components/providers/ClientClerkWrapper";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "English | Voca - Cộng Đồng Học Từ Vựng Tiếng Anh Thông Minh",
  description:
    "XP English (XP Voca) là nền tảng học từ vựng tiếng Anh cộng đồng thế hệ mới. Ứng dụng lặp lại ngắt quãng (Spaced Repetition) thông minh và luyện hội thoại với AI.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "XP English",
    startupImage: ["/icons/icon-any-512x512.png"],
  },
  formatDetection: {
    telephone: false,
  },
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-any-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-any-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0f" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${beVietnamPro.className} ${beVietnamPro.variable} antialiased border-0`}
        suppressHydrationWarning
      >
        <ClientAuthWrapper>{children}</ClientAuthWrapper>
      </body>
    </html>
  );
}

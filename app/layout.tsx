// app/layout.tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import ClientAuthWrapper from "@/shared/components/providers/ClientAuthWrapper";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "XP English - Nền Tảng Học Tiếng Anh Thông Minh",
    template: "%s | XP English",
  },
  description:
    "XP English (XP Voca) là nền tảng học tiếng Anh thông minh: Luyện nghe chép chính tả (Dictation), nhại âm (Shadowing), từ vựng Spaced Repetition SRS và gia sư AI.",
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

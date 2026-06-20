import type { Metadata } from "next";
import "./globals.css";
import site from "../site.config.json";

export const metadata: Metadata = {
  title: `${site.title} ｜ ${site.subtitle}`,
  description: site.description,
  keywords: site.keywords,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

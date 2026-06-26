import type { Metadata } from "next";
import "./globals.css";
import Analytics from "./Analytics";
import site from "../site.config.json";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: `${site.title} ｜ ${site.subtitle}`,
  description: site.description,
  keywords: site.keywords,
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

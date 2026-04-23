import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { siteConfig } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.meta.title,
    template: `%s | ${siteConfig.brand}`
  },
  description: siteConfig.meta.description,
  keywords: [
    "Long",
    "Long Studio",
    "个人网站",
    "学习笔记",
    "个人分享",
    "小商店",
    "Stripe Payment Link"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.url,
    siteName: siteConfig.brand,
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-bg" />
        <div className="site-frame">
          <SiteHeader />
          <main className="page-shell">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

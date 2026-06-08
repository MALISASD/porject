import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LoveEventsNetlifyForm } from "@/components/love-events-netlify-form";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { StarBoxProvider } from "@/components/star-box";
import { siteConfig } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.meta.title,
    template: `%s | ${siteConfig.brand}`
  },
  description: siteConfig.meta.description,
  keywords: ["琳宝", "礼物站", "互动", "回忆", "Long", "Netlify"],
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
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <div className="site-bg" />
        <StarBoxProvider>
          <div className="site-frame">
            <SiteHeader />
            <main className="page-shell">{children}</main>
            <SiteFooter />
            <LoveEventsNetlifyForm />
          </div>
        </StarBoxProvider>
      </body>
    </html>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

import { navigation, siteConfig } from "@/data/site";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

type ContentCardProps = {
  title: string;
  description: string;
  meta?: string;
  href?: string;
  cta?: string;
  external?: boolean;
};

function linkProps(external?: boolean) {
  return external ? { target: "_blank", rel: "noreferrer" } : {};
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external
}: ButtonLinkProps) {
  const className = `button-link button-${variant}`;

  if (external) {
    return (
      <a className={className} href={href} {...linkProps(true)}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark">L</span>
          <span>
            <strong>{siteConfig.brand}</strong>
            <span className="brand-subtitle">{siteConfig.studio}</span>
          </span>
        </Link>

        <nav aria-label="主导航" className="site-nav">
          {navigation.map((item) => (
            <Link
              className={item.label === "卡包" ? "site-nav-pack" : undefined}
              key={`${item.href}-${item.label}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/#cover" variant="secondary">
          打开礼物
        </ButtonLink>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <p className="footer-brand">{siteConfig.brand}</p>
          <p className="footer-copy">
            {siteConfig.studio} · {siteConfig.subtitle}
          </p>
        </div>

        <div className="footer-links">
          <Link href="/#memories">记忆</Link>
          <Link href="/#lottery">彩票</Link>
          <Link href="/#coupons">小券</Link>
          <Link href="/#mystery">礼盒</Link>
          <Link href="/#signature">落款</Link>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell hero-stack">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-copy">{description}</p>
        {actions ? <div className="button-row">{actions}</div> : null}
      </div>
    </section>
  );
}

export function ContentCard({
  title,
  description,
  meta,
  href,
  cta,
  external
}: ContentCardProps) {
  return (
    <article className="content-card">
      {meta ? <p className="card-meta">{meta}</p> : null}
      <h3>{title}</h3>
      <p>{description}</p>
      {href && cta ? (
        <div className="card-actions">
          <ButtonLink href={href} variant="ghost" external={external}>
            {cta}
          </ButtonLink>
        </div>
      ) : null}
    </article>
  );
}

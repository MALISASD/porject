import Link from "next/link";
import type { ReactNode } from "react";

type PlanetPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  nextHref?: string;
  nextLabel?: string;
};

export function PlanetPageShell({
  eyebrow,
  title,
  description,
  children,
  nextHref,
  nextLabel
}: PlanetPageShellProps) {
  return (
    <section className="planet-page">
      <div className="planet-page-stars" aria-hidden="true" />
      <div className="shell planet-page-shell">
        <header className="planet-page-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="planet-page-actions">
            <Link className="planet-action" href="/?open=planet#gift-planet">
              返回礼物星球
            </Link>
            {nextHref && nextLabel ? (
              <Link className="planet-action planet-action-ghost" href={nextHref}>
                {nextLabel}
              </Link>
            ) : null}
          </div>
        </header>
        <div className="planet-page-content">{children}</div>
      </div>
    </section>
  );
}

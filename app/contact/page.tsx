import type { Metadata } from "next";

import { ButtonLink, PageHero } from "@/components/site-shell";
import { contactMethods } from "@/data/site";

export const metadata: Metadata = {
  title: "最后落款",
  description: "写给琳宝的最后几句落款，也是最想亲口说的话。",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="最后落款"
        title="写到这里，我还是最想认真叫你一声：琳宝"
        description="这大概是我能想到最郑重又不太打扰你的表达方式。可如果你愿意，我想下一次不隔着页面，而是站在你面前，把这些话亲口说给你听。"
        actions={
          <>
            <ButtonLink href="/">回到首页</ButtonLink>
            <ButtonLink href="/success" variant="secondary">
              收下这份心意
            </ButtonLink>
          </>
        }
      />

      <section className="section-block">
        <div className="shell">
          <div className="card-grid card-grid-3">
            {contactMethods.map((method) => (
              <article className="content-card" key={method.title}>
                <p className="card-meta">{method.title}</p>
                <h3>{method.value}</h3>
                <p>{method.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

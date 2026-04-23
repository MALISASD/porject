import type { Metadata } from "next";

import { ButtonLink, PageHero } from "@/components/site-shell";
import { contactMethods } from "@/data/site";

export const metadata: Metadata = {
  title: "联系",
  description: "Long 的联系页，展示邮箱、微信与社交方式。",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="联系"
        title="如果你想聊合作、咨询或支付后的下一步"
        description="当前站点不接复杂后端，所以联系页保持直接。你可以先通过邮箱沟通，再逐步补充表单、自动回复或更完整的客户入口。"
        actions={
          <>
            <ButtonLink href="/">返回首页</ButtonLink>
            <ButtonLink href="/shop" variant="secondary">
              去看商店
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
                {method.href ? (
                  <div className="card-actions">
                    <a
                      className="button-link button-ghost"
                      href={method.href}
                      rel={method.external ? "noreferrer" : undefined}
                      target={method.external ? "_blank" : undefined}
                    >
                      立即联系
                    </a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

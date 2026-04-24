import type { Metadata } from "next";

import { ButtonLink, ContentCard, PageHero } from "@/components/site-shell";
import { products } from "@/data/site";

export const metadata: Metadata = {
  title: "小惊喜",
  description: "给琳宝准备的小惊喜和偏爱清单。",
  alternates: {
    canonical: "/shop"
  }
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="小惊喜"
        title="这些不是商品，是我很想认真送给你的偏爱"
        description="有些礼物不一定装在盒子里，它也可以是抱抱、陪伴、约会和一个人把另一个人放心上很久很久。"
        actions={
          <>
            <ButtonLink href="/success" variant="secondary">
              直接收下心意
            </ButtonLink>
            <ButtonLink href="/contact">看最后落款</ButtonLink>
          </>
        }
      />

      <section className="section-block">
        <div className="shell">
          <div className="notice-panel">
            <p>
              这里保留了原本的小店结构，但现在它只想用来装三份写给琳宝的温柔。每一项都没有价格，只有我想认真给你的偏爱。
            </p>
          </div>

          <div className="card-grid card-grid-3">
            {products.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

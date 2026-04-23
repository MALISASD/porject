import type { Metadata } from "next";

import { ButtonLink, ContentCard, PageHero } from "@/components/site-shell";
import { products } from "@/data/site";

export const metadata: Metadata = {
  title: "商店",
  description: "Long 的轻量商店页，展示服务或数字产品，并预留第三方托管支付链接。",
  alternates: {
    canonical: "/shop"
  }
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="商店"
        title="这是一个轻量商店，不是复杂电商系统"
        description="首版只负责展示商品并引导用户进入第三方托管支付页。后续你只需要把占位链接替换成 Stripe Payment Link，并把成功返回地址配置到 /success。"
        actions={
          <>
            <ButtonLink href="/success" variant="secondary">
              查看成功页
            </ButtonLink>
            <ButtonLink href="/contact">先联系我</ButtonLink>
          </>
        }
      />

      <section className="section-block">
        <div className="shell">
          <div className="notice-panel">
            <p>
              当前按钮使用的是占位地址。后续请把商品链接替换为你的 Stripe Payment
              Link，并把支付成功后的跳转地址设置为
              <span className="inline-code"> https://fdaicar.top/success </span>
              或对应正式域名。
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

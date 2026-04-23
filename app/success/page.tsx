import type { Metadata } from "next";

import { ButtonLink, ContentCard, PageHero } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "支付成功",
  description: "支付完成后的返回页面，用于承接用户下一步动作。",
  alternates: {
    canonical: "/success"
  }
};

const nextSteps = [
  {
    title: "支付已完成",
    description: "如果这是正式支付流程，你可以在这里提示用户已成功提交订单或服务需求。",
    meta: "成功返回页"
  },
  {
    title: "继续沟通交付",
    description: "把邮箱、微信或后续说明放在这里，让用户知道付款后应该如何联系你。",
    meta: "联系承接"
  },
  {
    title: "保留可追踪入口",
    description: "后续如接入 Stripe，可把成功页继续扩展成带订单信息、FAQ 或交付说明的页面。",
    meta: "后续扩展"
  }
];

export default function SuccessPage() {
  return (
    <>
      <PageHero
        eyebrow="支付成功"
        title="感谢你的支持，支付流程已经顺利完成"
        description="这个页面用于承接支付完成后的回跳。当前版本先提供一个清晰、稳定的确认页面，后续可以继续加入更细的交付信息。"
        actions={
          <>
            <ButtonLink href="/contact">联系我</ButtonLink>
            <ButtonLink href="/shop" variant="secondary">
              返回商店
            </ButtonLink>
          </>
        }
      />

      <section className="section-block">
        <div className="shell">
          <div className="card-grid card-grid-3">
            {nextSteps.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

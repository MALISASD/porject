import type { Metadata } from "next";

import { ButtonLink, ContentCard, PageHero } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "心意送达",
  description: "写给琳宝的这份心意，已经稳稳送到你面前。",
  alternates: {
    canonical: "/success"
  }
};

const nextSteps = [
  {
    title: "第一步，收下喜欢",
    description: "如果你愿意，就先把这句“我喜欢你”收下，当作我今天最认真递给你的心意。",
    meta: "心意送达"
  },
  {
    title: "第二步，给我一个笑",
    description: "你要是看完偷偷笑了，那我就当自己这次表白已经成功了一半。",
    meta: "最想看到的反馈"
  },
  {
    title: "第三步，陪我继续往下走",
    description: "网站会停在这里，但我想给你的好，不想只停在这一页。",
    meta: "以后再慢慢兑现"
  }
];

export default function SuccessPage() {
  return (
    <>
      <PageHero
        eyebrow="心意送达"
        title="如果你看到这里，我就当你已经收下了这份喜欢"
        description="谢谢你愿意看到这一页。它没有复杂功能，只有我想说的话和想给你的认真。如果你愿意，这一页就当作我把心意稳稳交到你手里了。"
        actions={
          <>
            <ButtonLink href="/contact">看最后落款</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              再看一遍首页
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

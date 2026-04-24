import type { Metadata } from "next";

import { ButtonLink, ContentCard, PageHero } from "@/components/site-shell";
import { learnItems } from "@/data/site";

export const metadata: Metadata = {
  title: "未来计划",
  description: "想和琳宝一起完成的小愿望、小安排和很长很长的以后。",
  alternates: {
    canonical: "/learn"
  }
};

export default function LearnPage() {
  return (
    <>
      <PageHero
        eyebrow="未来计划"
        title="如果你愿意，我想把以后很多平凡的日子都和你一起过"
        description="不是很夸张的承诺，而是我真的会认真期待的事。一起吃饭、一起看电影、一起散步、一起把一些普通日子过得亮晶晶。"
        actions={
          <>
            <ButtonLink href="/">回到首页</ButtonLink>
            <ButtonLink href="/shop" variant="secondary">
              看给你的惊喜
            </ButtonLink>
          </>
        }
      />

      <section className="section-block">
        <div className="shell">
          <div className="card-grid card-grid-3">
            {learnItems.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

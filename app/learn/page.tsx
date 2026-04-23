import type { Metadata } from "next";

import { ButtonLink, ContentCard, PageHero } from "@/components/site-shell";
import { learnItems } from "@/data/site";

export const metadata: Metadata = {
  title: "学习",
  description: "Long 的学习列表页，用于整理教程、笔记、方法与资源。",
  alternates: {
    canonical: "/learn"
  }
};

export default function LearnPage() {
  return (
    <>
      <PageHero
        eyebrow="学习"
        title="把学过的东西沉淀下来，未来就更容易复用"
        description="学习页用来整理笔记、教程和资源。当前首版保持简单，先让结构可读、路径可扩展，后续可再接入 MDX 或 CMS。"
        actions={
          <>
            <ButtonLink href="/">返回首页</ButtonLink>
            <ButtonLink href="/posts" variant="secondary">
              去看分享
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

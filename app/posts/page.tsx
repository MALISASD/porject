import type { Metadata } from "next";

import { ButtonLink, ContentCard, PageHero } from "@/components/site-shell";
import { posts } from "@/data/site";

export const metadata: Metadata = {
  title: "分享",
  description: "Long 的分享列表页，展示个人观点、经验复盘与内容输出。",
  alternates: {
    canonical: "/posts"
  }
};

export default function PostsPage() {
  return (
    <>
      <PageHero
        eyebrow="分享"
        title="把阶段性的思考整理成可以反复阅读的内容"
        description="这里收纳品牌、内容策略、网站结构和个人工作方式相关的分享。当前先用示例卡片占位，后续可以继续扩成独立文章页。"
        actions={
          <>
            <ButtonLink href="/">返回首页</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              联系我
            </ButtonLink>
          </>
        }
      />

      <section className="section-block">
        <div className="shell">
          <div className="card-grid card-grid-3">
            {posts.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

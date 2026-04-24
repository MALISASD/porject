import type { Metadata } from "next";

import { ButtonLink, ContentCard, PageHero } from "@/components/site-shell";
import { posts } from "@/data/site";

export const metadata: Metadata = {
  title: "想说的话",
  description: "写给琳宝的几句真心话，把没说完的喜欢认真展开。",
  alternates: {
    canonical: "/posts"
  }
};

export default function PostsPage() {
  return (
    <>
      <PageHero
        eyebrow="想说的话"
        title="如果喜欢可以慢慢讲，我想把每一句都讲给你听"
        description="有些话平时会害羞，有些话见到你会忘词，所以我先把它们安安稳稳写在这里。不是为了炫耀喜欢，而是想让你知道，你真的被我放在很重要的位置。"
        actions={
          <>
            <ButtonLink href="/">回到首页</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              看最后落款
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

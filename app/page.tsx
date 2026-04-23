import { ButtonLink, ContentCard, SectionHeading } from "@/components/site-shell";
import { learnItems, posts, products, siteConfig, workflowSteps } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="hero-home">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{siteConfig.brand}</p>
            <p className="hero-kicker">
              {siteConfig.studio} · {siteConfig.subtitle}
            </p>
            <h1>{siteConfig.heroTitle}</h1>
            <p className="lead-copy">{siteConfig.heroDescription}</p>

            <div className="button-row">
              <ButtonLink href="/#posts-preview">先看分享区</ButtonLink>
              <ButtonLink href="/#shop-preview" variant="secondary">
                再看商店区
              </ButtonLink>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-stat">
              <span>站点定位</span>
              <strong>个人分享、学习笔记与轻量转化</strong>
            </div>
            <div className="hero-stat">
              <span>首版重点</span>
              <strong>先跑通页面发布、访问与支付链路</strong>
            </div>
            <div className="hero-stat">
              <span>部署方式</span>
              <strong>Next.js + Vercel，可继续扩展 Stripe</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-block" id="workflow">
        <div className="shell">
          <SectionHeading
            eyebrow="流程"
            title="先发布，再访问，再支付"
            description="首版不做复杂商城，而是先让访问和成交路径清晰可用。"
          />

          <div className="card-grid card-grid-3">
            {workflowSteps.map((step) => (
              <ContentCard
                key={step.title}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="about">
        <div className="shell">
          <SectionHeading
            eyebrow="关于我"
            title="把内容、学习和作品整理成一个长期更新的入口"
            description="这里不是复杂平台，而是一个足够稳定、克制、能承接下一步合作与支付的个人品牌站。"
          />

          <div className="feature-panel">
            <p>
              我希望把个人分享、学习笔记和轻量商品放在同一站点里，让访问者能快速看懂我在做什么，也能清楚知道下一步如何继续了解或购买。
            </p>
            <p>
              当前版本优先解决结构、内容和支付跳转预留的问题。后续你可以继续往里增加文章详情页、案例页、真实支付链接和更多服务说明。
            </p>
          </div>
        </div>
      </section>

      <section className="section-block" id="posts-preview">
        <div className="shell">
          <SectionHeading
            eyebrow="分享"
            title="三个示例分享卡片"
            description="用于展示你的内容方向、经验输出与品牌观点。"
          />

          <div className="card-grid card-grid-3">
            {posts.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="learn-preview">
        <div className="shell">
          <SectionHeading
            eyebrow="学习"
            title="三个示例学习卡片"
            description="整理学习笔记、教程与资源，为后续内容沉淀留出清晰入口。"
          />

          <div className="card-grid card-grid-3">
            {learnItems.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="shop-preview">
        <div className="shell">
          <SectionHeading
            eyebrow="商店"
            title="三个示例商品卡片"
            description="按钮已预留第三方托管支付入口，后续替换成 Stripe Payment Link 即可。"
          />

          <div className="card-grid card-grid-3">
            {products.map((item) => (
              <ContentCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="contact">
        <div className="shell contact-panel">
          <SectionHeading
            eyebrow="联系"
            title="如果你想继续聊项目、合作或购买"
            description="当前首版先保留最直接的联系入口。支付后的后续沟通也可以通过这里进行。"
          />

          <div className="contact-cta">
            <a className="contact-email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <div className="button-row">
              <ButtonLink href="/contact" variant="secondary">
                查看完整联系方式
              </ButtonLink>
              <ButtonLink href="/shop">进入商店</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

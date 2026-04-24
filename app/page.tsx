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
              <ButtonLink href="/#posts-preview">先看我想说的话</ButtonLink>
              <ButtonLink href="/#shop-preview" variant="secondary">
                再看给你的小惊喜
              </ButtonLink>
            </div>
          </div>

          <aside className="hero-panel">
            <div className="hero-stat">
              <span>想告诉你</span>
              <strong>你是我想认真偏爱、认真珍惜、认真写进以后的人。</strong>
            </div>
            <div className="hero-stat">
              <span>这个网站</span>
              <strong>不是作品集，也不是商店，而是一份只想送给琳宝的小小心意。</strong>
            </div>
            <div className="hero-stat">
              <span>最后的答案</span>
              <strong>如果非要把所有话缩成一句，那就是：琳宝，我真的很喜欢你。</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-block" id="moments">
        <div className="shell">
          <SectionHeading
            eyebrow="心动瞬间"
            title="我喜欢你，不是一瞬间，是一遍又一遍确定下来的事"
            description="有些喜欢不是轰轰烈烈，而是看见你、想到你、靠近你时，心里总会轻轻发亮。"
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
            eyebrow="写给你"
            title="如果喜欢可以被好好表达，那我想把这份喜欢写得很清楚"
            description="所以我没有只发一句消息，而是想认认真真做一个页面，把那些平时没说完的话一点点交给你。"
          />

          <div className="feature-panel">
            <p>
              琳宝，这个网站没有复杂功能，也没有什么花哨目的。它只是想替我认真开口，告诉你：我喜欢和你说话，喜欢看你笑，喜欢想到未来时里面有你。
            </p>
            <p>
              如果你看到这里，就当我已经站在你面前，把那些本来会紧张得说不完整的话，终于一字一句讲清楚了。
            </p>
          </div>
        </div>
      </section>

      <section className="section-block" id="posts-preview">
        <div className="shell">
          <SectionHeading
            eyebrow="想说的话"
            title="有些喜欢，我想一条一条讲给你听"
            description="不是漂亮话，而是每次想起你时，心里最真实的反应。"
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
            eyebrow="未来计划"
            title="如果你愿意，我想把以后也一点点写上你的名字"
            description="一起吃饭、一起出门、一起散步、一起变得更好，这些普通又浪漫的小事，我都想和你一起。"
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
            eyebrow="小惊喜"
            title="给琳宝准备的三份小小心意"
            description="它们不是真的商品，而是我很想认真交到你手里的偏爱。"
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
            eyebrow="最后落款"
            title="看完这一页以后，我还是最想亲口告诉你"
            description="网站可以先替我把喜欢说出来，但最想要的那句回应，我还是想看着你的眼睛听。"
          />

          <div className="contact-cta">
            <a className="contact-email" href="/contact">
              琳宝，我喜欢你。
            </a>
            <div className="button-row">
              <ButtonLink href="/contact" variant="secondary">
                看最后的落款
              </ButtonLink>
              <ButtonLink href="/success">收下这份心意</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

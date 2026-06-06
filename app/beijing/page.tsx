import { LoveEventForm } from "@/components/planet-interactions";
import { PlanetPageShell } from "@/components/planet-page-shell";
import { giftExperienceCopy } from "@/data/site";

export default function BeijingPage() {
  return (
    <PlanetPageShell
      eyebrow="beijing planet"
      title="下一站星"
      description="一半礼物现在打开，另一半等你六月底来北京时，我亲手给你。"
      nextHref="/message"
      nextLabel="去悄悄话星"
    >
      <div className="beijing-destination-world">
        <div className="beijing-invite-planet" aria-hidden="true">
          <span className="beijing-planet-glow" />
          <span className="beijing-planet-city" />
          <span className="beijing-planet-ticket">六月底 北京见</span>
        </div>
        <div className="beijing-route-notes">
          {giftExperienceCopy.beijing.items.map((item, index) => (
            <article className="beijing-route-note" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
          <article className="beijing-route-note">
            <span>04</span>
            <h3>下一站目的地星球</h3>
            <p>等你来北京，我想把另一半礼物从网页里拿出来，变成真的见面、真的饭、真的电影和真的抱抱。</p>
          </article>
          <article className="beijing-route-note">
            <span>05</span>
            <h3>见面兑现计划</h3>
            <p>第一顿好吃的、想看的科幻电影、没说完的话，还有那份我想亲手给你的惊喜，都先在下一站星上亮着。</p>
          </article>
        </div>
      </div>
      <section className="planet-soft-zone">
        <h2>来北京最期待什么</h2>
        <LoveEventForm
          buttonLabel="把期待发给 Long"
          eventType="beijing_expectation_submit"
          helpText="这一半先在网页里亮着，另一半等你来北京，我想当面兑现。"
          label="六月底来北京，最想先做哪件事？"
          planet="下一站星"
          placeholder="比如吃火锅、看电影、出去散步、拆礼物，或者只是先抱一下。"
          title="来北京期待"
        />
      </section>
    </PlanetPageShell>
  );
}

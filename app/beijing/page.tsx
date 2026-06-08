import { LoveEventForm } from "@/components/planet-interactions";
import { PlanetPageShell } from "@/components/planet-page-shell";
import { StarBoxGiftShelf } from "@/components/star-box";
import { giftExperienceCopy } from "@/data/site";

const beijingStarBoxGifts = [
  {
    id: "beijing-late-june",
    title: "六月底北京见",
    fromPlanet: "下一站星",
    type: "wish" as const,
    status: "北京见面后兑现" as const,
    description: "网页先送你一半，剩下的一半等你来北京，我想当面给你。",
    icon: "京"
  },
  {
    id: "beijing-meeting-gift",
    title: "北京见面礼",
    fromPlanet: "下一站星",
    type: "gift" as const,
    status: "先保密" as const,
    description: "这份先不说破，等你到了北京，我想亲手交给你。",
    icon: "盒"
  },
  {
    id: "beijing-other-half",
    title: "另一半生日惊喜",
    fromPlanet: "下一站星",
    type: "gift" as const,
    status: "北京见面后兑现" as const,
    description: "这是留给见面那天的部分，让生日礼物不只停在网页里。",
    icon: "星"
  },
  {
    id: "beijing-first-dinner",
    title: "北京第一顿饭",
    fromPlanet: "下一站星",
    type: "coupon" as const,
    status: "北京见面后兑现" as const,
    description: "你负责说想吃什么，路线、排队和安排都交给 Long。",
    icon: "饭"
  },
  {
    id: "beijing-little-surprise",
    title: "北京小惊喜",
    fromPlanet: "下一站星",
    type: "gift" as const,
    status: "先保密" as const,
    description: "给六月底留一点期待，也给见面那天留一点发光的余地。",
    icon: "光"
  }
];

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
      <StarBoxGiftShelf
        title="先放进星盒的北京承诺"
        description="这些会等你来北京后，慢慢从网页变成真的饭、真的礼物和真的见面。"
        gifts={beijingStarBoxGifts}
      />
    </PlanetPageShell>
  );
}

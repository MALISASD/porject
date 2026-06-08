import { GiftPromiseConstellation, StarFortuneMachine } from "@/components/planet-interactions";
import { PlanetPageShell } from "@/components/planet-page-shell";

export default function GiftsPage() {
  return (
    <PlanetPageShell
      eyebrow="gift planet"
      title="惊喜仓星"
      description="这里不只是礼物结果，更像一台只为你开的星运礼物机。"
      nextHref="/food"
      nextLabel="去蘑菇汤星"
    >
      <div className="gifts-planet-stack">
        <section className="planet-soft-zone gifts-intro-note">
          <h2>这次换我给你做礼物星球</h2>
          <p>
            我生日的时候，你给我买了海鲜水饺，还给我做了一套小抽卡互动游戏。那天我是真的开心。
            也许正是因为你给过我这样的惊喜，所以这次我也想认真给你做一个属于你的生日礼物星球。
          </p>
          <p>有些惊喜今天揭晓，有些要等你来北京，我再亲手兑现。</p>
        </section>

        <StarFortuneMachine />
        <GiftPromiseConstellation />

        <section className="planet-soft-zone gifts-signature-note">
          <p className="card-meta">written by Long</p>
          <h2>先写进星盒里的承诺</h2>
          <p>
            这颗星不负责制造夸张的运气，只负责把我想给你的偏爱放得更认真一点。
            今天先打开一部分，剩下的，等你来北京，我慢慢兑现。
          </p>
          <span>Long 给琳宝的生日礼物星球</span>
        </section>
      </div>
    </PlanetPageShell>
  );
}

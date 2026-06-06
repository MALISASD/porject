import { GiftBoxes } from "@/components/planet-interactions";
import { PlanetPageShell } from "@/components/planet-page-shell";
import { mysteryBoxes, mysteryPrizes } from "@/data/site";

export default function GiftsPage() {
  return (
    <PlanetPageShell
      eyebrow="gift planet"
      title="惊喜仓星"
      description="这里放神秘礼盒、礼物结果、奖品池和以后可以认真规划的愿望基金。"
      nextHref="/food"
      nextLabel="去蘑菇汤星"
    >
      <div className="planet-section-grid">
        <section className="planet-soft-zone">
          <h2>这次换我给你做礼物星球</h2>
          <p>
            我生日的时候，你给我买了海鲜水饺，还给我做了一套小抽卡互动游戏。那天我是真的开心。
            也许正是因为你给过我这样的惊喜，所以这次我也想认真给你做一个属于你的生日礼物星球。
          </p>
        </section>

        <section className="planet-soft-zone">
          <h2>神秘礼盒</h2>
          <GiftBoxes boxes={mysteryBoxes} prizes={mysteryPrizes} />
        </section>

        <section className="planet-soft-zone">
          <h2>奖品池和愿望基金</h2>
          <div className="floating-memory-grid">
            {mysteryPrizes.map((prize) => (
              <article className="planet-prize-chip" key={prize.title}>
                <h3>{prize.title}</h3>
                <p>{prize.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PlanetPageShell>
  );
}

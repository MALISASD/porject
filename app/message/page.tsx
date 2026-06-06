import { MessageStarForm } from "@/components/planet-interactions";
import { PlanetPageShell } from "@/components/planet-page-shell";
import { giftExperienceCopy } from "@/data/site";

export default function MessagePage() {
  return (
    <PlanetPageShell
      eyebrow="message planet"
      title="悄悄话星"
      description="这里放写给琳宝的话，也可以让她给 Long 留一句小小的话。"
      nextHref="/moments"
      nextLabel="去胶片星"
    >
      <div className="planet-section-grid">
        <section className="planet-soft-zone">
          <h2>写给琳宝</h2>
          <p>{giftExperienceCopy.final.description}</p>
          <p>
            这一年多里，我们有很多开心，也有一些不容易。可我越来越觉得，所谓一起生活，
            不是每一天都完美，而是遇到小麻烦、小脾气、小距离的时候，还是愿意继续牵着对方往前走。
          </p>
          <p>
            这次生日，我先把网页里的这一半送给你。另一半等你来北京，我想当面给你，也想当面抱抱你。
          </p>
          <p className="final-signature">{giftExperienceCopy.final.signature}</p>
        </section>
        <section className="planet-soft-zone">
          <h2>她可以留下的一句话</h2>
          <MessageStarForm />
        </section>
      </div>
    </PlanetPageShell>
  );
}

import { PlanetPageShell } from "@/components/planet-page-shell";
import { StoryOrbitTimeline } from "@/components/story-orbit-timeline";
import { rememberedSnapshots, storyOrbitNodes } from "@/data/site";

export default function MemoryPage() {
  return (
    <PlanetPageShell
      eyebrow="memory planet"
      title="旧时光星"
      description="从初三第一次见面，到现在等你来北京，很多小事都被我放进了这颗星里。"
      nextHref="/gifts"
      nextLabel="去惊喜仓星"
    >
      <div className="planet-section-grid">
        <section className="planet-soft-zone">
          <div className="story-orbit-heading">
            <p className="card-meta">23 memories in orbit</p>
            <h2>我们的故事轨道</h2>
            <p>每个节点先露出一小束光，点开后再看完整的那一段。不是流水账，是我们一路走到现在的轨迹。</p>
          </div>
          <StoryOrbitTimeline items={storyOrbitNodes} />
        </section>

        <section className="planet-soft-zone">
          <h2>一直记得的小画面</h2>
          <div className="floating-memory-grid">
            {rememberedSnapshots.map((item) => (
              <article className="snapshot-note" key={item.title}>
                <span className="snapshot-pin" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PlanetPageShell>
  );
}

import { PlanetPageShell } from "@/components/planet-page-shell";
import { StarBoxGiftShelf } from "@/components/star-box";
import { StoryOrbitTimeline } from "@/components/story-orbit-timeline";
import { rememberedSnapshots, storyOrbitNodes } from "@/data/site";

const memoryStarBoxGifts = [
  {
    id: "memory-puji-lock",
    title: "普救寺同心锁纪念卡",
    fromPlanet: "旧时光星",
    type: "memory" as const,
    status: "已收到" as const,
    description: "那把本来想刻平平安安、健健康康，最后写成永远在一起的同心锁。",
    icon: "锁"
  },
  {
    id: "memory-beijing-snow",
    title: "北京雪夜纪念卡",
    fromPlanet: "旧时光星",
    type: "memory" as const,
    status: "已收到" as const,
    description: "那晚北京下着很大的雪，你第一次坐飞机，而我刚好陪在你身边。",
    icon: "雪"
  },
  {
    id: "memory-jiujiang-meet",
    title: "九江相约纪念卡",
    fromPlanet: "旧时光星",
    type: "memory" as const,
    status: "已收到" as const,
    description: "晚上十点多去九江站接你，骑共享电驴载着你和行李，那一晚很浪漫。",
    icon: "江"
  },
  {
    id: "memory-shantang-letter",
    title: "七里山塘那封信纪念卡",
    fromPlanet: "旧时光星",
    type: "memory" as const,
    status: "已收到" as const,
    description: "那天你写下爱我，这句话我一直记得，也想好好收进星盒。",
    icon: "信"
  }
];

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

        <StarBoxGiftShelf
          title="可以收进星盒的纪念卡"
          description="这些不是普通卡片，是 Long 想替我们保存下来的小小证据。"
          gifts={memoryStarBoxGifts}
        />
      </div>
    </PlanetPageShell>
  );
}

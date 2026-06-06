import { MediaMemoryGrid } from "@/components/media-memory-grid";
import { PlanetPageShell } from "@/components/planet-page-shell";
import type { MemoryMedia } from "@/data/site";

const seaWishList = ["去海边住一晚", "一起看日落", "吃一顿海鲜", "拍一组照片", "什么都不赶，慢慢走"];

const travelMedia: MemoryMedia[] = [
  {
    id: "future-sea-photo",
    type: "image",
    title: "未来海边照片",
    date: "future",
    description: "以后这里可以放我们真正不用赶时间去看海的照片。",
    src: "/images/future-sea-photo-placeholder.jpg",
    category: "看海"
  },
  {
    id: "shengsi-sea-video",
    type: "video",
    title: "嵊泗岛那次海风",
    date: "2025-03",
    description: "那次很赶，但海风和路上的热闹，我还记得。",
    src: "/videos/shengsi-sea-placeholder.mp4",
    poster: "/images/shengsi-sea-poster.jpg",
    category: "嵊泗岛"
  }
];

export default function TravelPage() {
  return (
    <PlanetPageShell
      eyebrow="sea planet"
      title="看海星"
      description="这是未来旅行和看海愿望页。我还想带你去看一次真正不用赶时间的大海。"
      nextHref="/birth-day"
      nextLabel="去那一天星"
    >
      <div className="planet-section-grid">
        <section className="planet-soft-zone travel-sea-hero">
          <p className="card-meta">future sea</p>
          <h2>以后想带你去看海</h2>
          <p>
            我还想带你去看一次真正不用赶时间的大海。不是匆忙赶船，也不是当天来回，
            而是找一个不用着急的日子，陪你慢慢走到海边，听风，看浪，吃点好吃的。
          </p>
        </section>

        <section className="planet-soft-zone">
          <h2>嵊泗岛那次很赶，但我记得</h2>
          <p>
            那次我们跨过长江大桥，坐船去了嵊泗岛。时间很赶，也不是最轻松的一趟旅行，
            但它还是被我放进了记忆里。以后我想补给你一次慢一点的海边。
          </p>
        </section>

        <section className="planet-soft-zone">
          <h2>未来旅行愿望清单</h2>
          <div className="travel-wish-grid">
            {seaWishList.map((item, index) => (
              <article className="planet-prize-chip travel-wish-chip" key={item}>
                <p className="card-meta">sea wish {String(index + 1).padStart(2, "0")}</p>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="planet-soft-zone">
          <h2>海边照片和视频预留</h2>
          <MediaMemoryGrid items={travelMedia} />
        </section>
      </div>
    </PlanetPageShell>
  );
}

import { MediaMemoryGrid } from "@/components/media-memory-grid";
import { PlanetPageShell } from "@/components/planet-page-shell";
import { memoriesMedia } from "@/data/site";

export default function MomentsPage() {
  return (
    <PlanetPageShell
      eyebrow="moments planet"
      title="胶片星"
      description="有些画面，适合慢慢放进这颗星球里。"
      nextHref="/travel"
      nextLabel="去看海星"
    >
      <section className="planet-soft-zone">
        <h2>漂浮记忆碎片</h2>
        <p>
          这里先预留杭州、嵊泗岛、苏州、九江、过年玩雪、婚礼和上海日常的位置。
          以后把照片和视频放进来，这颗星就会慢慢变成我们的星球相册。
        </p>
        <MediaMemoryGrid items={memoriesMedia} />
      </section>
    </PlanetPageShell>
  );
}

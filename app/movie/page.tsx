import { CouponCluster, LoveEventForm } from "@/components/planet-interactions";
import { PlanetPageShell } from "@/components/planet-page-shell";

const movieCoupons = [
  {
    title: "科幻电影约会券",
    description: "你喜欢科幻电影。等你来北京，我们选一部你想看的，买点好吃的，坐在一起，把宇宙和时间慢慢看完。",
    actionLabel: "收下银河影院星",
    message: "科幻电影约会券已经收好。",
    meta: "sci-fi date"
  },
  {
    title: "未来观影清单",
    description: "这里以后可以放你想看的科幻片、悬疑片和想二刷的电影，我会慢慢补成我们的观影清单。",
    actionLabel: "加入清单",
    message: "未来观影清单已经点亮。",
    meta: "watch list"
  },
  {
    title: "北京影院预约",
    description: "六月底来北京后，找一个舒服的影院，灯暗下来以后，只负责牵手和看电影。",
    actionLabel: "预约电影夜",
    message: "北京电影夜已经预约。",
    meta: "beijing cinema"
  }
];

export default function MoviePage() {
  return (
    <PlanetPageShell
      eyebrow="movie planet"
      title="银河影院星"
      description="一颗为你喜欢的科幻电影准备的小星球，也是一张北京电影约会券。"
      nextHref="/beijing"
      nextLabel="去下一站星"
    >
      <div className="planet-section-grid">
        <CouponCluster eventType="movie_coupon_claim" items={movieCoupons} planet="银河影院星" />
        <section className="planet-soft-zone">
          <h2>未来观影清单</h2>
          <LoveEventForm
            buttonLabel="把电影放进清单"
            eventType="movie_wish_submit"
            helpText="科幻片、想二刷的电影、或者北京见面想看的那一场，都可以先写在这里。"
            label="最近最想和 Long 看哪部电影？"
            planet="银河影院星"
            placeholder="写电影名，或者只写一种感觉：科幻、悬疑、治愈、想窝着看。"
            title="想看的电影"
          />
        </section>
      </div>
    </PlanetPageShell>
  );
}

import { CouponCluster } from "@/components/planet-interactions";
import { PlanetPageShell } from "@/components/planet-page-shell";
import { dailyCoupons } from "@/data/site";

const hugCoupons = [
  dailyCoupons[0],
  {
    title: "陪你做小事券",
    description: "陪你散步、买东西、发呆、看小说、看视频，或者什么也不做地待一会儿。",
    actionLabel: "收下陪伴券",
    message: "陪伴券已经收好。",
    meta: "company pass"
  },
  {
    title: "被哄优先权",
    description: "难过、委屈、想撒娇的时候，可以优先要求 Long 好好哄你。",
    actionLabel: "收下优先权",
    message: "被哄优先权已经收好。",
    meta: "hug right"
  },
  {
    title: "今天你最大券",
    description: "生日这天，以及你特别想被偏爱的时候，这张券自动生效。你说了算，我负责认真听。",
    actionLabel: "收下最大券",
    message: "今天你最大券已经收好。",
    meta: "queen mode"
  },
  {
    title: "不想说话也可以靠近我",
    description: "有些时候不用解释太多。你可以先靠近我，等舒服一点了再慢慢说。",
    actionLabel: "收下靠近券",
    message: "不想说话也可以靠近我，Long 已经记下。",
    meta: "quiet hug"
  }
];

export default function HugPage() {
  return (
    <PlanetPageShell
      eyebrow="hug planet"
      title="抱抱引力星"
      description="这颗星不讲道理，只负责抱抱、陪你做小事、哄你，以及今天你最大。"
      nextHref="/movie"
      nextLabel="去银河影院星"
    >
      <CouponCluster eventType="hug_coupon_claim" items={hugCoupons} planet="抱抱引力星" />
    </PlanetPageShell>
  );
}

import { CouponCluster, LoveEventForm } from "@/components/planet-interactions";
import { PlanetPageShell } from "@/components/planet-page-shell";
import { dailyCoupons } from "@/data/site";

const foodCoupons = [
  {
    title: "萨莉亚蘑菇汤永久优先权",
    description: "在上海陪你吃饭，最绕不开的就是萨莉亚，还有你每次都要点的蘑菇汤。我会一直记得你爱吃什么。",
    actionLabel: "收下蘑菇汤星",
    message: "蘑菇汤星已经收好。",
    meta: "shanghai daily"
  },
  dailyCoupons[1],
  {
    title: "奶茶甜品券",
    description: "来北京后的第一份甜，奶茶、蛋糕、冰淇淋都可以，Long 负责买给你。",
    actionLabel: "收下甜品券",
    message: "甜品券已经收好。",
    meta: "sweet orbit"
  },
  {
    title: "深夜小食券",
    description: "如果晚上突然嘴馋，烤串、炸鸡、小面、便利店热乎乎的东西，都可以临时启动。",
    actionLabel: "收下夜宵券",
    message: "深夜小食券已经收好。",
    meta: "late snack"
  },
  {
    title: "北京第一顿饭预约单",
    description: "你只管说想吃什么，剩下的路线、排队和安排都交给我。",
    actionLabel: "预约第一顿",
    message: "第一顿饭已经预约。",
    meta: "first dinner"
  }
];

export default function FoodPage() {
  return (
    <PlanetPageShell
      eyebrow="food planet"
      title="蘑菇汤星"
      description="从萨莉亚蘑菇汤，到北京火锅、奶茶甜品和第一顿饭，都先放进这颗香香的小星球。"
      nextHref="/hug"
      nextLabel="去抱抱引力星"
    >
      <div className="planet-section-grid">
        <CouponCluster eventType="food_wish" items={foodCoupons} planet="蘑菇汤星" />
        <section className="planet-soft-zone">
          <h2>好吃的预约单</h2>
          <LoveEventForm
            buttonLabel="把想吃的发给 Long"
            eventType="food_wish_submit"
            helpText="Long 安排，琳宝负责挑。"
            label="来北京第一顿，最想吃什么？"
            planet="蘑菇汤星"
            placeholder="比如火锅、萨莉亚蘑菇汤、奶茶甜品、夜宵，或者突然想吃的小东西。"
            title="来北京想吃什么"
          />
        </section>
      </div>
    </PlanetPageShell>
  );
}

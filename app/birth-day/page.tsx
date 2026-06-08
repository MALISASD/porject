import type { CSSProperties } from "react";

import { PlanetPageShell } from "@/components/planet-page-shell";
import { StarBoxGiftShelf } from "@/components/star-box";
import { birthDayData } from "@/data/site";

const dateItems = [
  { label: "公历", value: birthDayData.solarDate },
  { label: "农历", value: birthDayData.lunarDate },
  { label: "星期", value: birthDayData.weekday },
  { label: "生肖", value: birthDayData.zodiac },
  { label: "星座", value: birthDayData.constellation }
];

const birthDayStarBoxGifts = [
  {
    id: "birth-day-memory-card",
    title: "那一天纪念卡",
    fromPlanet: "那一天星",
    type: "memory" as const,
    status: "已收到" as const,
    description: "1999 年 6 月 8 日，星期二。那一天你来到世界，很多年后我才终于遇见你。",
    icon: "日"
  }
];

export default function BirthDayPage() {
  return (
    <PlanetPageShell
      eyebrow="the day planet"
      title={birthDayData.title}
      description={birthDayData.intro}
      nextHref="/message"
      nextLabel="去悄悄话星"
    >
      <div className="planet-section-grid birth-day-world">
        <section className="planet-soft-zone birth-time-gate" aria-label="时间回溯">
          <div className="birth-time-orbit" aria-hidden="true">
            <span className="birth-time-ring birth-time-ring-one" />
            <span className="birth-time-ring birth-time-ring-two" />
            <span className="birth-time-year birth-time-year-early">2026</span>
            <span className="birth-time-year birth-time-year-mid">2024</span>
            <span className="birth-time-year birth-time-year-final">1999</span>
            <span className="birth-time-date">6 月 8 日</span>
          </div>
          <div className="birth-time-copy">
            <p className="card-meta">time rewind</p>
            <h2>那一天，你来到这个世界</h2>
            {birthDayData.mainCopy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="planet-soft-zone birth-date-archive">
          <p className="card-meta">birthday coordinate</p>
          <h2>你的日期</h2>
          <div className="birth-date-grid">
            {dateItems.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="birth-card-orbit" aria-label="那一天星档案">
          {birthDayData.cards.slice(1).map((card, index) => (
            <article
              className="planet-soft-zone birth-memory-card"
              key={card.title}
              style={{ "--birth-card-index": String(index) } as CSSProperties}
            >
              <p className="card-meta">archive {String(index + 1).padStart(2, "0")}</p>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </article>
          ))}
        </section>

        <section className="planet-soft-zone birth-ending-note">
          <p>{birthDayData.ending}</p>
        </section>

        <StarBoxGiftShelf
          title="把那一天收进星盒"
          description="这不是历史卡片，是 Long 想认真记住的生日坐标。"
          gifts={birthDayStarBoxGifts}
        />
      </div>
    </PlanetPageShell>
  );
}

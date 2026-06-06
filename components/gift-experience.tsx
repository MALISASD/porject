"use client";

import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { MusicButton } from "@/components/music-button";
import {
  dailyCoupons,
  giftExperienceCopy,
  homeMemories,
  rememberedSnapshots,
  mysteryBoxes,
  mysteryPrizes,
  storyTimeline
} from "@/data/site";
import { submitLoveEvent } from "@/lib/love-events";

type MysteryResult = {
  box: string;
  title: string;
  description: string;
};

type CouponState = {
  claimed: boolean;
  flipped: boolean;
};

type Receipt = {
  title: string;
  message: string;
};

type IntroStage = "cover" | "loading" | "countdown" | "cake" | "opening";

type BurstKind = "petal" | "snow" | "firework" | "star" | "ticket";

type PlanetPortalId =
  | "story"
  | "gift"
  | "food"
  | "movie"
  | "hug"
  | "beijing"
  | "message"
  | "moments"
  | "travel"
  | "birthDay";

type PlanetTransitionKind =
  | "memory"
  | "gift"
  | "food"
  | "hug"
  | "movie"
  | "beijing"
  | "message"
  | "moments"
  | "travel"
  | "birthDay";

type EasterEggId = "snow" | "lock" | "letter" | "tablet" | "apple" | "soup" | "wave" | "calendar";

type BurstParticle = {
  id: number;
  dx: number;
  dy: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  scale: number;
  color: string;
  shape: "petal" | "snow" | "spark" | "star" | "ticket";
};

type Burst = {
  id: number;
  kind: BurstKind;
  left: number;
  top: number;
  particles: BurstParticle[];
};

const LOTTERY_KEY = "linbao-giftbox-lottery";
const MYSTERY_KEY = "linbao-giftbox-mystery";
const COUPON_KEY = "linbao-giftbox-coupons";
const COUPON_PACK_KEY = "linbao-giftbox-coupon-pack";
const MESSAGE_KEY = "linbao-giftbox-message";
const BURST_LIFETIME = 1800;
const WEDDING_RIDDLE_ANSWER = "2025年2月7日";
const WEDDING_RIDDLE_ACCEPTED_DIGITS = new Set(["202527", "20250207"]);

const planetWhispers = [
  "欢迎来到属于你的礼物星球。",
  "这里藏着一些我想慢慢送给你的惊喜。",
  "这些小星球，都藏着我想给你的惊喜。",
  "想我了的话，抱抱引力星里有答案。",
  "北京那部分礼物，还在等你。",
  "如果你饿了，可以去蘑菇汤星看看。",
  "蘑菇汤星里，藏着你来北京后的第一顿饭。",
  "那场北京的大雪，我一直记得。",
  "点点这些小星球，慢慢探索吧。"
];

const planetPortals = [
  {
    id: "story",
    label: "旧时光星",
    title: "我们的故事时间线",
    description: "这里藏着我们一路走来的小片段。",
    travelText: "我带你回到我们刚认识的时候。",
    transitionName: "回忆流光",
    transition: "memory",
    glyph: "旧",
    href: "/memory",
    orbit: "middle",
    radiusX: "318px",
    radiusY: "194px",
    angle: "210deg",
    counterAngle: "-210deg",
    duration: "92s",
    tone: "violet"
  },
  {
    id: "gift",
    label: "惊喜仓星",
    title: "神秘礼物盒",
    description: "这里放着今天和以后慢慢兑现的惊喜。",
    travelText: "来，先拆一份属于你的惊喜。",
    transitionName: "礼盒展开",
    transition: "gift",
    glyph: "仓",
    href: "/gifts",
    orbit: "middle",
    radiusX: "318px",
    radiusY: "194px",
    angle: "324deg",
    counterAngle: "-324deg",
    duration: "104s",
    tone: "gold"
  },
  {
    id: "food",
    label: "蘑菇汤星",
    title: "火锅、甜品和吃饭预约",
    description: "这里有萨莉亚蘑菇汤，也有以后带你吃的好吃的。",
    travelText: "走，先去看看好吃的。",
    transitionName: "暖汤升腾",
    transition: "food",
    glyph: "汤",
    href: "/food",
    orbit: "inner",
    radiusX: "230px",
    radiusY: "140px",
    angle: "166deg",
    counterAngle: "-166deg",
    duration: "76s",
    tone: "rose"
  },
  {
    id: "movie",
    label: "银河影院星",
    title: "科幻电影约会券",
    description: "这里留给科幻电影和以后的夜晚。",
    travelText: "带你去看一场属于我们的电影。",
    transitionName: "胶片跃迁",
    transition: "movie",
    glyph: "影",
    href: "/movie",
    orbit: "middle",
    radiusX: "318px",
    radiusY: "194px",
    angle: "32deg",
    counterAngle: "-32deg",
    duration: "108s",
    tone: "blue"
  },
  {
    id: "hug",
    label: "抱抱引力星",
    title: "抱抱券和陪伴券",
    description: "想我了的话，这颗星会把抱抱送近一点。",
    travelText: "想你了的话，这里会给你一个抱抱。",
    transitionName: "失重靠近",
    transition: "hug",
    glyph: "抱",
    href: "/hug",
    orbit: "inner",
    radiusX: "230px",
    radiusY: "140px",
    angle: "72deg",
    counterAngle: "-72deg",
    duration: "72s",
    tone: "peach"
  },
  {
    id: "beijing",
    label: "下一站星",
    title: "下一站：北京邀请星",
    description: "下一站北京，剩下的惊喜等你来。",
    travelText: "北京的那部分礼物，我想亲手给你。",
    transitionName: "启程路线",
    transition: "beijing",
    glyph: "站",
    href: "/beijing",
    orbit: "outer",
    radiusX: "410px",
    radiusY: "246px",
    angle: "105deg",
    counterAngle: "-105deg",
    duration: "126s",
    tone: "mint"
  },
  {
    id: "message",
    label: "悄悄话星",
    title: "给 Long 留一句话",
    description: "这里可以把想说的话悄悄送给 Long。",
    travelText: "想说什么，都可以悄悄告诉我。",
    transitionName: "信件展开",
    transition: "message",
    glyph: "信",
    href: "/message",
    orbit: "outer",
    radiusX: "410px",
    radiusY: "246px",
    angle: "258deg",
    counterAngle: "-258deg",
    duration: "118s",
    tone: "lilac"
  },
  {
    id: "moments",
    label: "胶片星",
    title: "我们的胶片星",
    description: "这里以后会慢慢放进我们的照片和视频。",
    travelText: "有些画面，适合慢慢翻。",
    transitionName: "相册翻页",
    transition: "moments",
    glyph: "映",
    href: "/moments",
    orbit: "outer",
    radiusX: "410px",
    radiusY: "246px",
    angle: "338deg",
    counterAngle: "-338deg",
    duration: "136s",
    tone: "blue"
  },
  {
    id: "travel",
    label: "看海星",
    title: "未来旅行和看海愿望",
    description: "这里放着我以后想带你去看的海。",
    travelText: "以后，我还想带你去看海。",
    transitionName: "海浪穿行",
    transition: "travel",
    glyph: "海",
    href: "/travel",
    orbit: "outer",
    radiusX: "410px",
    radiusY: "246px",
    angle: "18deg",
    counterAngle: "-18deg",
    duration: "142s",
    tone: "sea"
  },
  {
    id: "birthDay",
    label: "那一天星",
    title: "她来到世界的那一天",
    description: "我想看看，你来到这个世界的那一天。",
    travelText: "我想看看，你来到这个世界的那一天。",
    transitionName: "时间回溯",
    transition: "birthDay",
    glyph: "日",
    href: "/birth-day",
    orbit: "outer",
    radiusX: "410px",
    radiusY: "246px",
    angle: "184deg",
    counterAngle: "-184deg",
    duration: "132s",
    tone: "moon"
  }
] satisfies Array<{
  id: PlanetPortalId;
  label: string;
  title: string;
  description: string;
  travelText: string;
  transitionName: string;
  transition: PlanetTransitionKind;
  glyph: string;
  href: string;
  orbit: "inner" | "middle" | "outer";
  radiusX: string;
  radiusY: string;
  angle: string;
  counterAngle: string;
  duration: string;
  tone: string;
}>;

const easterEggs = [
  {
    id: "snow",
    label: "北京雪夜第一次坐飞机",
    glyph: "机",
    x: "13%",
    y: "18%",
    text: "那晚北京下着雪，\n你第一次坐飞机，\n而我刚好陪着你去看新的城市。"
  },
  {
    id: "lock",
    label: "普救寺同心锁",
    glyph: "锁",
    x: "82%",
    y: "24%",
    text: "你本来想刻平平安安、健健康康，\n结果锁上却写成了永远在一起。"
  },
  {
    id: "letter",
    label: "七里山塘写信",
    glyph: "信",
    x: "20%",
    y: "78%",
    text: "那天你写下爱我，\n我一直记得。"
  },
  {
    id: "tablet",
    label: "华为平板",
    glyph: "屏",
    x: "76%",
    y: "76%",
    text: "给你买平板，\n只是想让你窝着看小说的时候舒服一点。"
  },
  {
    id: "apple",
    label: "平安夜平安果",
    glyph: "果",
    x: "88%",
    y: "58%",
    text: "第一次陪你摆摊卖平安果，\n你有点害怕给我打电话，\n其实我就在旁边偷偷陪着你。"
  },
  {
    id: "soup",
    label: "萨莉亚蘑菇汤",
    glyph: "汤",
    x: "28%",
    y: "58%",
    text: "你最爱吃萨莉亚，\n而且每次必须点蘑菇汤。\n我一直记得。"
  },
  {
    id: "wave",
    label: "以后带你去看海",
    glyph: "浪",
    x: "9%",
    y: "54%",
    text: "以后想带你去看一次不用赶时间的大海，\n慢慢走到海边，听风，看浪。"
  },
  {
    id: "calendar",
    label: "那一天星入口提示",
    glyph: "日",
    x: "70%",
    y: "17%",
    text: "1999 年 6 月 8 日，星期二。\n那一天，你来到这个世界，\n后来也来到我的生命里。"
  }
] satisfies Array<{
  id: EasterEggId;
  label: string;
  glyph: string;
  x: string;
  y: string;
  text: string;
}>;

type CountdownValue = 1 | 2 | 3 | 4 | 5;

const digitPatterns: Record<string, string[]> = {
  "1": [
    "0011100",
    "0111100",
    "1101100",
    "0001100",
    "0001100",
    "0001100",
    "0001100",
    "0001100",
    "0001100",
    "0001100",
    "1111111"
  ],
  "2": [
    "0111110",
    "1100011",
    "0000011",
    "0000110",
    "0001100",
    "0011000",
    "0110000",
    "1100000",
    "1100000",
    "1100011",
    "1111111"
  ],
  "3": [
    "0111110",
    "1100011",
    "0000011",
    "0000110",
    "0011110",
    "0000011",
    "0000011",
    "0000011",
    "1100011",
    "0111110",
    "0011100"
  ],
  "4": [
    "0001110",
    "0011110",
    "0110110",
    "1100110",
    "1100110",
    "1111111",
    "0000110",
    "0000110",
    "0000110",
    "0000110",
    "0000110"
  ],
  "5": [
    "1111111",
    "1100000",
    "1100000",
    "1100000",
    "1111110",
    "0000011",
    "0000011",
    "0000011",
    "1100011",
    "0111110",
    "0011100"
  ]
};

const ribbonRainClasses = [
  "falling-ribbon-gold",
  "falling-ribbon-rose",
  "falling-ribbon-violet",
  "falling-ribbon-blue",
  "falling-ribbon-mint",
  "falling-ribbon-peach",
  "falling-ribbon-lilac",
  "falling-ribbon-amber"
];

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readStoredNumber(key: string) {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const value = storage.getItem(key);
  return value ? Number(value) : null;
}

function readStoredMystery() {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  const value = storage.getItem(MYSTERY_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as MysteryResult;
  } catch {
    storage.removeItem(MYSTERY_KEY);
    return null;
  }
}

function readStoredCouponStates() {
  const storage = getStorage();
  if (!storage) {
    return {};
  }

  const value = storage.getItem(COUPON_KEY);
  if (!value) {
    return {};
  }

  try {
    const parsed = JSON.parse(value) as Record<string, CouponState>;
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch {
    storage.removeItem(COUPON_KEY);
  }

  return {};
}

function readStoredPackState() {
  const storage = getStorage();
  if (!storage) {
    return false;
  }

  return storage.getItem(COUPON_PACK_KEY) === "open";
}

function readStoredMessage() {
  const storage = getStorage();
  if (!storage) {
    return "";
  }

  return storage.getItem(MESSAGE_KEY) ?? "";
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function createBurst(kind: BurstKind, id: number, left: number, top: number): Burst {
  const colorsByKind: Record<BurstKind, string[]> = {
    petal: ["#f5e1d4", "#fbe0d2", "#f7d4c3", "#fff0e8", "#fce4d6", "#f8d8c8"],
    snow: ["#ffffff", "#fafafc", "#f5f5f9", "#fefefe"],
    firework: ["#f8f0e0", "#faf3e6", "#fefaf4", "#f5e6d0", "#fff8ec"],
    star: ["#e8d5a3", "#f0dba8", "#f5e4b8", "#ecd8a0", "#f8ecc8", "#e0c890"],
    ticket: ["#faf5ed", "#fffaf4", "#f8f0e4", "#fef8f0", "#faf2e6", "#fff6ec"]
  };

  const shapesByKind: Record<BurstKind, BurstParticle["shape"]> = {
    petal: "petal",
    snow: "snow",
    firework: "spark",
    star: "star",
    ticket: "ticket"
  };

  const countByKind: Record<BurstKind, number> = {
    petal: 16,
    snow: 10,
    firework: 14,
    star: 12,
    ticket: 8
  };

  const count = countByKind[kind];
  const colors = colorsByKind[kind];

  return {
    id,
    kind,
    left,
    top,
    particles: Array.from({ length: count }, (_, index) => {
      const spreadX =
        kind === "firework" ? 200 :
        kind === "star" ? 170 :
        kind === "ticket" ? 140 : 150;
      const spreadY =
        kind === "firework" ? 170 :
        kind === "star" ? 160 :
        kind === "ticket" ? 130 : 120;

      return {
        id: id * 100 + index,
        dx: randomBetween(-spreadX, spreadX),
        dy: randomBetween(-spreadY, spreadY),
        size: randomBetween(
          kind === "star" ? 6 : kind === "ticket" ? 10 : kind === "snow" ? 4 : 6,
          kind === "star" ? 10 : kind === "ticket" ? 18 : kind === "firework" ? 9 : 8
        ),
        duration: randomBetween(
          kind === "ticket" ? 1200 : 900,
          kind === "ticket" ? 2000 : 1500
        ),
        delay: randomBetween(0, kind === "ticket" ? 180 : 120),
        rotate: randomBetween(
          kind === "ticket" ? -40 : -120,
          kind === "ticket" ? 40 : 120
        ),
        scale: Number((Math.random() * 0.4 + 0.8).toFixed(2)),
        color: randomChoice(colors),
        shape: shapesByKind[kind]
      };
    })
  };
}

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

function normalizeWeddingAnswer(value: string) {
  return value
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/\D/g, "");
}

function ParticleDigit({ value }: { value: CountdownValue }) {
  const rows = digitPatterns[String(value)];
  const activeDots = rows.reduce((total, row) => total + row.split("").filter((cell) => cell === "1").length, 0);
  let activeIndex = 0;
  const fireworks = Array.from({ length: 7 }, (_, index) => ({
    delay: `${index * 260}ms`,
    id: `firework-${index}`,
    left: `${18 + ((index * 17) % 68)}%`,
    top: `${12 + ((index * 23) % 42)}%`
  }));
  const flowers = Array.from({ length: 16 }, (_, index) => ({
    bloom: index % 4 === 0,
    delay: `${index * 160}ms`,
    duration: `${3600 + (index % 5) * 360}ms`,
    id: `flower-${index}`,
    left: `${8 + ((index * 11) % 84)}%`,
    rotate: `${(index % 2 === 0 ? 1 : -1) * (18 + index * 7)}deg`,
    top: `${12 + ((index * 19) % 74)}%`
  }));
  const ionParticles = Array.from({ length: 36 }, (_, index) => {
    const angle = (index / 36) * Math.PI * 2 + 0.4;
    const radius = 165 + (index % 5) * 14;
    const midRadius = 78 + (index % 3) * 10;

    return {
      delay: `${index * 28}ms`,
      duration: `${1800 + (index % 6) * 140}ms`,
      id: `ion-${index}`,
      midX: `${Math.round(Math.cos(angle + 0.3) * midRadius)}px`,
      midY: `${Math.round(Math.sin(angle + 0.3) * midRadius * 0.84)}px`,
      size: `${4 + (index % 4)}px`,
      startX: `${Math.round(Math.cos(angle) * radius)}px`,
      startY: `${Math.round(Math.sin(angle) * radius * 0.82)}px`
    };
  });

  const dots = rows.flatMap((row, y) =>
    row.split("").map((cell, x) => ({
      active: cell === "1",
      activeIndex: cell === "1" ? activeIndex++ : -1,
      id: `${x}-${y}`,
      x,
      y
    }))
  );

  return (
    <div className="ion-countdown-field">
      <span className="ion-orbit ion-orbit-outer" aria-hidden="true" />
      <span className="ion-orbit ion-orbit-inner" aria-hidden="true" />
      <span className="ion-core" aria-hidden="true" />
      <div className="ion-swarm" aria-hidden="true">
        {ionParticles.map((particle) => (
          <span
            className="ion-particle"
            key={particle.id}
            style={
              {
                "--delay": particle.delay,
                "--duration": particle.duration,
                "--mid-x": particle.midX,
                "--mid-y": particle.midY,
                "--size": particle.size,
                "--start-x": particle.startX,
                "--start-y": particle.startY
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="countdown-fireworks" aria-hidden="true">
        {fireworks.map((firework) => (
          <span
            className="countdown-firework"
            key={firework.id}
            style={
              {
                "--delay": firework.delay,
                "--left": firework.left,
                "--top": firework.top
              } as CSSProperties
            }
          >
            {Array.from({ length: 12 }, (_, sparkIndex) => (
              <span
                className="countdown-firework-spark"
                key={`${firework.id}-${sparkIndex}`}
                style={{ "--ray": `${sparkIndex * 30}deg` } as CSSProperties}
              />
            ))}
          </span>
        ))}
      </div>
      <div className="countdown-flower-field" aria-hidden="true">
        {flowers.map((flower) => (
          <span
            className={classNames("countdown-flower", flower.bloom && "is-bloom")}
            key={flower.id}
            style={
              {
                "--delay": flower.delay,
                "--duration": flower.duration,
                "--left": flower.left,
                "--rotate": flower.rotate,
                "--top": flower.top
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="particle-digit" aria-label={`倒计时 ${value}`}>
        {dots.map((dot, index) => (
          <span
            className={classNames("particle-digit-dot", dot.active && "is-active")}
            key={dot.id}
            style={
              {
                "--active-i": String(dot.activeIndex),
                "--i": String(index),
                "--ion-x": `${Math.round(Math.cos((dot.activeIndex / Math.max(activeDots, 1)) * Math.PI * 2 + 0.42) * (160 + (index % 5) * 20))}px`,
                "--ion-y": `${Math.round(Math.sin((dot.activeIndex / Math.max(activeDots, 1)) * Math.PI * 2 + 0.42) * (150 + (index % 4) * 18))}px`,
                "--x": String(dot.x),
                "--y": String(dot.y)
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

function CakeReveal() {
  return (
    <div className="cake-reveal" aria-hidden="true">
      <div className="cake-title">Happy Birthday</div>
      <div className="particle-cake">
        <span className="cake-glow" />
        <span className="cake-flame" />
        <span className="cake-candle" />
        <span className="cake-layer cake-layer-top" />
        <span className="cake-layer cake-layer-middle" />
        <span className="cake-layer cake-layer-bottom" />
        {Array.from({ length: 72 }, (_, index) => (
          <span
            className="cake-particle"
            key={index}
            style={
              {
                "--i": String(index),
                "--x": `${(index % 18) * 12 - 102}px`,
                "--y": `${Math.floor(index / 18) * 22 - 34}px`
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

function RibbonRain() {
  return (
    <div className="intro-ribbon-rain" aria-hidden="true">
      {Array.from({ length: 48 }, (_, index) => (
        <span
          className={classNames("falling-ribbon", ribbonRainClasses[index % ribbonRainClasses.length])}
          key={index}
          style={
            {
              "--fall-left": `${(index * 17 + 5) % 100}%`,
              "--fall-delay": `${(index % 16) * 84}ms`,
              "--fall-duration": `${2600 + (index % 8) * 160}ms`,
              "--fall-drift-mid": `${((index % 9) - 4) * -8}px`,
              "--fall-drift-late": `${((index % 9) - 4) * 18}px`,
              "--fall-drift-end": `${((index % 9) - 4) * 30}px`,
              "--fall-rotate-mid": `${(index % 2 === 0 ? 1 : -1) * (48 + (index % 7) * 10)}deg`,
              "--fall-rotate-late": `${(index % 2 === 0 ? 1 : -1) * (86 + (index % 7) * 16)}deg`,
              "--fall-rotate-end": `${(index % 2 === 0 ? 1 : -1) * (140 + (index % 7) * 28)}deg`
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function BeijingPromise() {
  return (
    <section className="gift-scene beijing-scene" id="beijing">
      <div className="shell">
        <div className="beijing-transition" aria-hidden="true">
          <span className="beijing-transition-line" />
          <span className="beijing-transition-icon">✦</span>
          <span className="beijing-transition-line" />
        </div>

        <article className="beijing-card">
          <div className="gift-section-heading">
            <p className="eyebrow">{giftExperienceCopy.beijing.eyebrow}</p>
            <h2>{giftExperienceCopy.beijing.title}</h2>
            <p>{giftExperienceCopy.beijing.description}</p>
          </div>

          <div className="beijing-details" aria-label="北京见面期待">
            {giftExperienceCopy.beijing.items.map((item, index) => (
              <div className="beijing-detail" key={item.title}>
                <span className="beijing-dot">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function MemoryBook({
  activeIndex,
  onPrev,
  onNext,
  onSelect,
  onSnowReveal,
  snowOpen
}: {
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  onSnowReveal: () => void;
  snowOpen: boolean;
}) {
  const current = homeMemories[activeIndex];

  return (
    <section className="gift-scene memory-scene" id="memories">
      <div className="shell">
        <div className="gift-section-heading">
          <p className="eyebrow">{giftExperienceCopy.memories.eyebrow}</p>
          <h2>{giftExperienceCopy.memories.title}</h2>
          <p>{giftExperienceCopy.memories.description}</p>
        </div>

        <div className="memory-book">
          <article className="memory-page">
            <div className="memory-page-copy" key={current.title}>
              <p className="card-meta">{current.meta}</p>
              <h3>{current.title}</h3>
              <p>{current.description}</p>

              {current.note ? (
                <button className="memory-secret" type="button" onClick={onSnowReveal}>
                  {giftExperienceCopy.memories.note}
                </button>
              ) : null}

              {current.note && snowOpen ? (
                <p className="memory-secret-reveal">{giftExperienceCopy.memories.reveal}</p>
              ) : null}
            </div>

            {current.image ? (
              <div className="memory-image-frame">
                <img alt={current.title} src={current.image} />
              </div>
            ) : (
              <div className="memory-image-frame memory-image-fallback" aria-hidden="true">
                <span>Memories</span>
              </div>
            )}
          </article>

          <div className="memory-nav">
            <button className="memory-arrow" type="button" onClick={onPrev}>
              上一页
            </button>
            <div className="memory-dots" aria-label="记忆页导航">
              {homeMemories.map((item, index) => (
                <button
                  aria-label={item.title}
                  className={classNames("memory-dot", activeIndex === index && "is-active")}
                  key={item.title}
                  onClick={() => onSelect(index)}
                  type="button"
                />
              ))}
            </div>
            <button className="memory-arrow" type="button" onClick={onNext}>
              下一页
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryTimeline() {
  return (
    <section className="gift-scene story-scene" id="story">
      <div className="shell">
        <div className="gift-section-heading story-heading">
          <p className="eyebrow">our story</p>
          <h2>我们的故事时间线</h2>
          <p>把一路走来的真实片段，整理成一条柔软的线。不是为了写得多盛大，是想让你看到：我记得，我们一路走来不是空的。</p>
        </div>

        <div className="story-timeline" aria-label="我们的故事时间线">
          {storyTimeline.map((item, index) => (
            <article className="story-node" key={`${item.time}-${item.title}`}>
              <div className="story-node-marker" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="story-node-card">
                <p className="card-meta">{item.time}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SnapshotGallery() {
  return (
    <section className="gift-scene snapshot-scene" id="snapshots">
      <div className="shell">
        <div className="gift-section-heading">
          <p className="eyebrow">little scenes</p>
          <h2>我一直记得的小画面</h2>
          <p>像翻一本小相册，每一张都不长，但每一张都是真的。</p>
        </div>

        <div className="snapshot-track" aria-label="我一直记得的小画面">
          {rememberedSnapshots.map((item, index) => (
            <article
              className="snapshot-note"
              key={item.title}
              style={{ "--tilt": `${index % 2 === 0 ? -1.6 : 1.4}deg` } as CSSProperties}
            >
              <span className="snapshot-pin" aria-hidden="true" />
              <p className="card-meta">scene {String(index + 1).padStart(2, "0")}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LotteryCard({
  amount,
  ready,
  onDraw
}: {
  amount: number | null;
  ready: boolean;
  onDraw: () => void;
}) {
  return (
    <section className="gift-scene lottery-scene" id="lottery">
      <div className="shell">
        <div className="gift-section-heading">
          <p className="eyebrow">{giftExperienceCopy.lottery.eyebrow}</p>
          <h2>{giftExperienceCopy.lottery.title}</h2>
          <p>{giftExperienceCopy.lottery.description}</p>
        </div>

        <article className={classNames("lottery-ticket", amount !== null && "is-revealed")}>
          <div className="lottery-stub">
            <span>daily luck</span>
            <strong>For Linbao</strong>
          </div>

          <div className="lottery-main">
            <p className="card-meta">today's little blessing</p>
            <div className="lottery-amount">{amount !== null ? `¥${amount}` : "¥?"}</div>
            <p className="lottery-result">
              {amount !== null
                ? `${giftExperienceCopy.lottery.resultPrefix}¥${amount}`
                : "轻轻点一下，看看今天的小好运藏了多少。"}
            </p>
            <button
              className="button-link button-primary"
              disabled={!ready || amount !== null}
              onClick={onDraw}
              type="button"
            >
              {amount !== null ? "好运已收到" : giftExperienceCopy.lottery.actionLabel}
            </button>
            <p className="lottery-rule">每天只有一次小确幸，这份好运刷新后也不会消失。</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function CouponCards({
  packOpen,
  couponStates,
  onOpenPack,
  onToggleFlip,
  onClaim
}: {
  packOpen: boolean;
  couponStates: Record<string, CouponState>;
  onOpenPack: () => void;
  onToggleFlip: (title: string) => void;
  onClaim: (title: string, message: string) => void;
}) {
  return (
    <section className="gift-scene coupon-scene" id="coupons">
      <div className="shell">
        <div className="gift-section-heading">
          <p className="eyebrow">{giftExperienceCopy.coupons.eyebrow}</p>
          <h2>{giftExperienceCopy.coupons.title}</h2>
          <p>{giftExperienceCopy.coupons.description}</p>
        </div>

        <div className="coupon-pack-stage">
          <button
            className={classNames("coupon-pack", packOpen && "is-open")}
            onClick={onOpenPack}
            type="button"
          >
            <span className="coupon-pack-ribbon" aria-hidden="true" />
            <span className="coupon-pack-copy">
              <span className="card-meta">gift card case</span>
              <strong>{giftExperienceCopy.coupons.packLabel}</strong>
              <span>轻轻一开，三张小权利就会慢慢滑出来。</span>
            </span>
          </button>

          <div className={classNames("coupon-grid", packOpen && "is-open")}>
            {dailyCoupons.map((coupon, index) => {
              const state = couponStates[coupon.title] ?? {
                claimed: false,
                flipped: false
              };

              return (
                <div
                  aria-label={coupon.title}
                  className={classNames("coupon-card", state.flipped && "is-flipped", state.claimed && "is-claimed")}
                  key={coupon.title}
                  onClick={() => onToggleFlip(coupon.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onToggleFlip(coupon.title);
                    }
                  }}
                  style={{ "--order": String(index) } as CSSProperties}
                >
                  <div className="coupon-card-inner">
                    <div className="coupon-face coupon-front">
                      <div>
                        <p className="card-meta">{coupon.meta}</p>
                        <h3>{coupon.title}</h3>
                        <p>{coupon.description}</p>
                      </div>

                      <button
                        className="button-link button-ghost coupon-action"
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onClaim(coupon.title, coupon.message);
                        }}
                      >
                        {state.claimed ? "已收入卡包" : coupon.actionLabel}
                      </button>
                    </div>

                    <div className="coupon-face coupon-back">
                      <p className="card-meta">back side</p>
                      <h3>已盖章的小回执</h3>
                      <p>{coupon.message}</p>
                      <span className="coupon-back-note">
                        {state.claimed ? "这张已经留在琳宝的卡包里了。" : "点一下正面就可以翻回来。"}
                      </span>
                    </div>
                  </div>

                  <span className="coupon-stamp">{state.claimed ? "已收下" : "待领取"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MysteryGiftBox({
  result,
  openingBox,
  onOpenBox
}: {
  result: MysteryResult | null;
  openingBox: string | null;
  onOpenBox: (box: string) => void;
}) {
  const selectedBox = result?.box ?? openingBox;

  return (
    <section className="gift-scene mystery-scene" id="mystery">
      <div className="shell">
        <div className="gift-section-heading">
          <p className="eyebrow">{giftExperienceCopy.mystery.eyebrow}</p>
          <h2>{giftExperienceCopy.mystery.title}</h2>
          <p>{giftExperienceCopy.mystery.description}</p>
        </div>

        <div className="mystery-grid">
          {mysteryBoxes.map((box) => (
            <button
              className={classNames(
                "mystery-box",
                selectedBox === box && "is-selected",
                openingBox === box && "is-opening"
              )}
              disabled={result !== null || openingBox !== null}
              key={box}
              onClick={() => onOpenBox(box)}
              type="button"
            >
              <span className="mystery-box-lid" />
              <span className="mystery-box-body">
                <span>{box}</span>
              </span>
            </button>
          ))}
        </div>

        <article className={classNames("mystery-result", result && "is-visible")}>
          {result ? (
            <>
              <p className="card-meta">{result.box} opened</p>
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </>
          ) : (
            <>
              <p className="card-meta">waiting for linbao</p>
              <h3>礼物还在盒子里</h3>
              <p>选一个顺眼的盒子，轻轻打开就好。</p>
            </>
          )}
        </article>
      </div>
    </section>
  );
}

function FinalBlessing({
  highlighted,
  onLightUp
}: {
  highlighted: boolean;
  onLightUp: () => void;
}) {
  return (
    <section className="gift-scene final-scene" id="signature">
      <div className="shell final-grid">
        <div className="gift-section-heading">
          <p className="eyebrow">{giftExperienceCopy.final.eyebrow}</p>
          <h2>{giftExperienceCopy.final.title}</h2>
          <p>{giftExperienceCopy.final.description}</p>
        </div>

        <article className={classNames("final-card", highlighted && "is-highlighted")}>
          <p className="final-signature">{giftExperienceCopy.final.signature}</p>
          <button className="button-link button-primary" type="button" onClick={onLightUp}>
            {giftExperienceCopy.final.buttonLabel}
          </button>
          <p className={classNames("final-reveal", highlighted && "is-visible")}>
            {giftExperienceCopy.final.revealText}
          </p>
        </article>
      </div>
    </section>
  );
}

function GiftPlanetHub({
  couponStates,
  finalHighlighted,
  messageDraft,
  mysteryResult,
  openingBox,
  savedMessage,
  onBurst,
  onClaim,
  onLightUp,
  onMessageChange,
  onOpenBox,
  onSaveMessage
}: {
  couponStates: Record<string, CouponState>;
  finalHighlighted: boolean;
  messageDraft: string;
  mysteryResult: MysteryResult | null;
  openingBox: string | null;
  savedMessage: string;
  onBurst: (kind: BurstKind, left: number, top: number) => void;
  onClaim: (title: string, message: string) => void;
  onLightUp: () => void;
  onMessageChange: (message: string) => void;
  onOpenBox: (box: string) => void;
  onSaveMessage: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const router = useRouter();
  const [activePortal, setActivePortal] = useState<PlanetPortalId | null>(null);
  const [planetMessageIndex, setPlanetMessageIndex] = useState(0);
  const [activeEgg, setActiveEgg] = useState<(typeof easterEggs)[number] | null>(null);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const [planetPulse, setPlanetPulse] = useState(false);
  const [travelingPortal, setTravelingPortal] = useState<(typeof planetPortals)[number] | null>(null);
  const pulseTimerRef = useRef<number | null>(null);
  const navigationTimerRef = useRef<number | null>(null);

  const foodVouchers = [
    dailyCoupons[1],
    {
      title: "甜品星尘券",
      description: "来北京后的第一份甜，奶茶、蛋糕、冰淇淋都可以，Long 负责买给你。",
      actionLabel: "收下甜品星",
      message: "甜品星已经亮起，来北京后的第一份甜要认真兑现。",
      meta: "sweet orbit"
    },
    {
      title: "北京第一顿饭预约",
      description: "你只管说想吃什么，剩下的路线、排队和安排都交给我。",
      actionLabel: "预约第一顿",
      message: "北京第一顿饭预约成功，Long 负责提前做功课。",
      meta: "first dinner"
    }
  ];

  const hugVouchers = [
    dailyCoupons[0],
    {
      title: "长期陪伴券",
      description: "不一定要说很多话，也可以只是陪你坐着、散步、发呆，长期有效。",
      actionLabel: "收下陪伴",
      message: "陪伴券已经收好。需要我的时候，Long 要认真出现。",
      meta: "company pass"
    }
  ];

  const activePortalMeta = activePortal
    ? planetPortals.find((item) => item.id === activePortal)
    : null;
  const planetFeedback = activePortalMeta
    ? activePortalMeta.travelText
    : planetWhispers[planetMessageIndex];

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current !== null) {
        window.clearTimeout(pulseTimerRef.current);
      }
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
    };
  }, []);

  function speakFromPlanet() {
    setPlanetMessageIndex((current) => {
      if (planetWhispers.length <= 1) {
        return current;
      }

      let next = randomBetween(0, planetWhispers.length - 1);
      if (next === current) {
        next = (next + 1) % planetWhispers.length;
      }
      return next;
    });
    setPlanetPulse(true);
    if (pulseTimerRef.current !== null) {
      window.clearTimeout(pulseTimerRef.current);
    }
    pulseTimerRef.current = window.setTimeout(() => {
      setPlanetPulse(false);
    }, 1200);
    onBurst("star", 50, 40);
  }

  function selectPortal(id: PlanetPortalId) {
    if (travelingPortal) {
      return;
    }

    const portal = planetPortals.find((item) => item.id === id);
    if (!portal) {
      return;
    }

    setActivePortal(id);
    setOrbitPaused(true);
    setActiveEgg(null);
    setTravelingPortal(portal);
    onBurst(id === "beijing" ? "firework" : "star", 50, 44);
    if (navigationTimerRef.current !== null) {
      window.clearTimeout(navigationTimerRef.current);
    }
    navigationTimerRef.current = window.setTimeout(() => {
      router.push(portal.href);
    }, 1180);
  }

  function revealEgg(egg: (typeof easterEggs)[number]) {
    setActiveEgg(egg);
    onBurst(egg.id === "snow" ? "snow" : egg.id === "lock" ? "star" : "petal", 50, 42);
  }

  function renderVoucherCluster(items: Array<{ title: string; description: string; actionLabel: string; message: string; meta: string }>) {
    return (
      <div className="portal-voucher-cluster">
        {items.map((item, index) => {
          const state = couponStates[item.title];

          return (
            <article className={classNames("portal-voucher", state?.claimed && "is-claimed")} key={item.title}>
              <span className="portal-voucher-orb" aria-hidden="true" style={{ "--order": String(index) } as CSSProperties} />
              <p className="card-meta">{item.meta}</p>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <button
                className="planet-action"
                type="button"
                onClick={() => {
                  onClaim(item.title, item.message);
                  onBurst("petal", 50, 46);
                }}
              >
                {state?.claimed ? "已经收进星球" : item.actionLabel}
              </button>
            </article>
          );
        })}
      </div>
    );
  }

  function renderPortalContent() {
    if (activePortal === "story") {
      return (
        <div className="portal-story-world">
          {storyTimeline.map((item, index) => (
            <article className="portal-story-comet" key={`${item.time}-${item.title}`}>
              <span className="portal-story-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="card-meta">{item.time}</p>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (activePortal === "gift") {
      return (
        <div className="portal-gift-world">
          <div className="portal-gift-copy">
            <p>这颗星上没有普通抽奖台，只有几只软软的小礼盒。挑一个顺眼的，它会慢慢打开。</p>
          </div>
          <div className="mystery-grid planet-mystery-grid">
            {mysteryBoxes.map((box) => {
              const selectedBox = mysteryResult?.box ?? openingBox;

              return (
                <button
                  className={classNames(
                    "mystery-box",
                    selectedBox === box && "is-selected",
                    openingBox === box && "is-opening"
                  )}
                  disabled={mysteryResult !== null || openingBox !== null}
                  key={box}
                  onClick={() => onOpenBox(box)}
                  type="button"
                >
                  <span className="mystery-box-lid" />
                  <span className="mystery-box-body">
                    <span>{box}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <article className={classNames("planet-result-note", mysteryResult && "is-visible")}>
            {mysteryResult ? (
              <>
                <p className="card-meta">{mysteryResult.box} opened</p>
                <h4>{mysteryResult.title}</h4>
                <p>{mysteryResult.description}</p>
              </>
            ) : (
              <>
                <p className="card-meta">waiting</p>
                <h4>礼物还在小星盒里</h4>
                <p>琳宝选中之后，它会轻轻亮起来。</p>
              </>
            )}
          </article>
        </div>
      );
    }

    if (activePortal === "food") {
      return renderVoucherCluster(foodVouchers);
    }

    if (activePortal === "movie") {
      return renderVoucherCluster([
        {
          title: "科幻电影约会券",
          description: "可以选一部想看的科幻电影。我们买点好吃的，坐在一起，把宇宙和时间都慢慢看完。",
          actionLabel: "收下银河影院星",
          message: "银河影院星已经点亮，下一场科幻电影约会由 Long 负责安排。",
          meta: "sci-fi date"
        }
      ]);
    }

    if (activePortal === "hug") {
      return renderVoucherCluster(hugVouchers);
    }

    if (activePortal === "beijing") {
      return (
        <div className="beijing-destination-world">
          <div className="beijing-invite-planet" aria-hidden="true">
            <span className="beijing-planet-glow" />
            <span className="beijing-planet-city" />
            <span className="beijing-planet-ticket">北京见</span>
          </div>
          <div className="beijing-route-notes">
            {giftExperienceCopy.beijing.items.map((item, index) => (
              <article className="beijing-route-note" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="message-planet-world">
        <form className="message-planet-form" onSubmit={onSaveMessage}>
          <label htmlFor="planet-message">给 Long 留一句话</label>
          <textarea
            id="planet-message"
            onChange={(event) => onMessageChange(event.target.value)}
            placeholder="可以写一句想说的话，或者只写一个抱抱。"
            value={messageDraft}
          />
          <button className="planet-action" type="submit">
            把话放进悄悄话星
          </button>
        </form>

        <article className="message-planet-saved">
          <p className="card-meta">saved starlight</p>
          {savedMessage ? <p>{savedMessage}</p> : <p>这里还空着，等琳宝放进一句小小的话。</p>}
        </article>

        <article className={classNames("message-final-glow", finalHighlighted && "is-highlighted")}>
          <p>{giftExperienceCopy.final.signature}</p>
          <button className="planet-action" type="button" onClick={onLightUp}>
            {giftExperienceCopy.final.buttonLabel}
          </button>
          {finalHighlighted ? <span>{giftExperienceCopy.final.revealText}</span> : null}
        </article>
      </div>
    );
  }

  return (
    <section
      className={classNames(
        "planet-hub",
        activeEgg?.id === "snow" && "is-snowing",
        orbitPaused && "is-orbit-paused",
        activePortal && "is-portal-focusing",
        planetPulse && "is-planet-speaking",
        travelingPortal && "is-journeying"
      )}
      id="gift-planet"
    >
      <div className="planet-starfield" aria-hidden="true">
        <span className="planet-star planet-star-one" />
        <span className="planet-star planet-star-two" />
        <span className="planet-star planet-star-three" />
        <span className="planet-orbit-line planet-orbit-one" />
        <span className="planet-orbit-line planet-orbit-two" />
        <span className="planet-orbit-line planet-orbit-three" />
        {Array.from({ length: 28 }, (_, index) => (
          <span
            className="planet-snowflake"
            key={index}
            style={
              {
                "--fall-delay": `${index * 120}ms`,
                "--fall-left": `${(index * 13 + 7) % 100}%`
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="shell planet-hub-shell">
          <div className="planet-hub-heading">
            <p className="eyebrow">linbao gift planet</p>
            <h1 className="planet-title" aria-label="琳宝的礼物星球">
              {Array.from("琳宝的礼物星球").map((char, index) => (
                <span aria-hidden="true" key={`${char}-${index}`} style={{ "--char-index": index } as CSSProperties}>
                  {char}
                </span>
              ))}
            </h1>
          <p>这里不是普通网页，是 Long 给你藏起来的一小片宇宙。点一点星球，慢慢探索。</p>
        </div>

        <div className="planet-system" aria-label="琳宝的礼物星球入口">
          <div className="planet-orbit-map" aria-hidden="true">
            <span className="system-orbit-ring system-orbit-inner" />
            <span className="system-orbit-ring system-orbit-middle" />
            <span className="system-orbit-ring system-orbit-outer" />
          </div>

          <button className="main-gift-planet" type="button" onClick={speakFromPlanet}>
            <span className="main-planet-aura" aria-hidden="true" />
            <span className="main-planet-body" aria-hidden="true">
              <span className="main-planet-texture" />
              <span className="main-planet-land main-planet-land-one" />
              <span className="main-planet-land main-planet-land-two" />
              <span className="main-planet-glow main-planet-glow-one" />
              <span className="main-planet-glow main-planet-glow-two" />
              <span className="main-planet-relief relief-gift" />
              <span className="main-planet-relief relief-flower" />
              <span className="main-planet-relief relief-cake" />
              <span className="main-planet-relief relief-film" />
              <span className="main-planet-relief relief-bowl" />
            </span>
            <span className="main-planet-shadow" aria-hidden="true" />
            <span className="planet-whisper" aria-live="polite">
              {planetFeedback}
            </span>
          </button>

          <div className="planet-satellite-layer">
            {planetPortals.map((portal, index) => (
              <div
                className={classNames(
                  "gift-orbit-runner",
                  `orbit-${portal.orbit}`,
                  activePortal === portal.id && "is-active"
                )}
                key={portal.id}
                style={
                  {
                    "--orbit-angle": portal.angle,
                    "--orbit-duration": portal.duration,
                    "--orbit-radius-x": portal.radiusX,
                    "--orbit-radius-y": portal.radiusY,
                    "--orbit-z": String(planetPortals.length - index)
                  } as CSSProperties
                }
              >
                <button
                  className={classNames(
                    "gift-satellite",
                    `satellite-${portal.tone}`,
                    activePortal === portal.id && "is-active"
                  )}
                  onClick={() => selectPortal(portal.id)}
                  style={
                    {
                      "--orbit-angle": portal.angle,
                      "--orbit-counter-angle": portal.counterAngle,
                      "--orbit-duration": portal.duration
                    } as CSSProperties
                  }
                  type="button"
                >
                  <span className="satellite-shell" aria-hidden="true">
                    <span className="satellite-halo" />
                    <span className="satellite-planet-ring satellite-ring-back" />
                    <span className="satellite-inner-ring" />
                    <span className="satellite-core">
                      <span>{portal.glyph}</span>
                    </span>
                    <span className="satellite-planet-ring satellite-ring-front" />
                    <span className="satellite-sparkle" />
                  </span>
                  <span className="satellite-label">{portal.label}</span>
                </button>
              </div>
            ))}
          </div>

          <div className="planet-easter-layer">
            {easterEggs.map((egg) => (
              <button
                aria-label={egg.label}
                className={classNames("planet-easter-egg", activeEgg?.id === egg.id && "is-active")}
                key={egg.id}
                onClick={() => revealEgg(egg)}
                style={{ "--egg-x": egg.x, "--egg-y": egg.y } as CSSProperties}
                type="button"
              >
                {egg.glyph}
              </button>
            ))}
          </div>
        </div>
        <p className="planet-map-hint">点一颗运行中的小星球，镜头会带你进入它的小世界。</p>
      </div>

      {travelingPortal ? (
        <div
          aria-live="polite"
          className={classNames("planet-journey-overlay", `journey-${travelingPortal.transition}`)}
        >
          <div className="journey-stage" aria-hidden="true">
            <span className="journey-vortex" />
            <span className="journey-orbit" />
            <span className="journey-orbit journey-orbit-alt" />
            <span className="journey-gift-lid" />
            <span className="journey-steam journey-steam-one" />
            <span className="journey-steam journey-steam-two" />
            <span className="journey-soft-wave" />
            <span className="journey-film-strip" />
            <span className="journey-route-line" />
            <span className="journey-letter" />
            <span className="journey-photo-card journey-photo-one" />
            <span className="journey-photo-card journey-photo-two" />
            <span className="journey-sea-wave" />
            <span className="journey-calendar">1999</span>
          </div>
          <div className="journey-copy">
            <p className="card-meta">{travelingPortal.transitionName}</p>
            <strong>{travelingPortal.label}</strong>
            <span>{travelingPortal.travelText}</span>
          </div>
        </div>
      ) : null}

      {activeEgg ? (
        <aside className="planet-egg-reveal" aria-live="polite">
          <button aria-label="关闭彩蛋" type="button" onClick={() => setActiveEgg(null)}>
            ×
          </button>
          <p className="card-meta">{activeEgg.label}</p>
          <p>{activeEgg.text}</p>
        </aside>
      ) : null}
    </section>
  );
}

function SoftModal({
  title,
  message,
  closeLabel,
  onClose
}: {
  title: string;
  message: string;
  closeLabel: string;
  onClose: () => void;
}) {
  return (
    <div className="soft-modal-backdrop" onClick={onClose} role="presentation">
      <article className="soft-modal" onClick={(event) => event.stopPropagation()}>
        <p className="card-meta">礼物回执</p>
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="button-link button-primary" type="button" onClick={onClose}>
          {closeLabel}
        </button>
      </article>
    </div>
  );
}

function BurstLayer({ bursts }: { bursts: Burst[] }) {
  return (
    <div aria-hidden="true" className="burst-layer">
      {bursts.map((burst) =>
        burst.particles.map((particle) => {
          const style = {
            left: `${burst.left}%`,
            top: `${burst.top}%`,
            ["--dx" as string]: `${particle.dx}px`,
            ["--dy" as string]: `${particle.dy}px`,
            ["--rotate" as string]: `${particle.rotate}deg`,
            ["--scale" as string]: String(particle.scale),
            ["--duration" as string]: `${particle.duration}ms`,
            ["--delay" as string]: `${particle.delay}ms`,
            ["--color" as string]: particle.color
          } as CSSProperties;

          return (
            <span
              className={classNames("burst-particle", `burst-particle--${burst.kind}`, `burst-particle--${particle.shape}`)}
              key={`${burst.id}-${particle.id}`}
              style={style}
            />
          );
        })
      )}
    </div>
  );
}

export function GiftExperience() {
  const [hasOpened, setHasOpened] = useState(false);
  const [introStage, setIntroStage] = useState<IntroStage>("cover");
  const [countdownValue, setCountdownValue] = useState<CountdownValue>(5);
  const [introOpening, setIntroOpening] = useState(false);
  const [lotteryAmount, setLotteryAmount] = useState<number | null>(null);
  const [couponStates, setCouponStates] = useState<Record<string, CouponState>>({});
  const [couponPackOpen, setCouponPackOpen] = useState(false);
  const [mysteryResult, setMysteryResult] = useState<MysteryResult | null>(null);
  const [openingBox, setOpeningBox] = useState<string | null>(null);
  const [burstLayer, setBurstLayer] = useState<Burst[]>([]);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [finalHighlighted, setFinalHighlighted] = useState(false);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [snowOpen, setSnowOpen] = useState(false);
  const [weddingAnswer, setWeddingAnswer] = useState("");
  const [weddingRiddleSolved, setWeddingRiddleSolved] = useState(false);
  const [weddingRiddleError, setWeddingRiddleError] = useState(false);
  const [messageDraft, setMessageDraft] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const worldRef = useRef<HTMLDivElement | null>(null);
  const burstIdRef = useRef(0);
  const burstTimersRef = useRef<number[]>([]);

  useEffect(() => {
    setLotteryAmount(readStoredNumber(LOTTERY_KEY));
    setMysteryResult(readStoredMystery());
    setCouponStates(readStoredCouponStates());
    setCouponPackOpen(readStoredPackState());
    const storedMessage = readStoredMessage();
    setSavedMessage(storedMessage);
    setMessageDraft(storedMessage);

    const params = new URLSearchParams(window.location.search);
    if (params.get("open") === "planet") {
      setHasOpened(true);
      setIntroStage("opening");
    }
  }, []);

  useEffect(() => {
    document.body.dataset.giftState = hasOpened ? "open" : "closed";

    return () => {
      delete document.body.dataset.giftState;
    };
  }, [hasOpened]);

  useEffect(() => {
    return () => {
      burstTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      burstTimersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!hasOpened) {
      return;
    }

    const hash = window.location.hash;
    if (hash && hash !== "#cover") {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }, [hasOpened]);

  function spawnBurst(kind: BurstKind, left: number, top: number) {
    const id = ++burstIdRef.current;
    const burst = createBurst(kind, id, left, top);

    setBurstLayer((current) => [...current.slice(-5), burst]);

    const timer = window.setTimeout(() => {
      setBurstLayer((current) => current.filter((item) => item.id !== id));
    }, BURST_LIFETIME);

    burstTimersRef.current.push(timer);
  }

  function startIntroSequence() {
    if (introStage !== "cover" || introOpening || hasOpened) {
      return;
    }

    setWeddingAnswer("");
    setWeddingRiddleSolved(false);
    setWeddingRiddleError(false);
    setIntroStage("loading");
    spawnBurst("star", 50, 44);

    const timers = [
      window.setTimeout(() => {
        setIntroStage("countdown");
        setCountdownValue(5);
        spawnBurst("firework", 50, 42);
        spawnBurst("petal", 44, 38);
      }, 2200),
      window.setTimeout(() => {
        setCountdownValue(4);
        spawnBurst("star", 50, 42);
        spawnBurst("petal", 58, 36);
      }, 3600),
      window.setTimeout(() => {
        setCountdownValue(3);
        spawnBurst("firework", 50, 42);
      }, 5000),
      window.setTimeout(() => {
        setCountdownValue(2);
        spawnBurst("star", 50, 42);
        spawnBurst("petal", 42, 38);
      }, 6400),
      window.setTimeout(() => {
        setCountdownValue(1);
        spawnBurst("firework", 50, 42);
        spawnBurst("petal", 56, 36);
      }, 7800),
      window.setTimeout(() => {
        setIntroStage("cake");
        spawnBurst("firework", 50, 42);
      }, 9400)
    ];

    burstTimersRef.current.push(...timers);
  }

  function openGift() {
    if (introOpening || hasOpened || introStage !== "cake" || !weddingRiddleSolved) {
      if (introStage === "cake" && !weddingRiddleSolved) {
        setWeddingRiddleError(true);
      }
      return;
    }

    setIntroStage("opening");
    setIntroOpening(true);

    // Stage 1: plush press and first tiny petals (520ms)
    const s1Timer = window.setTimeout(() => {
      spawnBurst("petal", 50, 36);
    }, 520);
    burstTimersRef.current.push(s1Timer);

    // Stage 2: bow and ribbon loosen with stars (1150ms)
    const s2Timer = window.setTimeout(() => {
      spawnBurst("star", 48, 32);
    }, 1150);
    burstTimersRef.current.push(s2Timer);

    // Stage 3: lid opens, ticket fragments lift (1750ms)
    const s3Timer = window.setTimeout(() => {
      spawnBurst("ticket", 52, 38);
    }, 1750);
    burstTimersRef.current.push(s3Timer);

    // Stage 4: fabric confetti and ribbons drift (2450ms)
    const s4Timer = window.setTimeout(() => {
      spawnBurst("petal", 46, 30);
    }, 2450);
    burstTimersRef.current.push(s4Timer);

    // Stage 5: warm sparkle finale (3200ms)
    const s5Timer = window.setTimeout(() => {
      spawnBurst("firework", 50, 34);
    }, 3200);
    burstTimersRef.current.push(s5Timer);

    // Transition to main content after animation completes
    window.setTimeout(() => {
      setHasOpened(true);
      setIntroOpening(false);
      window.requestAnimationFrame(() => {
        worldRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 5100);
  }

  function submitWeddingRiddle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (introOpening || hasOpened || introStage !== "cake" || weddingRiddleSolved) {
      return;
    }

    const normalized = normalizeWeddingAnswer(weddingAnswer);

    if (WEDDING_RIDDLE_ACCEPTED_DIGITS.has(normalized)) {
      setWeddingAnswer(WEDDING_RIDDLE_ANSWER);
      setWeddingRiddleSolved(true);
      setWeddingRiddleError(false);
      spawnBurst("star", 50, 42);
      return;
    }

    setWeddingRiddleError(true);
    spawnBurst("snow", 50, 42);
  }

  function drawLottery() {
    if (lotteryAmount !== null) {
      return;
    }

    const amount = randomBetween(1, 100);
    getStorage()?.setItem(LOTTERY_KEY, String(amount));
    setLotteryAmount(amount);
    spawnBurst("petal", 50, 52);
    void submitLoveEvent({
      eventType: "lottery_draw",
      planet: "惊喜仓星",
      title: "今日份小确幸",
      value: `¥${amount}`,
      message: `琳宝抽到了 ¥${amount} 的小好运。`
    });
  }

  function openPack() {
    if (couponPackOpen) {
      return;
    }

    setCouponPackOpen(true);
    getStorage()?.setItem(COUPON_PACK_KEY, "open");
    spawnBurst("snow", 50, 42);
  }

  function toggleCouponFlip(title: string) {
    setCouponStates((current) => {
      const next = {
        ...current,
        [title]: {
          claimed: current[title]?.claimed ?? false,
          flipped: !(current[title]?.flipped ?? false)
        }
      };
      getStorage()?.setItem(COUPON_KEY, JSON.stringify(next));
      return next;
    });
  }

  function claimCoupon(title: string, message: string) {
    setCouponStates((current) => {
      const next = {
        ...current,
        [title]: {
          claimed: true,
          flipped: true
        }
      };
      getStorage()?.setItem(COUPON_KEY, JSON.stringify(next));
      return next;
    });

    setReceipt({
      title,
      message
    });
    spawnBurst("petal", 50, 46);
    void submitLoveEvent({
      eventType: "coupon_claim",
      planet: "礼物星球",
      title,
      value: title,
      message
    });
  }

  function openMysteryBox(box: string) {
    if (mysteryResult || openingBox) {
      return;
    }

    const prize = randomChoice(mysteryPrizes);
    const result = {
      box,
      title: prize.title,
      description: prize.description
    };

    getStorage()?.setItem(MYSTERY_KEY, JSON.stringify(result));
    setOpeningBox(box);
    spawnBurst("firework", 50, 40);

    window.setTimeout(() => {
      setMysteryResult(result);
      setOpeningBox(null);
    }, 520);
    void submitLoveEvent({
      eventType: "gift_draw",
      planet: "惊喜仓星",
      title: box,
      value: prize.title,
      message: prize.description
    });
  }

  function lightUpFinal() {
    setFinalHighlighted(true);
    setReceipt({
      title: giftExperienceCopy.final.buttonLabel,
      message: giftExperienceCopy.final.revealText
    });
    spawnBurst("firework", 50, 48);
  }

  function closeReceipt() {
    setReceipt(null);
  }

  function goToMemory(index: number) {
    setMemoryIndex(index);
    setSnowOpen(false);
  }

  function goPrevMemory() {
    goToMemory((memoryIndex - 1 + homeMemories.length) % homeMemories.length);
  }

  function goNextMemory() {
    goToMemory((memoryIndex + 1) % homeMemories.length);
  }

  function revealSnow() {
    if (snowOpen) {
      return;
    }

    setSnowOpen(true);
    spawnBurst("snow", 50, 38);
  }

  function savePlanetMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = messageDraft.trim();
    if (!trimmed) {
      setReceipt({
        title: "悄悄话星还空着",
        message: "可以只写一句很短的话，或者写一个抱抱。"
      });
      return;
    }

    getStorage()?.setItem(MESSAGE_KEY, trimmed);
    setSavedMessage(trimmed);
    setReceipt({
      title: "悄悄话星收到啦",
      message: "这句话已经被放进琳宝的礼物星球里。"
    });
    spawnBurst("star", 50, 46);
    void submitLoveEvent({
      eventType: "message_submit",
      planet: "悄悄话星",
      title: "给 Long 留一句话",
      value: trimmed,
      message: trimmed
    });
  }

  return (
    <div className={classNames("gift-experience", hasOpened && "is-entered")}>
      <section
        className={classNames(
          "gift-intro",
          `intro-stage-${introStage}`,
          hasOpened && "is-open",
          introOpening && "is-opening"
        )}
        id="cover"
      >
        <div className="shell gift-intro-layout">
          <div className="intro-particle-stage" aria-hidden="true">
            <span className="intro-particle-field intro-particle-field-back" />
            <span className="intro-particle-field intro-particle-field-mid" />
            <span className="intro-particle-field intro-particle-field-front" />
            <span className="intro-nebula intro-nebula-one" />
            <span className="intro-nebula intro-nebula-two" />
          </div>

          <div className="intro-hud">
            <div className="intro-status">
              <span className="intro-status-dot" />
              <span>
                {introStage === "cover"
                  ? "礼物系统已准备"
                  : introStage === "loading"
                    ? "惊喜正在加载"
                    : introStage === "countdown"
                      ? "粒子开始汇聚"
                      : introStage === "opening"
                        ? "礼物正在打开"
                        : "生日模式启动"}
              </span>
            </div>

            <div className="intro-toolbox" aria-label="开场快捷入口">
              <MusicButton className="intro-tool-button" />
              <button className="intro-tool-button" type="button" aria-label="卡包">
                ◈
              </button>
            </div>
          </div>

          <div className="intro-decor-layer" aria-hidden="true">
            <span className="intro-decor intro-decor-flower intro-decor-one" />
            <span className="intro-decor intro-decor-petal intro-decor-two" />
            <span className="intro-decor intro-decor-star intro-decor-three" />
            <span className="intro-decor intro-decor-photo intro-decor-four" />
            <span className="intro-decor intro-decor-heart intro-decor-five" />
            <span className="intro-decor intro-decor-ribbon intro-decor-six" />
          </div>

          <RibbonRain />

          {introStage === "cover" ? (
            <button className="intro-cover-start" type="button" onClick={startIntroSequence}>
              <span className="intro-cover-glow" aria-hidden="true" />
              <span className="intro-cover-title">今晚，有一份生日礼物想送给你</span>
              <span className="intro-cover-subtitle">先别急，惊喜正在慢慢亮起来。</span>
              <span className="intro-cover-hint">轻点一下，进入礼物世界</span>
            </button>
          ) : null}

          <div className={classNames("intro-loading-card", introStage === "loading" && "is-visible")}>
            <p className="intro-loading-script">Happy Birthday</p>
            <h2>正在整理属于你的生日惊喜</h2>
            <p>正在点亮今晚的小宇宙</p>
            <div className="intro-loading-bar" aria-hidden="true">
              <span />
            </div>
            <strong>Loading...</strong>
          </div>

          <div className={classNames("intro-countdown-stage", introStage === "countdown" && "is-visible")}>
            <ParticleDigit value={countdownValue} />
            <p>那些粒子开始慢慢汇聚，惊喜也快出现了。</p>
          </div>

          <div className={classNames("intro-cake-stage", (introStage === "cake" || introStage === "opening") && "is-visible")}>
            <button
              aria-label="打开生日礼物世界"
              className="intro-cake-button"
              disabled={introOpening || hasOpened || introStage !== "cake" || !weddingRiddleSolved}
              onClick={openGift}
              type="button"
            >
              <CakeReveal />
            </button>

            <form
              className={classNames(
                "wedding-riddle",
                weddingRiddleSolved && "is-solved",
                weddingRiddleError && "has-error"
              )}
              onSubmit={submitWeddingRiddle}
            >
              <label htmlFor="wedding-riddle-answer">解开蛋糕的小谜底</label>
              <div className="wedding-riddle-row">
                <input
                  autoComplete="off"
                  disabled={introOpening || hasOpened || introStage !== "cake" || weddingRiddleSolved}
                  id="wedding-riddle-answer"
                  inputMode="text"
                  onChange={(event) => {
                    setWeddingAnswer(event.target.value);
                    setWeddingRiddleError(false);
                  }}
                  placeholder="例如 2024年2月12日 或 20240212"
                  type="text"
                  value={weddingAnswer}
                />
                <button disabled={introOpening || hasOpened || introStage !== "cake" || weddingRiddleSolved} type="submit">
                  {weddingRiddleSolved ? "已解锁" : "解谜"}
                </button>
              </div>
              <p aria-live="polite">
                {introOpening
                  ? "生日礼物正在打开。"
                  : weddingRiddleSolved
                    ? "答对了，轻点蛋糕打开礼物世界。"
                    : weddingRiddleError
                      ? "还差一点，再想想那个真正属于我们的日期。"
                      : "谜面：哪一天，让我们正式成为一家人？可写中文日期，也可以直接输入数字。"}
              </p>
            </form>
          </div>

          <div className={classNames("intro-opening-copy", introOpening && "is-visible")}>
            <span>有些惊喜先送到你面前，</span>
            <span>有些想留到北京见面时慢慢给你。</span>
          </div>
        </div>
      </section>

      <main
        ref={worldRef}
        className={classNames("gift-world", hasOpened && "is-visible")}
        aria-hidden={!hasOpened}
      >
        <GiftPlanetHub
          couponStates={couponStates}
          finalHighlighted={finalHighlighted}
          messageDraft={messageDraft}
          mysteryResult={mysteryResult}
          openingBox={openingBox}
          savedMessage={savedMessage}
          onBurst={spawnBurst}
          onClaim={claimCoupon}
          onLightUp={lightUpFinal}
          onMessageChange={setMessageDraft}
          onOpenBox={openMysteryBox}
          onSaveMessage={savePlanetMessage}
        />
      </main>

      {receipt ? (
        <SoftModal
          closeLabel={giftExperienceCopy.coupons.closeLabel}
          message={receipt.message}
          onClose={closeReceipt}
          title={receipt.title}
        />
      ) : null}

      <BurstLayer bursts={burstLayer} />
    </div>
  );
}

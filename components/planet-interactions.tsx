"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import type { DailyCoupon, MysteryPrize } from "@/data/site";
import { submitLoveEvent } from "@/lib/love-events";
import type { StarBoxGiftInput } from "@/components/star-box";
import { useStarBox } from "@/components/star-box";

type GiftBoxesProps = {
  boxes: string[];
  prizes: MysteryPrize[];
};

type CouponClusterProps = {
  items: Array<DailyCoupon | { title: string; description: string; actionLabel: string; message: string; meta: string }>;
  eventType?: string;
  planet?: string;
};

type LoveEventFormProps = {
  buttonLabel: string;
  eventType: string;
  helpText?: string;
  label: string;
  planet: string;
  placeholder: string;
  title: string;
};

const MYSTERY_KEY = "linbao-giftbox-mystery-page";
const STAR_FORTUNE_KEY = "linbao-star-fortune-machine-v1";
const COUPON_KEY = "linbao-giftbox-planet-coupons";
const MESSAGE_KEY = "linbao-giftbox-message";

type FortuneSymbol = {
  id: string;
  label: string;
  tone: string;
};

type FortuneResult = {
  id: string;
  title: string;
  description: string;
  redeem: string;
  category: "即时惊喜" | "北京见面兑现" | "未来愿望基金";
  symbols: [string, string, string];
  tone: string;
};

type GiftPoolItem = {
  id: string;
  title: string;
  short: string;
  detail: string;
  category: "即时惊喜" | "北京见面兑现" | "未来愿望基金";
  token: string;
  tone: string;
};

const fortuneSymbols: FortuneSymbol[] = [
  { id: "red-packet", label: "红包", tone: "rose" },
  { id: "hotpot", label: "火锅", tone: "peach" },
  { id: "milk-tea", label: "奶茶", tone: "cream" },
  { id: "ticket", label: "电影票", tone: "blue" },
  { id: "star", label: "星星", tone: "gold" },
  { id: "gift", label: "礼盒", tone: "gold" },
  { id: "hug", label: "抱抱", tone: "pink" },
  { id: "console", label: "游戏机", tone: "violet" },
  { id: "notebook", label: "笔记本", tone: "silver" },
  { id: "beijing-night", label: "北京夜景", tone: "ice" },
  { id: "wave", label: "海浪", tone: "mint" }
];

const fortuneResults: FortuneResult[] = [
  {
    id: "red-52",
    title: "52 元红包",
    description: "一份小小心意，今天就可以找 Long 领取。数字不大，但偏爱是真的。",
    redeem: "今天可兑现",
    category: "即时惊喜",
    symbols: ["red-packet", "star", "gift"],
    tone: "rose"
  },
  {
    id: "red-66",
    title: "66 元红包",
    description: "希望琳宝今天顺顺利利、甜甜开心，这份小红包先替我抱一下你。",
    redeem: "今天可兑现",
    category: "即时惊喜",
    symbols: ["red-packet", "star", "milk-tea"],
    tone: "gold"
  },
  {
    id: "red-88",
    title: "88 元红包",
    description: "好运和偏爱都给你，生日这天你只负责开心一点。",
    redeem: "今天可兑现",
    category: "即时惊喜",
    symbols: ["red-packet", "gift", "star"],
    tone: "gold"
  },
  {
    id: "milk-dessert",
    title: "奶茶和甜品",
    description: "可以今天加一杯甜，也可以攒到来北京后，让 Long 亲手买给你。",
    redeem: "今天或北京后兑现",
    category: "即时惊喜",
    symbols: ["milk-tea", "star", "gift"],
    tone: "cream"
  },
  {
    id: "hug-unlimited",
    title: "抱抱无限次",
    description: "想撒娇、想被哄、想靠一会儿的时候，这份永远不用预约。",
    redeem: "长期有效",
    category: "即时惊喜",
    symbols: ["hug", "star", "gift"],
    tone: "pink"
  },
  {
    id: "today-queen",
    title: "今天你最大",
    description: "今天的小任性、小要求、小想法，都可以优先被认真听见。",
    redeem: "今天可兑现",
    category: "即时惊喜",
    symbols: ["star", "hug", "gift"],
    tone: "violet"
  },
  {
    id: "beijing-hotpot",
    title: "北京火锅兑现券",
    description: "六月底来北京，你负责选口味和想吃的菜，Long 负责安排。",
    redeem: "来北京后兑现",
    category: "北京见面兑现",
    symbols: ["hotpot", "beijing-night", "star"],
    tone: "peach"
  },
  {
    id: "beijing-cinema",
    title: "北京电影院包场券",
    description: "选一部你想看的科幻电影，我们一起坐下来，慢慢看完。",
    redeem: "来北京后兑现",
    category: "北京见面兑现",
    symbols: ["ticket", "star", "hug"],
    tone: "blue"
  },
  {
    id: "beijing-walk",
    title: "北京夜景散步券",
    description: "晚一点出门，慢慢走一段只属于我们的路，把没见面的想念补回来。",
    redeem: "来北京后兑现",
    category: "北京见面兑现",
    symbols: ["beijing-night", "star", "ticket"],
    tone: "ice"
  },
  {
    id: "beijing-first-gift",
    title: "来北京后的第一份惊喜",
    description: "具体内容先保密，我想留到见面那天，亲手交到你手里。",
    redeem: "来北京后兑现",
    category: "北京见面兑现",
    symbols: ["gift", "beijing-night", "star"],
    tone: "ice"
  },
  {
    id: "beijing-appointment",
    title: "六月底见面礼预约权",
    description: "这份预约权已经写进星盒，等你到北京，它就会被认真打开。",
    redeem: "来北京后兑现",
    category: "北京见面兑现",
    symbols: ["gift", "hug", "beijing-night"],
    tone: "violet"
  },
  {
    id: "console-fund",
    title: "游戏机愿望基金",
    description: "这是一颗未来愿望球，我们可以一起认真规划，让快乐慢慢落地。",
    redeem: "未来认真规划",
    category: "未来愿望基金",
    symbols: ["console", "star", "gift"],
    tone: "violet"
  },
  {
    id: "notebook-fund",
    title: "笔记本电脑愿望基金",
    description: "高级愿望先写进星轨，等预算和时机合适，我们一起慢慢实现。",
    redeem: "未来认真规划",
    category: "未来愿望基金",
    symbols: ["notebook", "star", "gift"],
    tone: "silver"
  },
  {
    id: "sea-fund",
    title: "看海旅行愿望基金",
    description: "以后找一个不用赶时间的日子，陪你慢慢走到海边。",
    redeem: "未来认真规划",
    category: "未来愿望基金",
    symbols: ["wave", "star", "hug"],
    tone: "mint"
  },
  {
    id: "secret-booking",
    title: "神秘礼物预约权",
    description: "有些惊喜适合先藏起来，等某个刚好的日子再出现。",
    redeem: "未来认真规划",
    category: "未来愿望基金",
    symbols: ["gift", "star", "notebook"],
    tone: "gold"
  },
  {
    id: "love-forever",
    title: "Long 的爱永久有效",
    description: "这个不用抽，也不用预约，因为它本来就是你的。",
    redeem: "永久有效",
    category: "未来愿望基金",
    symbols: ["hug", "star", "wave"],
    tone: "pink"
  }
];

const giftPoolItems: GiftPoolItem[] = [
  {
    id: "pool-red-52",
    title: "52 元红包",
    short: "今天先收一份小小心意。",
    detail: "生日当天可以直接找 Long 兑现。数字小小的，但这份偏爱不是临时起意。",
    category: "即时惊喜",
    token: "红包",
    tone: "rose"
  },
  {
    id: "pool-red-66",
    title: "66 元红包",
    short: "祝今天顺顺利利。",
    detail: "希望琳宝今天的开心可以顺着星轨一路亮下去。",
    category: "即时惊喜",
    token: "顺",
    tone: "gold"
  },
  {
    id: "pool-red-88",
    title: "88 元红包",
    short: "好运和偏爱都给你。",
    detail: "这张礼物卡写着：生日这天，你只负责被认真偏爱。",
    category: "即时惊喜",
    token: "偏爱",
    tone: "gold"
  },
  {
    id: "pool-milk-tea",
    title: "奶茶和甜品",
    short: "把今天变甜一点。",
    detail: "可以今天喝，也可以攒到北京。Long 负责买，琳宝负责挑。",
    category: "即时惊喜",
    token: "甜",
    tone: "cream"
  },
  {
    id: "pool-hug",
    title: "抱抱无限次",
    short: "想撒娇的时候打开。",
    detail: "这份不用排队，不用过期。只要你想要，Long 就应该靠近一点。",
    category: "即时惊喜",
    token: "抱抱",
    tone: "pink"
  },
  {
    id: "pool-queen",
    title: "今天你最大",
    short: "生日当天的特别权限。",
    detail: "今天可以任性一点，可以慢一点，也可以把想要的都说出来。",
    category: "即时惊喜",
    token: "最大",
    tone: "violet"
  },
  {
    id: "pool-hotpot",
    title: "北京火锅兑现券",
    short: "来北京后的第一顿香香。",
    detail: "等你来了，北京的第一顿火锅先安排上。你负责选，我负责陪。",
    category: "北京见面兑现",
    token: "火锅",
    tone: "peach"
  },
  {
    id: "pool-cinema",
    title: "北京电影院包场券",
    short: "留给科幻电影的夜晚。",
    detail: "找一部你想看的电影，把手机静音，把手牵好，慢慢看完。",
    category: "北京见面兑现",
    token: "电影",
    tone: "blue"
  },
  {
    id: "pool-night",
    title: "北京夜景散步券",
    short: "把想念走成一段路。",
    detail: "晚一点出门，吹吹风，聊聊天，走一段只属于我们的北京夜晚。",
    category: "北京见面兑现",
    token: "夜景",
    tone: "ice"
  },
  {
    id: "pool-meet-gift",
    title: "六月底见面礼预约权",
    short: "另一半礼物的开关。",
    detail: "网页只是先送到你眼前的一半。剩下那一半，等你来北京我亲手给你。",
    category: "北京见面兑现",
    token: "预约",
    tone: "violet"
  },
  {
    id: "pool-first-surprise",
    title: "来北京后的第一份惊喜",
    short: "先保密，见面揭晓。",
    detail: "有些礼物要看见你的表情才算完整，所以它先藏在这颗星里。",
    category: "北京见面兑现",
    token: "保密",
    tone: "ice"
  },
  {
    id: "pool-console",
    title: "游戏机愿望基金",
    short: "未来快乐计划之一。",
    detail: "不是随口一说，是可以被慢慢规划进生活里的快乐愿望。",
    category: "未来愿望基金",
    token: "游戏机",
    tone: "violet"
  },
  {
    id: "pool-notebook",
    title: "笔记本电脑愿望基金",
    short: "高级愿望先放进星盒。",
    detail: "这颗愿望球会被认真记着，等预算和时机合适，我们一起安排。",
    category: "未来愿望基金",
    token: "电脑",
    tone: "silver"
  },
  {
    id: "pool-sea",
    title: "看海旅行愿望基金",
    short: "以后去一次不赶时间的海边。",
    detail: "不是匆忙赶船，不是当天来回，是慢慢走、慢慢看、慢慢拍照。",
    category: "未来愿望基金",
    token: "看海",
    tone: "mint"
  },
  {
    id: "pool-secret",
    title: "神秘礼物预约权",
    short: "压轴星盒还没完全打开。",
    detail: "这份先不说破，留一点期待，等某个刚好的日子再交给你。",
    category: "未来愿望基金",
    token: "神秘",
    tone: "gold"
  },
  {
    id: "pool-love",
    title: "Long 的爱永久有效",
    short: "不用抽，本来就是你的。",
    detail: "它不是一次性礼物，也不是今天才有。只是生日这天，我把它写得更认真一点。",
    category: "未来愿望基金",
    token: "永久",
    tone: "pink"
  }
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

function getGiftStatus(title: string, description: string): StarBoxGiftInput["status"] {
  const text = `${title} ${description}`;
  if (text.includes("长期") || text.includes("无限")) {
    return "长期有效";
  }
  if (text.includes("北京") || text.includes("六月底") || text.includes("见面")) {
    return "北京见面后兑现";
  }
  if (text.includes("保密") || text.includes("神秘")) {
    return "先保密";
  }
  if (text.includes("今天") || text.includes("红包") || text.includes("奶茶") || text.includes("甜品")) {
    return "今天可兑现";
  }
  return "已收到";
}

function getGiftType(title: string, description: string): StarBoxGiftInput["type"] {
  const text = `${title} ${description}`;
  if (text.includes("愿望") || text.includes("基金") || text.includes("清单") || text.includes("预约")) {
    return "wish";
  }
  if (text.includes("纪念") || text.includes("记忆") || text.includes("那一天")) {
    return "memory";
  }
  if (text.includes("券") || text.includes("权") || text.includes("单")) {
    return "coupon";
  }
  return "gift";
}

function getGiftIcon(title: string): string {
  if (title.includes("红包")) return "红";
  if (title.includes("火锅") || title.includes("蘑菇") || title.includes("饭")) return "汤";
  if (title.includes("奶茶") || title.includes("甜品")) return "甜";
  if (title.includes("抱") || title.includes("哄") || title.includes("陪")) return "抱";
  if (title.includes("电影") || title.includes("观影") || title.includes("影院")) return "影";
  if (title.includes("北京") || title.includes("见面")) return "京";
  if (title.includes("海")) return "海";
  if (title.includes("信") || title.includes("话")) return "信";
  if (title.includes("同心锁")) return "锁";
  if (title.includes("生日") || title.includes("那一天")) return "日";
  return "星";
}

const giftSecretMarks: Record<string, { icon: string; label: string }> = {
  "pool-red-52": { icon: "ribbon", label: "小礼结" },
  "pool-red-66": { icon: "star", label: "好运星" },
  "pool-red-88": { icon: "heart", label: "偏爱心" },
  "pool-milk-tea": { icon: "cup", label: "甜甜杯" },
  "pool-hug": { icon: "heart", label: "抱抱心" },
  "pool-queen": { icon: "crown", label: "小皇冠" },
  "pool-hotpot": { icon: "warm", label: "暖光碗" },
  "pool-cinema": { icon: "ticket", label: "电影票" },
  "pool-night": { icon: "moon", label: "月亮" },
  "pool-meet-gift": { icon: "gift", label: "小礼盒" },
  "pool-first-surprise": { icon: "flower", label: "花朵" },
  "pool-console": { icon: "star-box", label: "星星礼盒" },
  "pool-notebook": { icon: "note", label: "星光卡片" },
  "pool-sea": { icon: "shell", label: "小贝壳" },
  "pool-secret": { icon: "gift", label: "压轴礼盒" },
  "pool-love": { icon: "heart", label: "大桃心" }
};

function getGiftSecretMark(item: GiftPoolItem) {
  return giftSecretMarks[item.id] ?? { icon: "star", label: "小星星" };
}

function toStarBoxGift(
  item: { title: string; description: string },
  planet: string,
  overrides: Partial<StarBoxGiftInput> = {}
): StarBoxGiftInput {
  return {
    id: `${planet}-${item.title}`.replace(/\s+/g, "-"),
    title: item.title,
    fromPlanet: planet,
    type: getGiftType(item.title, item.description),
    status: getGiftStatus(item.title, item.description),
    description: item.description,
    icon: getGiftIcon(item.title),
    ...overrides
  };
}

export function GiftBoxes({ boxes, prizes }: GiftBoxesProps) {
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [result, setResult] = useState<MysteryPrize | null>(null);

  useEffect(() => {
    const stored = getStorage()?.getItem(MYSTERY_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as { box: string; prize: MysteryPrize };
      setSelectedBox(parsed.box);
      setResult(parsed.prize);
    } catch {
      getStorage()?.removeItem(MYSTERY_KEY);
    }
  }, []);

  function openBox(box: string) {
    if (result) {
      return;
    }

    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    setSelectedBox(box);
    setResult(prize);
    getStorage()?.setItem(MYSTERY_KEY, JSON.stringify({ box, prize }));
    void submitLoveEvent({
      eventType: "gift_draw",
      planet: "惊喜仓星",
      title: box,
      value: prize.title,
      message: prize.description
    });
  }

  return (
    <div className="planet-gift-box-zone">
      <div className="mystery-grid planet-mystery-grid">
        {boxes.map((box) => (
          <button
            className={["mystery-box", selectedBox === box && "is-selected", selectedBox === box && !result && "is-opening"]
              .filter(Boolean)
              .join(" ")}
            disabled={Boolean(result)}
            key={box}
            onClick={() => openBox(box)}
            type="button"
          >
            <span className="mystery-box-lid" />
            <span className="mystery-box-body">
              <span>{box}</span>
            </span>
          </button>
        ))}
      </div>
      <article className={["planet-result-note", result && "is-visible"].filter(Boolean).join(" ")}>
        {result ? (
          <>
            <p className="card-meta">{selectedBox} opened</p>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </>
        ) : (
          <>
            <p className="card-meta">waiting</p>
            <h3>礼物还在星盒里</h3>
            <p>选一个顺眼的小星盒，看看今天哪份惊喜亮起来。</p>
          </>
        )}
      </article>
    </div>
  );
}

function getFortuneSymbol(id: string) {
  return fortuneSymbols.find((symbol) => symbol.id === id) ?? fortuneSymbols[0];
}

function getRandomFortuneResult() {
  return fortuneResults[Math.floor(Math.random() * fortuneResults.length)];
}

export function StarFortuneMachine() {
  const { addGift } = useStarBox();
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [pendingResult, setPendingResult] = useState<FortuneResult | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [settledReels, setSettledReels] = useState(0);
  const spinTimers = useRef<number[]>([]);

  useEffect(() => {
    const stored = getStorage()?.getItem(STAR_FORTUNE_KEY);
    if (!stored) {
      return;
    }

    const savedResult = fortuneResults.find((item) => item.id === stored);
    if (savedResult) {
      setResult(savedResult);
      setSettledReels(3);
    } else {
      getStorage()?.removeItem(STAR_FORTUNE_KEY);
    }
  }, []);

  useEffect(
    () => () => {
      spinTimers.current.forEach((timer) => window.clearTimeout(timer));
    },
    []
  );

  function startFortune() {
    if (result || isSpinning) {
      return;
    }

    const nextResult = getRandomFortuneResult();
    setPendingResult(nextResult);
    setIsSpinning(true);
    setSettledReels(0);
    spinTimers.current.forEach((timer) => window.clearTimeout(timer));
    spinTimers.current = [
      window.setTimeout(() => setSettledReels(1), 1080),
      window.setTimeout(() => setSettledReels(2), 1780),
      window.setTimeout(() => {
        setSettledReels(3);
        setResult(nextResult);
        setPendingResult(null);
        setIsSpinning(false);
        getStorage()?.setItem(STAR_FORTUNE_KEY, nextResult.id);
        addGift({
          id: `星运礼物机-${nextResult.id}`,
          title: nextResult.title,
          fromPlanet: "惊喜仓星",
          type: nextResult.category === "未来愿望基金" ? "wish" : "gift",
          status:
            nextResult.redeem === "来北京后兑现"
              ? "北京见面后兑现"
              : nextResult.redeem === "长期有效" || nextResult.redeem === "永久有效"
                ? "长期有效"
                : nextResult.redeem === "未来认真规划"
                  ? "先保密"
                  : "今天可兑现",
          description: nextResult.description,
          icon: getGiftIcon(nextResult.title)
        });
        void submitLoveEvent({
          eventType: "star_fortune_reveal",
          planet: "惊喜仓星",
          title: "星运礼物机",
          value: nextResult.title,
          message: `${nextResult.category}：${nextResult.description}`
        });
      }, 2860)
    ];
  }

  const displayResult = pendingResult ?? result;

  return (
    <section className={["star-fortune-machine", isSpinning && "is-spinning", result && "has-result"].filter(Boolean).join(" ")}>
      <div className="fortune-machine-copy">
        <p className="card-meta">star fortune machine</p>
        <h2>星运礼物机</h2>
        <p>轻轻启动一次，看看今天这颗惊喜仓星想先替 Long 送出哪一份偏爱。</p>
      </div>

      <div className="fortune-machine-shell" aria-live="polite">
        <div className="fortune-machine-glow" aria-hidden="true" />
        <div className="fortune-machine-top">
          <span>暖光盒</span>
          <span>星运盒</span>
          <span>压轴星盒</span>
        </div>

        <div className="fortune-reels" aria-label="星运礼物机滚轮">
          {[0, 1, 2].map((reelIndex) => {
            const settledSymbol = displayResult ? getFortuneSymbol(displayResult.symbols[reelIndex]) : null;
            const isSettled = Boolean(settledSymbol && (!isSpinning || reelIndex < settledReels));

            return (
              <div
                className={[
                  "fortune-reel-window",
                  isSpinning && "is-spinning",
                  isSettled && "is-settled",
                  settledSymbol && `fortune-tone-${settledSymbol.tone}`
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={reelIndex}
                style={{ "--reel-index": String(reelIndex) } as CSSProperties}
              >
                <div className="fortune-reel-track" aria-hidden={isSettled}>
                  {[...fortuneSymbols, ...fortuneSymbols].map((symbol, symbolIndex) => (
                    <span className={`fortune-symbol fortune-symbol-${symbol.tone}`} key={`${symbol.id}-${symbolIndex}`}>
                      {symbol.label}
                    </span>
                  ))}
                </div>
                {settledSymbol ? (
                  <span className={`fortune-symbol fortune-symbol-final fortune-symbol-${settledSymbol.tone}`}>
                    {settledSymbol.label}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        <button className="fortune-lever" disabled={Boolean(result) || isSpinning} onClick={startFortune} type="button">
          <span className="fortune-lever-orb" aria-hidden="true" />
          {result ? "星运已揭晓" : isSpinning ? "星轨正在转动" : "启动星运"}
        </button>

        <div className="fortune-particle-field" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => {
            const sparkStyle = {
              "--spark-index": String(index),
              "--spark-x": `${14 + ((index * 11) % 72)}%`,
              "--spark-y": `${22 + ((index * 17) % 58)}%`
            } as CSSProperties;

            return <span key={index} style={sparkStyle} />;
          })}
        </div>
      </div>

      <article className={["fortune-result-card", result && "is-visible"].filter(Boolean).join(" ")}>
        {result ? (
          <>
            <p className="card-meta">{result.category} · {result.redeem}</p>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </>
        ) : (
          <>
            <p className="card-meta">waiting for starlight</p>
            <h3>礼物还在星轨里慢慢转</h3>
            <p>每次进入页面只正式启动一次。揭晓后，它会被这颗星记住。</p>
          </>
        )}
      </article>
    </section>
  );
}

function GiftFlipCard({
  item,
  isActive,
  onToggle
}: {
  item: GiftPoolItem;
  isActive: boolean;
  onToggle: (id: string) => void;
}) {
  const { addGift } = useStarBox();
  const secretMark = getGiftSecretMark(item);

  return (
    <article className={["gift-flip-card", isActive && "is-flipped", `gift-tone-${item.tone}`].filter(Boolean).join(" ")}>
      <button
        aria-label={isActive ? `${item.title} 已拆开` : `拆开一张${secretMark.label}礼物卡`}
        aria-pressed={isActive}
        className="gift-flip-card-main"
        onClick={() => onToggle(item.id)}
        type="button"
      >
        <span className="gift-flip-card-inner">
          <span className="gift-card-face gift-card-front gift-card-secret-face">
            <span className={`gift-card-secret-icon gift-secret-${secretMark.icon}`} aria-hidden="true" />
            <span className="gift-card-secret-label">有些礼物，应该亲手拆开</span>
            <span className="gift-card-secret-hint">点我拆开</span>
          </span>
          <span className="gift-card-face gift-card-back gift-card-reveal-face">
            <span className="card-meta">这一份偏爱，被你打开了</span>
            <strong>{item.title}</strong>
            <span>{item.short}</span>
            <span>{item.detail}</span>
          </span>
        </span>
      </button>
      <button
        className="star-box-add-button gift-card-star-box-button"
        onClick={() =>
          addGift({
            id: `惊喜仓星-${item.id}`,
            title: item.title,
            fromPlanet: "惊喜仓星",
            type: item.category === "未来愿望基金" ? "wish" : "gift",
            status:
              item.category === "北京见面兑现"
                ? "北京见面后兑现"
                : item.category === "未来愿望基金"
                  ? "先保密"
                  : getGiftStatus(item.title, item.detail),
            description: item.detail,
            icon: getGiftIcon(item.title)
          })
        }
        type="button"
      >
        收进星盒
      </button>
    </article>
  );
}

export function GiftPromiseConstellation() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [selectedWishId, setSelectedWishId] = useState("pool-console");

  const instantItems = giftPoolItems.filter((item) => item.category === "即时惊喜");
  const beijingItems = giftPoolItems.filter((item) => item.category === "北京见面兑现");
  const wishItems = giftPoolItems.filter((item) => item.category === "未来愿望基金");
  const selectedWish = wishItems.find((item) => item.id === selectedWishId) ?? wishItems[0];

  function toggleFlip(id: string) {
    setFlippedCards((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <div className="gift-promise-constellation">
      <section className="planet-soft-zone gift-pool-zone">
        <div className="gift-pool-heading">
          <p className="card-meta">already hidden for today</p>
          <h2>已经藏好的礼物</h2>
          <p>这些是可以先翻开的暖光卡，点一下，背面会露出 Long 写进去的小纸条。</p>
        </div>
        <div className="gift-flip-grid">
          {instantItems.map((item) => (
            <GiftFlipCard item={item} isActive={Boolean(flippedCards[item.id])} key={item.id} onToggle={toggleFlip} />
          ))}
        </div>
      </section>

      <section className="planet-soft-zone gift-pool-zone">
        <div className="gift-pool-heading">
          <p className="card-meta">beijing promise list</p>
          <h2>北京见面后的偏爱清单</h2>
          <p>这些不急着在网页里用完。等你来北京，它们才会变成真正落地的那一半礼物。</p>
        </div>
        <div className="gift-flip-grid gift-flip-grid-wide">
          {beijingItems.map((item) => (
            <GiftFlipCard item={item} isActive={Boolean(flippedCards[item.id])} key={item.id} onToggle={toggleFlip} />
          ))}
        </div>
      </section>

      <section className="planet-soft-zone gift-wish-zone">
        <div className="gift-pool-heading">
          <p className="card-meta">future wish capsules</p>
          <h2>以后想认真兑现的愿望</h2>
          <p>愿望先变成小胶囊球，慢慢攒进以后的日子里。</p>
        </div>
        <div className="wish-capsule-layout">
          <div className="wish-capsule-field" role="list">
            {wishItems.map((item) => (
              <button
                className={["wish-capsule", selectedWishId === item.id && "is-active", `gift-tone-${item.tone}`]
                  .filter(Boolean)
                  .join(" ")}
                key={item.id}
                onClick={() => setSelectedWishId(item.id)}
                type="button"
              >
                <span>{item.token}</span>
              </button>
            ))}
          </div>
          <article className="wish-note">
            <p className="card-meta">{selectedWish.category}</p>
            <h3>{selectedWish.title}</h3>
            <p>{selectedWish.detail}</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export function CouponCluster({ eventType = "coupon_claim", items, planet = "礼物星球" }: CouponClusterProps) {
  const { addGift } = useStarBox();
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = getStorage()?.getItem(COUPON_KEY);
    if (!stored) {
      return;
    }

    try {
      setClaimed(JSON.parse(stored) as Record<string, boolean>);
    } catch {
      getStorage()?.removeItem(COUPON_KEY);
    }
  }, []);

  function claim(item: CouponClusterProps["items"][number]) {
    setClaimed((current) => {
      const next = { ...current, [item.title]: true };
      getStorage()?.setItem(COUPON_KEY, JSON.stringify(next));
      return next;
    });
    void submitLoveEvent({
      eventType,
      planet,
      title: item.title,
      value: item.actionLabel,
      message: item.message
    });
    addGift(toStarBoxGift(item, planet, { description: item.description, type: "coupon" }));
  }

  return (
    <div className="portal-voucher-cluster">
      {items.map((item, index) => (
        <article className={["portal-voucher", claimed[item.title] && "is-claimed"].filter(Boolean).join(" ")} key={item.title}>
          <span className="portal-voucher-orb" aria-hidden="true" style={{ "--order": String(index) } as CSSProperties} />
          <p className="card-meta">{item.meta}</p>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button className="planet-action" onClick={() => claim(item)} type="button">
            {claimed[item.title] ? "已经收进星球" : item.actionLabel}
          </button>
        </article>
      ))}
    </div>
  );
}

export function MessageStarForm() {
  const { addGift } = useStarBox();
  const [message, setMessage] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const stored = getStorage()?.getItem(MESSAGE_KEY) ?? "";
    setMessage(stored);
    setSavedMessage(stored);
  }, []);

  function saveMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    getStorage()?.setItem(MESSAGE_KEY, trimmed);
    setSavedMessage(trimmed);
    void submitLoveEvent({
      eventType: "message_submit",
      planet: "悄悄话星",
      title: "给 Long 留一句话",
      value: trimmed,
      message: trimmed
    });
    addGift({
      id: `悄悄话星-${trimmed.slice(0, 18)}`,
      title: "琳宝留下的一句话",
      fromPlanet: "悄悄话星",
      type: "message",
      status: "已收到",
      description: `“${trimmed}”`,
      icon: "信"
    });
  }

  return (
    <div className="message-planet-world">
      <form className="message-planet-form" onSubmit={saveMessage}>
        <label htmlFor="message-star-input">给 Long 留一句话</label>
        <textarea
          id="message-star-input"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="可以写一句想说的话，或者只写一个抱抱。"
          value={message}
        />
        <button className="planet-action" type="submit">
          把话放进悄悄话星
        </button>
      </form>
      <article className="message-planet-saved">
        <p className="card-meta">saved starlight</p>
        {savedMessage ? <p>{savedMessage}</p> : <p>这里还空着，等琳宝放进一句小小的话。</p>}
      </article>
    </div>
  );
}

export function LoveEventForm({
  buttonLabel,
  eventType,
  helpText,
  label,
  planet,
  placeholder,
  title
}: LoveEventFormProps) {
  const { addGift } = useStarBox();
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState("");

  function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    setSaved(trimmed);
    setValue("");
    void submitLoveEvent({
      eventType,
      planet,
      title,
      value: trimmed,
      message: trimmed
    });
    addGift({
      id: `${planet}-${eventType}-${trimmed.slice(0, 18)}`,
      title,
      fromPlanet: planet,
      type: "wish",
      status: planet.includes("北京") || planet.includes("下一站") ? "北京见面后兑现" : "已收到",
      description: trimmed,
      icon: getGiftIcon(title)
    });
  }

  return (
    <form className="love-event-form" onSubmit={saveEvent}>
      <label htmlFor={`${eventType}-${planet}`}>{label}</label>
      <textarea
        id={`${eventType}-${planet}`}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {helpText ? <p>{helpText}</p> : null}
      <button className="planet-action" type="submit">
        {buttonLabel}
      </button>
      {saved ? <span className="love-event-saved">已经收到：{saved}</span> : null}
    </form>
  );
}

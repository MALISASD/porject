"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

import {
  dailyCoupons,
  giftExperienceCopy,
  homeMemories,
  mysteryBoxes,
  mysteryPrizes
} from "@/data/site";

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

type BurstKind = "petal" | "snow" | "firework" | "star" | "ticket";

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
const BURST_LIFETIME = 1800;

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

  const worldRef = useRef<HTMLDivElement | null>(null);
  const burstIdRef = useRef(0);
  const burstTimersRef = useRef<number[]>([]);

  useEffect(() => {
    setLotteryAmount(readStoredNumber(LOTTERY_KEY));
    setMysteryResult(readStoredMystery());
    setCouponStates(readStoredCouponStates());
    setCouponPackOpen(readStoredPackState());
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

  function openGift() {
    if (introOpening || hasOpened) {
      return;
    }

    setIntroOpening(true);

    // Stage 1: petal burst from the center of the gift box
    spawnBurst("petal", 50, 38);

    // Stage 2: golden stars emerge (around 600ms)
    const starTimer = window.setTimeout(() => {
      spawnBurst("star", 48, 34);
    }, 620);
    burstTimersRef.current.push(starTimer);

    // Stage 3: ticket fragments float out (around 1000ms)
    const ticketTimer = window.setTimeout(() => {
      spawnBurst("ticket", 53, 40);
    }, 1020);
    burstTimersRef.current.push(ticketTimer);

    // Stage 4: second wave of petals (around 1400ms)
    const petalTimer = window.setTimeout(() => {
      spawnBurst("petal", 46, 30);
    }, 1420);
    burstTimersRef.current.push(petalTimer);

    // Stage 5: final sparkle burst (around 1700ms)
    const fireworkTimer = window.setTimeout(() => {
      spawnBurst("firework", 50, 36);
    }, 1720);
    burstTimersRef.current.push(fireworkTimer);

    // Transition to main content after animation completes
    window.setTimeout(() => {
      setHasOpened(true);
      setIntroOpening(false);
      window.requestAnimationFrame(() => {
        worldRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 2800);
  }

  function drawLottery() {
    if (lotteryAmount !== null) {
      return;
    }

    const amount = randomBetween(1, 100);
    getStorage()?.setItem(LOTTERY_KEY, String(amount));
    setLotteryAmount(amount);
    spawnBurst("petal", 50, 52);
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

  return (
    <div className={classNames("gift-experience", hasOpened && "is-entered")}>
      <section className={classNames("gift-intro", hasOpened && "is-open", introOpening && "is-opening")} id="cover">
        <div className="shell gift-intro-layout">
          <div className="intro-decor-layer" aria-hidden="true">
            <span className="intro-decor intro-decor-flower intro-decor-one" />
            <span className="intro-decor intro-decor-petal intro-decor-two" />
            <span className="intro-decor intro-decor-star intro-decor-three" />
            <span className="intro-decor intro-decor-photo intro-decor-four" />
            <span className="intro-decor intro-decor-heart intro-decor-five" />
            <span className="intro-decor intro-decor-ribbon intro-decor-six" />
          </div>

          <div className="gift-intro-copy">
            <h1>{giftExperienceCopy.intro.title}</h1>
            {giftExperienceCopy.intro.description ? (
              <p className="gift-intro-subtitle">{giftExperienceCopy.intro.description}</p>
            ) : null}
          </div>

          <button
            aria-label="打开琳宝的礼物"
            className="intro-gift-button"
            disabled={introOpening || hasOpened}
            onClick={openGift}
            type="button"
          >
            <span className="intro-gift-object" aria-hidden="true">
              <span className="intro-gift-glow" />
              <span className="intro-gift-shadow" />
              <span className="intro-gift-lid">
                <span className="intro-bow intro-bow-left" />
                <span className="intro-bow intro-bow-right" />
                <span className="intro-bow intro-bow-knot" />
              </span>
              <span className="intro-gift-body">
                <span className="intro-gift-ribbon intro-gift-ribbon-vertical" />
                <span className="intro-gift-ribbon intro-gift-ribbon-horizontal" />
              </span>
              <span className="intro-gift-light" />
              <span className="intro-surprise-card intro-surprise-card-one" />
              <span className="intro-surprise-card intro-surprise-card-two" />
              <span className="intro-surprise-ribbon" />
              <span className="intro-flower-seal">
                <span className="intro-flower intro-flower-one" />
                <span className="intro-flower intro-flower-two" />
                <span className="intro-flower intro-flower-three" />
                <span className="intro-seal-core">L</span>
              </span>
              <span className="intro-gift-spark intro-gift-spark-one" />
              <span className="intro-gift-spark intro-gift-spark-two" />
              <span className="intro-gift-spark intro-gift-spark-three" />
            </span>
            <span className="intro-gift-hint">轻点礼盒</span>
          </button>

          <div className={classNames("intro-opening-copy", introOpening && "is-visible")}>
            <span>礼物正在轻轻打开……</span>
            <span>今天先把这一半惊喜，送到你面前。</span>
            <span>剩下的那一半，等六月底你来北京，亲手给你。</span>
          </div>
        </div>
      </section>

      <main
        ref={worldRef}
        className={classNames("gift-world", hasOpened && "is-visible")}
        aria-hidden={!hasOpened}
      >
        <BeijingPromise />

        <MemoryBook
          activeIndex={memoryIndex}
          onNext={goNextMemory}
          onPrev={goPrevMemory}
          onSelect={goToMemory}
          onSnowReveal={revealSnow}
          snowOpen={snowOpen}
        />

        <LotteryCard amount={lotteryAmount} onDraw={drawLottery} ready={hasOpened} />

        <CouponCards
          couponStates={couponStates}
          onClaim={claimCoupon}
          onOpenPack={openPack}
          onToggleFlip={toggleCouponFlip}
          packOpen={couponPackOpen}
        />

        <MysteryGiftBox openingBox={openingBox} onOpenBox={openMysteryBox} result={mysteryResult} />

        <FinalBlessing highlighted={finalHighlighted} onLightUp={lightUpFinal} />
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

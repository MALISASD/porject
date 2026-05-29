"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/site-shell";
import {
  dailyCoupons,
  homeTimeline,
  mysteryBoxes,
  mysteryPrizes,
  siteConfig
} from "@/data/site";

type MysteryResult = {
  box: string;
  title: string;
  description: string;
};

const LOTTERY_KEY = "linbao-giftbox-lottery";
const MYSTERY_KEY = "linbao-giftbox-mystery";

function getGiftStorage() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  return window.localStorage;
}

function readStoredNumber(key: string) {
  const storage = getGiftStorage();
  if (!storage) {
    return null;
  }

  const value = storage.getItem(key);
  return value ? Number(value) : null;
}

function readStoredMystery() {
  const storage = getGiftStorage();
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

export default function HomePage() {
  const [lotteryAmount, setLotteryAmount] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [mysteryResult, setMysteryResult] = useState<MysteryResult | null>(null);
  const [openingBox, setOpeningBox] = useState<string | null>(null);

  useEffect(() => {
    setLotteryAmount(readStoredNumber(LOTTERY_KEY));
    setMysteryResult(readStoredMystery());
    setIsReady(true);
  }, []);

  function drawLottery() {
    if (lotteryAmount !== null) {
      return;
    }

    const amount = Math.floor(Math.random() * 100) + 1;
    getGiftStorage()?.setItem(LOTTERY_KEY, String(amount));
    setLotteryAmount(amount);
  }

  function openMysteryBox(box: string) {
    if (mysteryResult || openingBox) {
      return;
    }

    const prize = mysteryPrizes[Math.floor(Math.random() * mysteryPrizes.length)];
    const result = {
      box,
      title: prize.title,
      description: prize.description
    };

    getGiftStorage()?.setItem(MYSTERY_KEY, JSON.stringify(result));
    setOpeningBox(box);

    window.setTimeout(() => {
      setMysteryResult(result);
      setOpeningBox(null);
    }, 460);
  }

  const selectedBox = mysteryResult?.box ?? openingBox;

  return (
    <div className="home-page giftbox-page">
      <section className="home-screen giftbox-cover" id="cover">
        <div className="shell cover-layout">
          <div className="cover-copy">
            <p className="eyebrow">for my linbao</p>
            <h1>{siteConfig.heroTitle}</h1>
            <p className="cover-subtitle">{siteConfig.heroDescription}</p>
            <div className="button-row">
              <ButtonLink href="/#lottery">打开礼物</ButtonLink>
            </div>
          </div>

          <div className="cover-giftbox" aria-hidden="true">
            <div className="cover-giftbox-lid" />
            <div className="cover-giftbox-body">
              <span className="cover-giftbox-ribbon" />
              <span className="cover-giftbox-card">L</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-screen lottery-screen" id="lottery">
        <div className="shell lottery-layout">
          <div className="home-section-heading">
            <p className="eyebrow">lucky ticket</p>
            <h2>今日幸运彩票</h2>
            <p>抽到多少就是多少，100 元以内 Long 负责兑现。</p>
          </div>

          <article className={`lottery-card${lotteryAmount ? " is-revealed" : ""}`}>
            <div className="lottery-stub">
              <span>gift no. 2025</span>
              <strong>Linbao Only</strong>
            </div>
            <div className="lottery-main">
              <p className="card-meta">today's lucky amount</p>
              <div className="lottery-amount">
                {lotteryAmount ? `¥${lotteryAmount}` : "¥--"}
              </div>
              <p className="lottery-result">
                {lotteryAmount
                  ? `琳宝今日幸运金额：¥${lotteryAmount}`
                  : "轻轻点一下，今天的小好运就会出现。"}
              </p>
              <button
                className="button-link button-primary"
                disabled={!isReady || lotteryAmount !== null}
                onClick={drawLottery}
                type="button"
              >
                {lotteryAmount ? "本次礼物已抽取" : "抽一张彩票"}
              </button>
              <p className="lottery-rule">本次礼物只抽一次，刷新后结果也会保留。</p>
            </div>
          </article>
        </div>
      </section>

      <section className="home-screen coupon-screen" id="coupons">
        <div className="shell">
          <div className="home-section-heading">
            <p className="eyebrow">daily coupons</p>
            <h2>一些随时可以使用的小权利</h2>
          </div>

          <div className="coupon-grid">
            {dailyCoupons.map((coupon) => (
              <article className="daily-coupon" key={coupon.title}>
                <div>
                  <p className="card-meta">{coupon.meta}</p>
                  <h3>{coupon.title}</h3>
                  <p>{coupon.description}</p>
                </div>
                <button
                  className="button-link button-ghost"
                  onClick={() => setCouponMessage(coupon.message)}
                  type="button"
                >
                  {coupon.actionLabel}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-screen mystery-screen" id="mystery">
        <div className="shell">
          <div className="home-section-heading">
            <p className="eyebrow">mystery box</p>
            <h2>请选择一个神秘礼物盒</h2>
            <p>每个盒子里都有一份不同的惊喜。本次礼物只允许开启一次神秘盒。</p>
          </div>

          <div className="mystery-grid">
            {mysteryBoxes.map((box) => (
              <button
                className={`mystery-box${selectedBox === box ? " is-selected" : ""}${
                  openingBox === box ? " is-opening" : ""
                }`}
                disabled={mysteryResult !== null || openingBox !== null}
                key={box}
                onClick={() => openMysteryBox(box)}
                type="button"
              >
                <span className="mystery-box-lid" />
                <span className="mystery-box-body">
                  <span>{box}</span>
                </span>
              </button>
            ))}
          </div>

          <article className={`mystery-result${mysteryResult ? " is-visible" : ""}`}>
            {mysteryResult ? (
              <>
                <p className="card-meta">{mysteryResult.box} opened</p>
                <h3>{mysteryResult.title}</h3>
                <p>{mysteryResult.description}</p>
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

      <section className="home-screen timeline-screen" id="timeline">
        <div className="shell timeline-layout">
          <div className="home-section-heading">
            <p className="eyebrow">our timeline</p>
            <h2>{homeTimeline.title}</h2>
          </div>

          <article className="timeline-keepsake timeline-story">
            <div className="timeline-line">
              {homeTimeline.items.map((item) => (
                <div className="timeline-item" key={item.date}>
                  <span className="timeline-dot" aria-hidden="true" />
                  <div>
                    <p className="timeline-date">{item.date}</p>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="timeline-side">
              <div className="timeline-photo">
                <img
                  alt="北京雪夜去机场路上的出租车暖光回忆"
                  src="/snow-night-taxi-memory.jpg"
                />
              </div>
              <p className="timeline-ending">
                中间隔着一整年的春夏秋冬，
                <br />
                最后你真的成了我的家人。
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="home-screen signature-screen" id="signature">
        <div className="shell signature-layout">
          <article className="signature-note">
            <p>
              这些礼物有的很小，有的以后慢慢兑现。
              <br />
              但有一件事不用抽，也不用等：
              <br />
              我会一直认真爱你。
            </p>
            <div className="signature-mark">
              <strong>Long</strong>
              <span>写给我的老婆琳宝</span>
            </div>
          </article>
        </div>
      </section>

      {couponMessage ? (
        <div
          className="modal-backdrop"
          onClick={() => setCouponMessage(null)}
          role="presentation"
        >
          <div
            aria-modal="true"
            className="coupon-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <p className="eyebrow">coupon accepted</p>
            <p>{couponMessage}</p>
            <button
              className="button-link button-primary"
              onClick={() => setCouponMessage(null)}
              type="button"
            >
              知道啦
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

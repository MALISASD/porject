"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useState } from "react";

import type { DailyCoupon, MysteryPrize } from "@/data/site";
import { submitLoveEvent } from "@/lib/love-events";

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
const COUPON_KEY = "linbao-giftbox-planet-coupons";
const MESSAGE_KEY = "linbao-giftbox-message";

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

export function CouponCluster({ eventType = "coupon_claim", items, planet = "礼物星球" }: CouponClusterProps) {
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

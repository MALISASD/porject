"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

import { submitLoveEvent } from "@/lib/love-events";

export type StarBoxGift = {
  id: string;
  title: string;
  fromPlanet: string;
  type: "coupon" | "gift" | "wish" | "memory" | "message";
  status: "已收到" | "今天可兑现" | "北京见面后兑现" | "长期有效" | "先保密";
  description: string;
  icon?: string;
  receivedAt: string;
};

export type StarBoxGiftInput = Omit<StarBoxGift, "receivedAt"> & {
  receivedAt?: string;
};

type StarBoxContextValue = {
  addGift: (gift: StarBoxGiftInput) => { added: boolean; gift: StarBoxGift };
  gifts: StarBoxGift[];
  lastMessage: string;
  openBox: () => void;
};

type StarBoxProviderProps = {
  children: ReactNode;
};

type AddToStarBoxButtonProps = {
  gift: StarBoxGiftInput;
  className?: string;
  children?: ReactNode;
};

type StarBoxGiftShelfProps = {
  gifts: StarBoxGiftInput[];
  description?: string;
  title: string;
};

const STAR_BOX_KEY = "linbao-star-box";

const StarBoxContext = createContext<StarBoxContextValue | null>(null);

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

function normalizeGift(gift: StarBoxGiftInput): StarBoxGift {
  return {
    ...gift,
    receivedAt: gift.receivedAt ?? new Date().toISOString()
  };
}

function formatGiftTime(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  } catch {
    return "刚刚";
  }
}

function statusIsPending(status: StarBoxGift["status"]) {
  return status === "北京见面后兑现" || status === "先保密";
}

export function useStarBox() {
  const context = useContext(StarBoxContext);
  if (!context) {
    throw new Error("useStarBox must be used inside StarBoxProvider");
  }

  return context;
}

export function StarBoxProvider({ children }: StarBoxProviderProps) {
  const [gifts, setGifts] = useState<StarBoxGift[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const openButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const stored = getStorage()?.getItem(STAR_BOX_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as StarBoxGift[];
      if (Array.isArray(parsed)) {
        setGifts(parsed);
      }
    } catch {
      getStorage()?.removeItem(STAR_BOX_KEY);
    }
  }, []);

  useEffect(() => {
    if (!lastMessage) {
      return;
    }

    const timer = window.setTimeout(() => setLastMessage(""), 2400);
    return () => window.clearTimeout(timer);
  }, [lastMessage]);

  useEffect(() => {
    const button = openButtonRef.current;
    if (!button) {
      return;
    }

    const openStarBox = () => setIsOpen(true);
    button.addEventListener("click", openStarBox);
    return () => button.removeEventListener("click", openStarBox);
  }, []);

  function addGift(giftInput: StarBoxGiftInput) {
    const gift = normalizeGift(giftInput);
    let wasAdded = false;

    setGifts((current) => {
      const existing = current.find((item) => item.id === gift.id);
      if (existing) {
        setLastMessage("这份礼物已经在星盒里啦");
        return current;
      }

      wasAdded = true;
      const next = [gift, ...current];
      getStorage()?.setItem(STAR_BOX_KEY, JSON.stringify(next));
      setLastMessage("已放入琳宝的星盒");
      setIsGlowing(true);
      window.setTimeout(() => setIsGlowing(false), 980);
      void submitLoveEvent({
        eventType: "star_box_add",
        planet: gift.fromPlanet,
        title: gift.title,
        value: gift.status,
        message: gift.description
      });
      return next;
    });

    return { added: wasAdded, gift };
  }

  const receivedGifts = useMemo(() => gifts.filter((gift) => !statusIsPending(gift.status)), [gifts]);
  const pendingGifts = useMemo(() => gifts.filter((gift) => statusIsPending(gift.status)), [gifts]);

  const value = useMemo<StarBoxContextValue>(
    () => ({
      addGift,
      gifts,
      lastMessage,
      openBox: () => setIsOpen(true)
    }),
    [gifts, lastMessage]
  );

  return (
    <StarBoxContext.Provider value={value}>
      {children}
      <button
        ref={openButtonRef}
        className={["star-box-floating-button", isGlowing && "is-glowing"].filter(Boolean).join(" ")}
        onClick={() => setIsOpen(true)}
        type="button"
        aria-label={`打开琳宝的星盒，已有 ${gifts.length} 份礼物`}
      >
        <span className="star-box-button-icon" aria-hidden="true" />
        <span className="star-box-count" aria-hidden="true">
          {gifts.length}
        </span>
      </button>

      {lastMessage ? <div className="star-box-toast">{lastMessage}</div> : null}

      {isOpen ? (
        <div className="star-box-backdrop" role="presentation" onClick={() => setIsOpen(false)}>
          <aside
            aria-label="琳宝的星盒"
            className="star-box-drawer"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="star-box-close" aria-label="关闭星盒" onClick={() => setIsOpen(false)} type="button">
              ×
            </button>
            <header className="star-box-header">
              <p className="card-meta">linbao star box</p>
              <h2>琳宝的星盒</h2>
              <p>这里收着 Long 已经送给你的礼物和以后要兑现的承诺。</p>
            </header>

            {gifts.length ? (
              <div className="star-box-content">
                <StarBoxList title="已收到的礼物" gifts={receivedGifts} />
                <StarBoxList title="待兑现的承诺" gifts={pendingGifts} />
              </div>
            ) : (
              <div className="star-box-empty">
                <span className="star-box-empty-icon" aria-hidden="true" />
                <p>星盒还空着。去点亮一颗小星球，看看 Long 给你藏了什么。</p>
              </div>
            )}
          </aside>
        </div>
      ) : null}
    </StarBoxContext.Provider>
  );
}

function StarBoxList({ gifts, title }: { gifts: StarBoxGift[]; title: string }) {
  if (!gifts.length) {
    return null;
  }

  return (
    <section className="star-box-list">
      <h3>{title}</h3>
      <div className="star-box-card-grid">
        {gifts.map((gift) => (
          <article className="star-box-card" key={gift.id}>
            <span className="star-box-card-icon">{gift.icon ?? "星"}</span>
            <div>
              <p className="card-meta">{gift.fromPlanet}</p>
              <h4>{gift.title}</h4>
              <span className="star-box-status">{gift.status}</span>
              <p>{gift.description}</p>
              <small>{formatGiftTime(gift.receivedAt)} 收进星盒</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AddToStarBoxButton({ children = "收进星盒", className = "", gift }: AddToStarBoxButtonProps) {
  const { addGift } = useStarBox();

  return (
    <button
      className={["star-box-add-button", className].filter(Boolean).join(" ")}
      onClick={() => addGift(gift)}
      type="button"
    >
      {children}
    </button>
  );
}

export function StarBoxGiftShelf({ description, gifts, title }: StarBoxGiftShelfProps) {
  const { addGift } = useStarBox();

  return (
    <section className="planet-soft-zone star-box-gift-shelf">
      <div className="star-box-shelf-heading">
        <p className="card-meta">star box collection</p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className="star-box-shelf-grid">
        {gifts.map((gift) => (
          <article className="star-box-shelf-card" key={gift.id}>
            <span className="star-box-card-icon">{gift.icon ?? "星"}</span>
            <p className="card-meta">{gift.fromPlanet}</p>
            <h3>{gift.title}</h3>
            <span className="star-box-status">{gift.status}</span>
            <p>{gift.description}</p>
            <button className="star-box-add-button" onClick={() => addGift(gift)} type="button">
              收下这份礼物
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

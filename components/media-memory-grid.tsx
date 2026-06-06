"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

import type { MemoryMedia } from "@/data/site";

type MediaMemoryGridProps = {
  items: MemoryMedia[];
};

export function MediaMemoryGrid({ items }: MediaMemoryGridProps) {
  const [activeItem, setActiveItem] = useState<MemoryMedia | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <>
      <div className="media-memory-grid">
        {items.map((item, index) => (
          <article
            className={`media-card media-card-${item.type}`}
            key={item.id}
            style={{ "--media-tilt": `${index % 2 === 0 ? -1.4 : 1.6}deg` } as CSSProperties}
          >
            <button
              className="media-card-preview"
              onClick={() => {
                setActiveItem(item);
                if (item.type === "video") {
                  setPlayingVideo(item.id);
                }
              }}
              type="button"
            >
              {item.type === "video" && playingVideo === item.id ? (
                <video controls poster={item.poster} preload="metadata" src={item.src}>
                  <track kind="captions" />
                </video>
              ) : (
                <span className="media-placeholder" aria-hidden="true">
                  <span>{item.type === "video" ? "Video" : "Photo"}</span>
                </span>
              )}
            </button>
            <p className="card-meta">
              {item.category} · {item.date}
            </p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div className="media-lightbox" role="presentation" onClick={() => setActiveItem(null)}>
          <article className="media-lightbox-card" onClick={(event) => event.stopPropagation()}>
            <button aria-label="关闭预览" onClick={() => setActiveItem(null)} type="button">
              ×
            </button>
            <p className="card-meta">{activeItem.category}</p>
            <h3>{activeItem.title}</h3>
            {activeItem.type === "video" ? (
              <video controls poster={activeItem.poster} preload="metadata" src={activeItem.src}>
                <track kind="captions" />
              </video>
            ) : (
              <div className="media-lightbox-placeholder">
                <span>等照片放进来</span>
              </div>
            )}
            <p>{activeItem.description}</p>
          </article>
        </div>
      ) : null}
    </>
  );
}

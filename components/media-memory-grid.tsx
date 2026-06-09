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
  const [failedMedia, setFailedMedia] = useState<Record<string, boolean>>({});

  function markMediaFailed(id: string) {
    setFailedMedia((current) => ({ ...current, [id]: true }));
  }

  function renderMediaPlaceholder(label: string) {
    return (
      <span className="media-placeholder" aria-hidden="true">
        <span>{label}</span>
      </span>
    );
  }

  return (
    <>
      <div className="media-memory-grid">
        {items.map((item, index) => {
          const hasFailed = failedMedia[item.id];

          return (
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
                {item.type === "image" && !hasFailed ? (
                  <img alt={item.title} loading="lazy" onError={() => markMediaFailed(item.id)} src={item.src} />
                ) : item.type === "video" && playingVideo === item.id ? (
                  <video controls onError={() => markMediaFailed(item.id)} poster={item.poster} preload="metadata" src={item.src}>
                    <track kind="captions" />
                  </video>
                ) : (
                  renderMediaPlaceholder(item.type === "video" ? "Video" : "Photo")
                )}
              </button>
              <p className="card-meta">
                {item.category} · {item.date}
              </p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          );
        })}
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
              <video
                controls
                onError={() => markMediaFailed(activeItem.id)}
                poster={activeItem.poster}
                preload="metadata"
                src={activeItem.src}
              >
                <track kind="captions" />
              </video>
            ) : failedMedia[activeItem.id] ? (
              <div className="media-lightbox-placeholder">
                <span>等照片放进来</span>
              </div>
            ) : (
              <img
                alt={activeItem.title}
                className="media-lightbox-image"
                onError={() => markMediaFailed(activeItem.id)}
                src={activeItem.src}
              />
            )}
            <p>{activeItem.description}</p>
          </article>
        </div>
      ) : null}
    </>
  );
}

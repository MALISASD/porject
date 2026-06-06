"use client";

import { useState } from "react";

import type { StoryOrbitNode } from "@/data/site";

type StoryOrbitTimelineProps = {
  items: StoryOrbitNode[];
};

export function StoryOrbitTimeline({ items }: StoryOrbitTimelineProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <div className="story-orbit-timeline">
      <div className="story-orbit-rail" aria-hidden="true" />
      {items.map((item, index) => {
        const isActive = item.id === activeId;

        return (
          <article className={`story-orbit-node story-orbit-${item.tone} ${isActive ? "is-active" : ""}`} key={item.id}>
            <button className="story-orbit-summary" onClick={() => setActiveId(isActive ? "" : item.id)} type="button">
              <span className="story-orbit-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="story-orbit-copy">
                <span className="card-meta">{item.time}</span>
                <strong>{item.title}</strong>
                <span>{item.summary}</span>
              </span>
              <span className="story-orbit-toggle">{isActive ? "收起" : "展开"}</span>
            </button>
            <div className="story-orbit-detail" aria-hidden={!isActive}>
              <p>{item.detail}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

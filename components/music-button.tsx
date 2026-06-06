"use client";

import { useRef, useState } from "react";

type MusicButtonProps = {
  className?: string;
};

export function MusicButton({ className }: MusicButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  async function toggleMusic() {
    setUnavailable(false);

    if (!audioRef.current) {
      const audio = new Audio("/music/theme.mp3");
      audio.loop = true;
      audio.volume = 0.28;
      audio.addEventListener("error", () => {
        setUnavailable(true);
        setPlaying(false);
      });
      audioRef.current = audio;
    }

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
        return;
      }

      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setUnavailable(true);
      setPlaying(false);
    }
  }

  return (
    <button
      aria-label={playing ? "暂停音乐" : "播放音乐"}
      className={["music-orb-button", playing && "is-playing", unavailable && "is-unavailable", className]
        .filter(Boolean)
        .join(" ")}
      onClick={toggleMusic}
      title={unavailable ? "音乐文件还没放进星球" : playing ? "暂停音乐" : "播放音乐"}
      type="button"
    >
      <span aria-hidden="true">♪</span>
      <span className="music-orb-status">{unavailable ? "未放入" : playing ? "播放中" : "音乐"}</span>
    </button>
  );
}

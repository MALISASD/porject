# Media Guide

This project is prepared for future photos, short videos, and music without adding large assets now.

## Suggested Folders

- Images: `public/images/`
- Videos: `public/videos/`
- Music: `public/music/`

## Naming

Use lowercase English names plus dates where useful:

- `beijing-snow-2024-02.jpg`
- `hangzhou-2024-11.jpg`
- `shantang-letter-2025-06-21.jpg`
- `beijing-snow-2024-02.mp4`

## Images

Compress images before adding them. Prefer `.jpg` for photos and `.webp` when you want smaller files.

## Videos

Prefer `.mp4`. Keep videos short and compressed. Large videos are not recommended directly in the project; use an external video host if the file is big.

## Music

The music button looks for:

```text
public/music/theme.mp3
```

Music does not autoplay. The user must click the music button. If the file is missing, the page will not crash.

## Data

Media placeholders live in `data/site.ts` under `memoriesMedia`. Replace `src` and `poster` values when real assets are ready.

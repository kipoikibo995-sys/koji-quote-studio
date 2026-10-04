# Quote Video Studio

A self-contained, browser-based quote video generator. It renders real MP4/WebM videos locally in the user's browser — no AI service, no external rendering API, no server-side processing.

## Features

- Multi-page quote videos (add several quotes, one per page)
- Formats: 9:16 (Shorts / Reels / TikTok), 16:9, 1:1
- Text animations, page transitions and background presets
- Live preview before rendering
- Renders at full HD (1080 × 1920, 1920 × 1080 or 1080 × 1080) and downloads directly

## Files

- `index.html` — the complete application (interface, styles, preview, editor and local video renderer).

No build step, Node.js server or database is required.

## Installation

1. Upload `index.html` to any web host, e.g. into a folder such as `public_html/quote-studio/`.
2. Open `https://your-domain.com/quote-studio/` in Chrome or Edge.
3. Render one short test video.

It can also be opened directly from your computer by double-clicking `index.html`.

## Requirements

- Chrome or Edge is recommended (best support for local MP4 rendering; other browsers may produce WebM).
- Use HTTPS when hosting online.
- Keep the tab open until rendering finishes. Rendering uses the user's CPU and memory, so longer multi-page videos take longer.

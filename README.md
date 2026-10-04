# Quote Video Studio

Turn lines from your book into scroll-stopping YouTube Shorts that send viewers to your Amazon listing.

Built for KDP authors: paste a quote from your book, add your cover, and render a ready-to-upload vertical video that ends with a "get the book" call to action. Everything renders locally in the browser: no AI service, no external rendering API, no server-side processing, and no subscription.

## Features

- Multi-page quote videos (up to 10 quotes from your book, one per page)
- Book promo end card: your cover, book title, call to action (e.g. "Get the book on Amazon") and a small line (e.g. "Link in description ↓")
- Channel handle shown on every frame (e.g. `@yourchannel`)
- Formats: 9:16 (Shorts / Reels / TikTok), 16:9, 1:1
- Text animations, page transitions and background presets
- Live preview before rendering
- Renders at full HD (1080 × 1920, 1920 × 1080 or 1080 × 1080) and downloads directly

## Suggested YouTube workflow

1. Pick a strong line from your book and paste it as a page quote (add 2–4 pages for a longer Short).
2. Upload your book cover and set your call to action.
3. Render in 9:16 and upload as a YouTube Short.
4. Put your Amazon book link in the video description and in a pinned comment.

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

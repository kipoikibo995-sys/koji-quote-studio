# Quote Video Studio

Turn lines from your book into scroll-stopping YouTube Shorts that send viewers to your Amazon listing.

Built for KDP authors: paste a quote from your book, add your cover, and render a ready-to-upload vertical video that ends with a "get the book" call to action. Everything renders locally in the browser: no AI service, no external rendering API, no server-side processing, and no subscription.

## Features

- Multi-page quote videos (up to 10 quotes from your book, one per page)
- Book promo end card: your cover, book title, call to action (e.g. "Get the book on Amazon") and a small line (e.g. "Link in description ↓")
- Channel handle shown on every frame (e.g. `@yourchannel`)
- Keyword highlights: wrap words in `*asterisks*` to colour and underline them
- Background photo: upload any image; it fills the frame, drifts slowly and sits under an adjustable darkening wash so the text stays readable
- Per-page photos: give each quote page its own photo (pages without one use the background photo); photos cross-fade between pages
- Book badge: your cover, title and button text in a corner of every quote page, so viewers see the book from the first second
- Voiceover: each quote (and optionally the end card) is read aloud by Kokoro TTS running in the browser; pages stretch to fit the voice and words appear in time with it. 11 US/UK voices and a speed control

## Voiceover notes

- The voice engine is [kokoro-js](https://www.npmjs.com/package/kokoro-js) 1.2.1, loaded from jsDelivr, with the Kokoro-82M model (`onnx-community/Kokoro-82M-v1.0-ONNX`, q8, about 90 MB) loaded from Hugging Face. Both are Apache-2.0 licensed.
- The model downloads the first time someone uses Voiceover and is then cached by their browser. Text never leaves the device.
- Voice generation runs in a web worker; it is fast on desktop computers and slower on older phones.
- Image export: download the current page or end card as a full-resolution PNG (thumbnails, Pinterest, Instagram, community posts)
- Animated backgrounds (drifting light, bokeh, film texture) and a slow push-in so every frame has motion
- Quote text auto-sizes to fit the frame, and the live preview uses the same renderer as the exported video
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

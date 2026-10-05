# Quote Video Studio

Turn lines from your book into scroll-stopping YouTube Shorts that send viewers to your Amazon listing.

Built for KDP authors: paste a quote from your book, add your cover, and render a ready-to-upload vertical video that ends with a "get the book" call to action. Video renders locally in the browser: no external rendering API, no server-side processing and no subscription. The optional voiceover runs on the device (Kokoro) or uses ElevenLabs with the user's own API key.

## Features

- Multi-page quote videos (up to 10 quotes, one per page): page cards with a text preview, drag (or Alt + ↑/↓) to reorder, duplicate, and delete with undo
- Paste many: paste a list of quotes (one per line, or separated by empty lines for poems) and each becomes a page; list numbers and bullets are removed
- Opening hook: an optional 1.5-second first line before page 1 (e.g. "Lines from *Your Book*", "If you're tired, read this."), with one-click presets; with Voiceover on it can be read aloud (the hook then lasts as long as its voice, and with ElevenLabs it opens the same continuous take)
- One book & author line for the whole video, with an optional per-page override (leave it empty to hide the credit)
- Reading-time check: each page shows whether viewers can read it in the time it is on screen
- Quote fonts: 11 Google Fonts for the quote text (Playfair, Cormorant, Lora, Baskerville, DM Serif, Montserrat, Poppins, Bebas Neue, Dancing Script, Caveat, Typewriter), each with its own size, spacing and line height so quotes still fit the frame
- Quote library with seven collections and 407 entries, with search, topic filters and "Surprise me"; multi-line poems can be split into one page per two lines
  - Everyday (184): quotes and poems across 14 topics (love, heartbreak & healing, self-love, life, meaning & purpose, motivation, courage, hope, peace & mindfulness, gratitude, friendship & family, time & change, growth, books & reading)
  - Old tongues (30): multi-page dark fantasy pieces in the "In English, we say … But in <the tongue of dragons / the old tongue of the knights / the court of the night …>, we say …" format, each four pages long; use one as the whole video or insert its pages
  - Vows (22): multi-page oaths sworn by knights, witches, vampires, dragons, gods and lovers ("I swear it on the broken sword…")
  - Unsent letters (20): multi-page letters to a younger self, the one who left, a mother, a father, someone lost, a future self, a lover and the reader ("Dear seventeen, …")
  - She asked me (18): multi-page conversations, from love and healing to dark fantasy ("She asked me why… I said…")
  - Three lines (30): short three-line verses about night, love, heartbreak, healing, courage, time, dark fantasy and books
  - Dark fantasy (103): short poems across 15 topics (night & shadows, curses & hexes, witches & spells, vampires & blood, ghosts & hauntings, death & the reaper, fallen kingdoms, dragons & ancient beasts, forsaken gods, cursed forests, wolves & the moon, dark romance, villains & vengeance, prophecy & fate, the abyss & the sea)
- Line breaks typed in a quote are kept in the video; each line is balanced on its own, and the text shrinks before it breaks a typed line
- Book promo end card: your cover, book title, call to action (e.g. "Get the book on Amazon") and a small line (e.g. "Link in description ↓")
- Channel handle shown on every frame (e.g. `@yourchannel`)
- Keyword highlights: select words and click Highlight (or Ctrl/Cmd + B) to colour and underline them in the video; this wraps them in `*asterisks*`
- Background photo: upload one image for the whole video; it fills the frame, drifts slowly and sits under an adjustable darkening wash so the text stays readable
- Book badge: your cover, title and button text in a corner of every quote page, so viewers see the book from the first second
- Voiceover: each quote (and optionally the end card) is read aloud by Kokoro TTS running in the browser; pages stretch to fit the voice and words appear in time with it. 11 US/UK voices and a speed control, or premium ElevenLabs voices with your own API key
- Image export: download the current page or end card as a full-resolution PNG (thumbnails, Pinterest, Instagram, community posts)
- 22 backgrounds in a compact picker (Dark / Light / Bold tabs, small thumbnails, the chosen name shown next to the label): Dark (Midnight, Blood Moon with a red moon, Night Violet, Mist, Forest, Royal, Ocean Deep, Rose Noir, Galaxy, Charcoal, Emerald), Light (Warm Paper, Pure White, Blush, Sage, Sky, Sand, Lavender) and Bold (Orange Glow, Sunset, Teal Pop, Berry)
- Accent colour: keep the background's own, pick from 8 swatches or any colour, or take one from the book cover (kept readable on the background)
- Atmosphere overlays: embers, rain, snow, mist or stars moving over the background (identical in preview and render)
- Animated backgrounds (drifting light, bokeh, film texture) and a slow push-in so every frame has motion
- Quote text auto-sizes to fit the frame, and the live preview uses the same renderer as the exported video
- Format: 9:16 vertical (Shorts / Reels / TikTok)
- Text animations, page transitions and background presets
- Live preview before rendering
- Renders at full HD (1080 × 1920) and downloads directly

## Quote library licensing

- **Originals** (141 everyday quotes, 90 dark fantasy poems, 30 Old tongues pieces, 22 Vows, 20 Unsent letters, 18 She asked me and 30 Three lines) are written for Quote Video Studio and may be used freely in videos, including commercially.
- **Classics** (29) and **poems** (27) come from public-domain works published before 1929 (Shakespeare, Thoreau, Emerson, Austen, the Brontës, Dickens, Gibran, Tagore, Dickinson, Frost, Blake, Yeats, Poe, Shelley, Keats, Byron, Coleridge, Milton and others). Translated works use public-domain translations, which are named in the credit line.
- The library is stored inside `index.html` (a JSON block with the id `quoteLibraryData`) and is easy to extend.

## Voiceover notes

- The voice engine is [kokoro-js](https://www.npmjs.com/package/kokoro-js) 1.2.1, loaded from jsDelivr, with the Kokoro-82M model (`onnx-community/Kokoro-82M-v1.0-ONNX`, q8, about 90 MB) loaded from Hugging Face. Both are Apache-2.0 licensed.
- The Kokoro model downloads the first time someone uses Voiceover and is then cached by their browser. With Kokoro, text never leaves the device.
- Voice generation runs in a web worker; it is fast on desktop computers and slower on older phones.
- **ElevenLabs (premium, bring your own key):** in the Voice tab choose ElevenLabs, paste an API key (elevenlabs.io → Developers → API keys) and click Connect. The app lists the voices on that account, shows remaining characters, and calls the ElevenLabs API directly from the browser. The key is stored only in that browser (localStorage) and is sent only to `api.elevenlabs.io`; quote text is sent to ElevenLabs and characters count against the user's ElevenLabs plan. ElevenLabs returns per-character timings, so words appear exactly when they are spoken.
- ElevenLabs reads the whole video (all pages, then the end card line) in **one continuous take**; pages turn when the voice reaches them.
- **Eleven v3 audio tags:** with the Eleven v3 model, write tags such as `[whispers]`, `[sighs]`, `[sad]` or `[mischievously]` in a quote (or insert them with the Voice tags chips under the quote). Tags are sent to the voice only and never shown in the video; with other models and Kokoro they are removed before speaking.
- **Pause between pages** (0–2.5 s): silence is inserted at the natural gap between pages in the take, so changing it needs no new ElevenLabs request. With Kokoro it lengthens the breath after each page.
- **Expressiveness** sets ElevenLabs stability (higher = more expressive; v3 uses its creative / natural / robust steps).

## Suggested YouTube workflow

1. Pick a strong line from your book and paste it as a page quote (add 2–4 pages for a longer Short).
2. Upload your book cover and set your call to action.
3. Render the video and upload it as a YouTube Short.
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

## Changelog

The current version is shown at the bottom of the left rail.

- **0.9.10 (2026-10-05):** Fixed videos that froze on the first frame on some computers: the render canvas is no longer display:none, every frame is pushed to the recorder explicitly, and a worker clock keeps rendering when the window is covered.
- **0.9.9 (2026-10-05):** The rendered file is no longer a fraction of a second short (a 10 s video showed 0:09); the last frame is held briefly.
- **0.9.8 (2026-10-05):** Four new library collections: Vows, Unsent letters, She asked me and Three lines (90 original pieces, 407 in total).
- **0.9.7 (2026-10-05):** Format picker removed; every video is 9:16 (1080 × 1920).
- **0.9.6 (2026-10-05):** Compact background picker with Dark / Light / Bold tabs.
- **0.9.5 (2026-10-05):** 14 new backgrounds (22 in total), grouped as Dark, Light and Bold in a compact 4-column grid.
- **0.9.4 (2026-10-05):** Per-page photos removed; one background photo is used for the whole video.
- **0.9.3 (2026-10-05):** Five new backgrounds, accent colour picker (including a colour from the book cover), atmosphere overlays, and Seconds per page moved to the Quotes tab.
- **0.9.2 (2026-10-05):** The opening hook can be read aloud with Kokoro or ElevenLabs.
- **0.9.1 (2026-10-05):** Paste many quotes at once (one page per quote) and an optional opening hook before page 1.
- **0.9.0 (2026-10-05):** the page photo moved from the Quotes tab to the Style tab ("Photo for page N").
  - Word cascade, line rise and typewriter speed up for long quotes, so the full text and the credit always appear.
  - Wrapping quote marks of any kind are removed.
  - Short quotes are set larger.
  - The character counter turns amber over 150 and red over 220.
  - New pages start empty, and rendering stops while a page is empty.
  - Readability, layout and colour passes: larger UI text, monospace fallbacks, quote editor first, big preview buttons, theme thumbnails, finer scanlines.

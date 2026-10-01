# KoJi Quote Studio — MVP source

KoJi Quote Studio is a self-contained, browser-based quote video generator for KoJi Academy. It renders real MP4/WebM video locally in the visitor's browser and does not call an AI service or external rendering API.

## Source structure

- `index.html` — complete application: interface, styles, preview, page editor and local video renderer.
- `README.md` — deployment and usage notes.

No build command, Node.js server or database is required.

## Recommended deployment for kojilaunch.com

This method preserves the existing KoJi-style header and keeps the app isolated from WordPress/Elementor CSS.

1. Open the hosting control panel for `kojilaunch.com` (for example cPanel or your host's File Manager).
2. Open the website root, normally `public_html`.
3. Create a folder named `quote-studio`.
4. Upload `index.html` into that folder.
5. Open `https://kojilaunch.com/quote-studio/` and test one short render in Chrome or Edge.
6. In WordPress/Elementor, add a menu item or button linking to `/quote-studio/`.

If WordPress itself is installed in a subfolder, create `quote-studio` inside the folder that currently contains the site's public `index.php`.

## Uploading the ZIP

1. Upload `koji-quote-studio-source.zip` to `public_html`.
2. Extract it there.
3. If extraction creates a folder named `quote-studio`, the final file should be:
   `public_html/quote-studio/index.html`
4. Delete the uploaded ZIP from the server after extraction.

## Connecting it to Elementor

Recommended: use an Elementor Button widget.

- Button text: `Create a Quote Video`
- Link: `/quote-studio/`
- Open in new window: optional

You can also add the same URL through **WordPress → Appearance → Menus** (or the current Navigation editor).

Avoid pasting the complete `index.html` into an Elementor HTML widget. WordPress pages already provide their own `<html>`, `<head>` and scripts, and theme CSS can interfere with the app. Hosting it in its own folder is simpler and more reliable.

## Browser and hosting requirements

- Use HTTPS on the live site.
- Chrome or Edge is recommended for local MP4 rendering.
- The visitor should keep the tab open until rendering finishes.
- Rendering uses the visitor's CPU and memory; longer multi-page videos take longer.
- If MP4 encoding is unavailable in a browser, the app automatically attempts WebM.

## Current MVP limits

- Maximum 10 pages.
- 4, 6 or 8 seconds per page.
- Formats: 9:16, 16:9 and 1:1.
- Text animations: Word Cascade, Line Rise, Typewriter and Soft Fade.
- Transitions: Slide Left, Slide Up, Fade Out and Zoom Out.
- Backgrounds: KoJi Dark, Warm Paper and Orange Glow.
- No login, cloud storage, server render or user project history yet.

## Updating the app later

Keep a backup of the current `index.html`, then replace it with the newer version. The public URL can remain unchanged.


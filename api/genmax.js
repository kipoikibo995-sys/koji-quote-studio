// Vercel serverless function: forwards Quote Studio voice requests to GenMax with the
// site owner's key (env GENMAX_API_KEY), so the key never reaches the browser.
// Only the few calls the app needs are allowed, text length is capped, and each visitor
// has an hourly limit. ALLOWED_ORIGINS (comma-separated, optional) adds extra sites.
const GM_API = 'https://api.genmax.io';
const MAX_TEXT = 1500;              // characters per voice part
const HOURLY_PARTS = Number(process.env.GENMAX_HOURLY_LIMIT || 150); // voice parts per visitor per hour
const PROVIDERS = new Set(['elevenlabs', 'minimax']);
const MODELS = new Set(['eleven_multilingual_v2', 'eleven_flash_v2_5', 'speech-2.8-hd', 'speech-2.8-turbo']);
const hits = new Map();             // per warm instance; a light brake, not a hard quota

function send(res, status, body) {
  res.status(status).setHeader('Cache-Control', 'no-store');
  res.json(body);
}

function allowedOrigin(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host || '';
  const extra = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const from = req.headers.origin || req.headers.referer || '';
  if (!from) return false;
  try {
    const u = new URL(from);
    return u.host === host || extra.some(o => { try { return new URL(o).host === u.host } catch (e) { return o === u.host } });
  } catch (e) { return false }
}

function overLimit(req) {
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now(), list = (hits.get(ip) || []).filter(t => now - t < 3600e3);
  if (list.length >= HOURLY_PARTS) { hits.set(ip, list); return true }
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return false;
}

async function gm(path, key, options = {}) {
  return fetch(GM_API + path, { ...options, headers: { 'xi-api-key': key, ...(options.body ? { 'Content-Type': 'application/json' } : {}) } });
}

async function relay(res, upstream) {
  const text = await upstream.text();
  res.status(upstream.status).setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
  res.send(text);
}

module.exports = async (req, res) => {
  const key = process.env.GENMAX_API_KEY;
  if (!key) return send(res, 503, { code: 'no_key', error: 'GenMax voices are not set up on this site yet.' });
  if (!allowedOrigin(req)) return send(res, 403, { error: 'This voice service only works inside Quote Studio.' });
  const q = req.query || {};
  try {
    // The finished mp3: looked up from the task id on the server, so no outside URL is fetched.
    if (q.audio) {
      if (!/^[\w-]{1,80}$/.test(q.audio)) return send(res, 400, { error: 'Bad task id.' });
      const info = await (await gm(`/v1/history/${q.audio}`, key)).json();
      const url = info && info.result && info.result.audio_url;
      if (!url) return send(res, 404, { error: 'The voice file is not ready yet.' });
      let audio = await fetch(url);
      if (audio.status === 401 || audio.status === 403) audio = await fetch(url, { headers: { 'xi-api-key': key } });
      if (!audio.ok) return send(res, 502, { error: `The voice file could not be downloaded (${audio.status}).` });
      res.status(200).setHeader('Content-Type', audio.headers.get('content-type') || 'audio/mpeg');
      res.setHeader('Cache-Control', 'private, max-age=3600');
      return res.send(Buffer.from(await audio.arrayBuffer()));
    }
    const path = String(q.path || '');
    if (req.method === 'GET') {
      if (/^\/v1\/default-voices\?page_size=\d{1,3}$/.test(path) ||
          /^\/v1\/minimax\/system-voices\?language=English&page_size=\d{1,3}$/.test(path) ||
          /^\/v1\/history\/[\w-]{1,80}$/.test(path)) return relay(res, await gm(path, key));
      return send(res, 404, { error: 'Not available.' });
    }
    if (req.method === 'POST') {
      const m = path.match(/^\/v1\/text-to-speech\/([\w-]{1,80})$/);
      const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      if (!m || typeof b.text !== 'string' || !b.text.trim()) return send(res, 400, { error: 'Bad voice request.' });
      if (b.text.length > MAX_TEXT) return send(res, 400, { error: `Each page can have at most ${MAX_TEXT} characters for the voice.` });
      if (!PROVIDERS.has(b.provider) || !MODELS.has(b.model_id)) return send(res, 400, { error: 'This voice model is not available.' });
      if (overLimit(req)) return send(res, 429, { error: 'You have made a lot of voices in the last hour. Please wait a little, or use Kokoro meanwhile.' });
      const body = { text: b.text, provider: b.provider, model_id: b.model_id, language_code: b.language_code, voice_settings: b.voice_settings };
      return relay(res, await gm(path, key, { method: 'POST', body: JSON.stringify(body) }));
    }
    return send(res, 405, { error: 'Method not allowed.' });
  } catch (e) {
    return send(res, 502, { error: 'The voice service could not reach GenMax. Please try again.' });
  }
};

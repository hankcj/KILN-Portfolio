/**
 * Ghost → Listmonk webhook bridge
 * POST /webhook/post-published: verify Ghost signature, create Listmonk campaign
 * Listens on 127.0.0.1:PORT (proxy via Nginx).
 */

require('dotenv').config();
const crypto = require('crypto');
const express = require('express');

const PORT = parseInt(process.env.PORT || '3001', 10);
const GHOST_WEBHOOK_SECRET = process.env.GHOST_WEBHOOK_SECRET;
const LISTMONK_URL = (process.env.LISTMONK_URL || '').replace(/\/$/, '');
const LISTMONK_API_USER = process.env.LISTMONK_API_USER;
const LISTMONK_API_TOKEN = process.env.LISTMONK_API_TOKEN;
const LISTMONK_LIST_ID = process.env.LISTMONK_LIST_ID ? parseInt(process.env.LISTMONK_LIST_ID, 10) : null;
const SIGNAL_BASE_URL = (process.env.SIGNAL_BASE_URL || 'https://kiln.studio').replace(/\/$/, '');
const DELAY_SEND_MINS = process.env.DELAY_SEND_MINS ? parseInt(process.env.DELAY_SEND_MINS, 10) : null;

function verifyGhostSignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;
  const parts = signatureHeader.split(',');
  let hash = null;
  let timestamp = null;
  for (const part of parts) {
    const [key, value] = part.trim().split('=');
    if (key === 'sha256') hash = value;
    if (key === 't') timestamp = value;
  }
  if (!hash || !timestamp) return false;
  const payload = rawBody + timestamp;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

const app = express();

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.post(
  '/webhook/post-published',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const rawBody = req.body instanceof Buffer ? req.body.toString('utf8') : (req.body || '');
    const signature = req.headers['x-ghost-signature'];

    if (!GHOST_WEBHOOK_SECRET) {
      console.error('GHOST_WEBHOOK_SECRET not set');
      return res.status(500).send('Server misconfiguration');
    }
    if (!verifyGhostSignature(rawBody, signature, GHOST_WEBHOOK_SECRET)) {
      console.warn('Invalid or missing Ghost webhook signature');
      return res.status(401).send('Unauthorized');
    }

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      console.warn('Invalid JSON body');
      return res.status(400).send('Bad Request');
    }

    const post = body.post?.current;
    if (!post || post.status !== 'published') {
      return res.status(200).send('Ignored');
    }

    const title = post.title || 'New post';
    const slug = post.slug || '';
    const excerpt = post.excerpt || '';
    const readUrl = `${SIGNAL_BASE_URL}/signal/${slug}`;

    if (!LISTMONK_URL || !LISTMONK_API_USER || !LISTMONK_API_TOKEN || !LISTMONK_LIST_ID) {
      console.error('Listmonk env not configured (LISTMONK_URL, LISTMONK_API_USER, LISTMONK_API_TOKEN, LISTMONK_LIST_ID)');
      return res.status(500).send('Server misconfiguration');
    }

    const htmlBody = `
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(excerpt)}</p>
  <p><a href="${escapeHtml(readUrl)}">Read on KILN →</a></p>
  <hr>
  <p><small>This was sent from our journal. <a href="{{ UnsubscribeURL }}">Unsubscribe</a></small></p>
`.trim();

    const campaignPayload = {
      name: `Ghost: ${title}`,
      subject: title,
      lists: [LISTMONK_LIST_ID],
      type: 'regular',
      content_type: 'html',
      body: htmlBody,
    };

    let sendAt = null;
    if (DELAY_SEND_MINS != null && DELAY_SEND_MINS > 0) {
      const d = new Date();
      d.setMinutes(d.getMinutes() + DELAY_SEND_MINS);
      sendAt = d.toISOString().replace(/\.\d{3}Z$/, 'Z');
      campaignPayload.send_at = sendAt;
    }

    const auth = Buffer.from(`${LISTMONK_API_USER}:${LISTMONK_API_TOKEN}`).toString('base64');
    let createRes;
    try {
      createRes = await fetch(`${LISTMONK_URL}/api/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(campaignPayload),
      });
    } catch (e) {
      console.error('Listmonk request failed:', e.message);
      return res.status(500).send('Campaign create failed');
    }

    if (!createRes.ok) {
      const text = await createRes.text();
      console.error('Listmonk API error', createRes.status, text);
      return res.status(500).send('Campaign create failed');
    }

    const data = await createRes.json();
    const campaignId = data?.data?.id;

    if (DELAY_SEND_MINS != null && DELAY_SEND_MINS > 0 && campaignId != null) {
      try {
        await fetch(`${LISTMONK_URL}/api/campaigns/${campaignId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify({ status: 'scheduled' }),
        });
      } catch (e) {
        console.warn('Failed to schedule campaign:', e.message);
      }
    }

    res.status(200).send('Campaign created');
  }
);

function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Ghost webhook bridge listening on 127.0.0.1:${PORT}`);
});

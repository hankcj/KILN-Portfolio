/**
 * Ghost Webhook Signature Verification
 *
 * Verifies the x-ghost-signature header using HMAC-SHA256.
 * Header format: "sha256={hex_hash}, t={unix_timestamp}"
 * Payload for HMAC: rawBody + timestamp
 */

import crypto from 'crypto';

export function verifyGhostSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string
): boolean {
  if (!signatureHeader || !secret) return false;

  const parts = signatureHeader.split(',');
  let hash: string | null = null;
  let timestamp: string | null = null;

  for (const part of parts) {
    const [key, value] = part.trim().split('=');
    if (key === 'sha256') hash = value;
    if (key === 't') timestamp = value;
  }

  if (!hash || !timestamp) return false;

  const payload = rawBody + timestamp;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(expected, 'hex')
    );
  } catch {
    return false;
  }
}

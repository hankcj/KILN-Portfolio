import crypto from "node:crypto";

export function verifyGhostSignature(body: string, signatureHeader: string | null, secret: string) {
  if (!signatureHeader || !secret) return false;

  const parts = signatureHeader.split("=");
  if (parts.length !== 2 || parts[0] !== "sha256") return false;
  const provided = parts[1];

  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  } catch {
    return false;
  }
}

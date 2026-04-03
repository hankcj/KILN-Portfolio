import { NextRequest, NextResponse } from "next/server";
import { verifyGhostSignature } from "@/lib/ghost-signature";
import { createBroadcastEmailFromTemplate } from "@/lib/mautic";

const webhookSecret = process.env.GHOST_WEBHOOK_SECRET || "";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-ghost-signature");
  const payload = await request.text();

  if (!verifyGhostSignature(payload, signature, webhookSecret)) {
    return NextResponse.json({ error: "Unauthorized webhook payload." }, { status: 401 });
  }

  let body: {
    post?: {
      current?: {
        title?: string;
        slug?: string;
        excerpt?: string;
        html?: string;
        status?: string;
      };
    };
  };

  try {
    body = JSON.parse(payload) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const post = body.post?.current;
  if (!post || post.status !== "published") {
    return NextResponse.json({ ignored: true });
  }

  const title = post.title || "New Post";
  const slug = post.slug || "";
  const excerpt = post.excerpt || "";
  const html = post.html || "";
  const postUrl = `${siteUrl}/signal/${slug}`;

  const emailHtml = `
    <h2>${title}</h2>
    <p>${excerpt}</p>
    <div>${html}</div>
    <p><a href="${postUrl}">Read on site</a></p>
  `;

  const result = await createBroadcastEmailFromTemplate({
    title: `Signal: ${title}`,
    subject: title,
    html: emailHtml,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error || "Mautic broadcast failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

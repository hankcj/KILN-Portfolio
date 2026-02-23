/**
 * Ghost Webhook Handler
 *
 * Receives "post.published" webhooks from Ghost, clones the Mautic
 * Signal newsletter template with the post content, and queues it
 * for delivery to the subscriber segment.
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verifyGhostSignature } from '@/lib/ghost-signature';
import { getEmail, createEmail, sendEmail } from '@/lib/mautic';

const GHOST_WEBHOOK_SECRET = process.env.GHOST_WEBHOOK_SECRET || '';
const TEMPLATE_ID = parseInt(process.env.MAUTIC_SIGNAL_TEMPLATE_ID || '0', 10);
const DELAY_SEND_MINS = parseInt(process.env.DELAY_SEND_MINS || '0', 10);
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://kiln.studio').replace(/\/$/, '');

/**
 * GET: Verification endpoint. Call this to check config and Mautic connectivity
 * without publishing a post. No secrets are returned.
 */
export async function GET() {
  const checks: Record<string, string | number | boolean> = {
    ghostWebhookSecret: !!GHOST_WEBHOOK_SECRET,
    mauticBaseUrl: !!process.env.MAUTIC_BASE_URL,
    mauticApiUser: !!process.env.MAUTIC_API_USER,
    mauticApiPassword: !!process.env.MAUTIC_API_PASSWORD,
    mauticSignalTemplateId: TEMPLATE_ID,
    delaySendMins: DELAY_SEND_MINS,
    webhookUrl: `${SITE_URL}/api/webhooks/ghost`,
  };

  let templateReach = 'not_checked';
  if (checks.mauticBaseUrl && checks.mauticApiUser && checks.mauticApiPassword && TEMPLATE_ID > 0) {
    const result = await getEmail(TEMPLATE_ID);
    templateReach = result.success ? 'ok' : (result.error || 'failed');
  }

  return Response.json({
    ok: true,
    message: 'Ghost → Mautic webhook verification. POST to webhookUrl when a post is published.',
    checks: { ...checks, mauticTemplateReach: templateReach },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = (await headers()).get('x-ghost-signature');

  // --- Verify webhook authenticity ---

  if (!GHOST_WEBHOOK_SECRET) {
    console.error('GHOST_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  if (!verifyGhostSignature(rawBody, signature, GHOST_WEBHOOK_SECRET)) {
    console.warn('Invalid or missing Ghost webhook signature');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // --- Parse Ghost payload ---

  let body: { post?: { current?: Record<string, unknown> } };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    );
  }

  const post = body?.post?.current;
  if (!post || post.status !== 'published') {
    return NextResponse.json({ ignored: true });
  }

  const title = (post.title as string) || 'New post';
  const slug = (post.slug as string) || '';
  const excerpt = (post.excerpt as string) || '';
  const html = (post.html as string) || '';
  const postUrl = `${SITE_URL}/signal/${slug}`;

  // --- Fetch template from Mautic ---

  if (!TEMPLATE_ID) {
    console.error('MAUTIC_SIGNAL_TEMPLATE_ID not configured');
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  const templateResult = await getEmail(TEMPLATE_ID);
  if (!templateResult.success || !templateResult.email) {
    console.error('Failed to fetch template:', templateResult.error);
    return NextResponse.json(
      { error: 'Failed to fetch email template' },
      { status: 500 }
    );
  }

  const template = templateResult.email;

  // --- Replace placeholders with Ghost post content ---

  const customHtml = template.customHtml
    .replace('%%SIGNAL_EXCERPT%%', escapeHtml(excerpt))
    .replace('%%SIGNAL_BODY%%', html)
    .replace('%%SIGNAL_URL%%', escapeHtml(postUrl));

  // --- Compute optional send delay ---
  // Mautic/Symfony expects Y-m-d H:i:s (UTC) for publishUp
  let publishUp: string | undefined;
  if (DELAY_SEND_MINS > 0) {
    const d = new Date();
    d.setMinutes(d.getMinutes() + DELAY_SEND_MINS);
    const pad = (n: number) => String(n).padStart(2, '0');
    publishUp = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
  }

  // --- Create cloned email in Mautic ---

  const listIds = template.lists.map((l) => l.id);

  const createResult = await createEmail({
    name: `Signal: ${title}`,
    subject: title,
    customHtml,
    lists: listIds,
    publishUp,
  });

  if (!createResult.success || !createResult.emailId) {
    console.error('Failed to create email:', createResult.error);
    return NextResponse.json(
      { error: 'Failed to create email in Mautic' },
      { status: 500 }
    );
  }

  // --- Queue the email for segment delivery ---

  const sendResult = await sendEmail(createResult.emailId);
  if (!sendResult.success) {
    console.error('Failed to send email:', sendResult.error);
    return NextResponse.json(
      { error: 'Email created but failed to queue send' },
      { status: 500 }
    );
  }

  console.log('Ghost webhook processed:', {
    postTitle: title,
    postSlug: slug,
    mauticEmailId: createResult.emailId,
    scheduledFor: publishUp || 'immediate',
  });

  return NextResponse.json({
    ok: true,
    emailId: createResult.emailId,
  });
}

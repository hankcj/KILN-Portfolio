/**
 * Mautic REST API Client
 *
 * Used server-side only (API routes) to manage contacts and emails
 * via Mautic's REST API. Authentication: HTTP Basic Auth over HTTPS.
 */

const MAUTIC_BASE_URL = process.env.MAUTIC_BASE_URL || '';
const MAUTIC_API_USER = process.env.MAUTIC_API_USER || '';
const MAUTIC_API_PASSWORD = process.env.MAUTIC_API_PASSWORD || '';
const MAUTIC_SUBSCRIBER_SEGMENT_ID = process.env.MAUTIC_SUBSCRIBER_SEGMENT_ID
  ? parseInt(process.env.MAUTIC_SUBSCRIBER_SEGMENT_ID, 10)
  : 0;

const isConfigured = MAUTIC_BASE_URL && MAUTIC_API_USER && MAUTIC_API_PASSWORD;

function authHeader(): string {
  const encoded = Buffer.from(`${MAUTIC_API_USER}:${MAUTIC_API_PASSWORD}`).toString('base64');
  return `Basic ${encoded}`;
}

export interface CreateContactResult {
  success: boolean;
  contactId?: number;
  error?: string;
}

export async function createContact(
  email: string,
  firstname?: string,
  lastname?: string
): Promise<CreateContactResult> {
  if (!isConfigured) {
    return { success: false, error: 'Mautic API not configured' };
  }

  const payload: Record<string, string> = { email };
  if (firstname) payload.firstname = firstname;
  if (lastname) payload.lastname = lastname;

  try {
    const res = await fetch(`${MAUTIC_BASE_URL}/api/contacts/new`, {
      method: 'POST',
      headers: {
        Authorization: authHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('Mautic API error:', res.status, body);
      return { success: false, error: `Mautic returned ${res.status}` };
    }

    const data = await res.json();
    const contactId = data?.contact?.id;

    if (contactId && MAUTIC_SUBSCRIBER_SEGMENT_ID) {
      try {
        await fetch(
          `${MAUTIC_BASE_URL}/api/segments/${MAUTIC_SUBSCRIBER_SEGMENT_ID}/contact/${contactId}/add`,
          { method: 'POST', headers: { Authorization: authHeader() } }
        );
      } catch (segErr) {
        console.error('Failed to add contact to segment:', segErr);
      }
    }

    return { success: true, contactId };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create contact';
    console.error('Mautic API error:', message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Email API
// ---------------------------------------------------------------------------

export interface MauticEmail {
  id: number;
  subject: string;
  customHtml: string;
  emailType: string;
  lists: { id: number; name: string }[];
}

export interface GetEmailResult {
  success: boolean;
  email?: MauticEmail;
  error?: string;
}

export async function getEmail(id: number): Promise<GetEmailResult> {
  if (!isConfigured) {
    return { success: false, error: 'Mautic API not configured' };
  }

  try {
    const res = await fetch(`${MAUTIC_BASE_URL}/api/emails/${id}`, {
      headers: { Authorization: authHeader() },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('Mautic getEmail error:', res.status, body);
      return { success: false, error: `Mautic returned ${res.status}` };
    }

    const data = await res.json();
    const e = data?.email;
    if (!e) {
      return { success: false, error: 'No email object in response' };
    }

    const lists = e.lists
      ? Object.values(e.lists).map((l: unknown) => {
          const list = l as { id: number; name: string };
          return { id: list.id, name: list.name };
        })
      : [];

    return {
      success: true,
      email: {
        id: e.id,
        subject: e.subject,
        customHtml: e.customHtml,
        emailType: e.emailType,
        lists,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to get email';
    console.error('Mautic getEmail error:', message);
    return { success: false, error: message };
  }
}

export interface CreateEmailOpts {
  name: string;
  subject: string;
  customHtml: string;
  lists: number[];
  publishUp?: string;
}

export interface CreateEmailResult {
  success: boolean;
  emailId?: number;
  error?: string;
}

export async function createEmail(opts: CreateEmailOpts): Promise<CreateEmailResult> {
  if (!isConfigured) {
    return { success: false, error: 'Mautic API not configured' };
  }

  const payload: Record<string, unknown> = {
    name: opts.name,
    subject: opts.subject,
    customHtml: opts.customHtml,
    emailType: 'list',
    lists: opts.lists,
    isPublished: true,
  };

  if (opts.publishUp) {
    payload.publishUp = opts.publishUp;
  }

  try {
    const res = await fetch(`${MAUTIC_BASE_URL}/api/emails/new`, {
      method: 'POST',
      headers: {
        Authorization: authHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('Mautic createEmail error:', res.status, body);
      return { success: false, error: `Mautic returned ${res.status}` };
    }

    const data = await res.json();
    const emailId = data?.email?.id;

    return { success: true, emailId };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create email';
    console.error('Mautic createEmail error:', message);
    return { success: false, error: message };
  }
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

export async function sendEmail(id: number): Promise<SendEmailResult> {
  if (!isConfigured) {
    return { success: false, error: 'Mautic API not configured' };
  }

  try {
    const res = await fetch(`${MAUTIC_BASE_URL}/api/emails/${id}/send`, {
      method: 'POST',
      headers: { Authorization: authHeader() },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error('Mautic sendEmail error:', res.status, body);
      return { success: false, error: `Mautic returned ${res.status}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    console.error('Mautic sendEmail error:', message);
    return { success: false, error: message };
  }
}

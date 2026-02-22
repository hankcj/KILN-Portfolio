import { NextRequest, NextResponse } from 'next/server';
import { createContact } from '@/lib/mautic';

export async function POST(request: NextRequest) {
  let body: { email?: string; name?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { email, name } = body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json(
      { error: 'A valid email address is required' },
      { status: 400 }
    );
  }

  let firstname: string | undefined;
  let lastname: string | undefined;

  if (name) {
    const trimmed = name.trim();
    const spaceIdx = trimmed.indexOf(' ');
    if (spaceIdx > 0) {
      firstname = trimmed.slice(0, spaceIdx);
      lastname = trimmed.slice(spaceIdx + 1);
    } else {
      firstname = trimmed;
    }
  }

  const result = await createContact(
    email.trim().toLowerCase(),
    firstname,
    lastname
  );

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || 'Subscription failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Intake Form API
 *
 * Receives project inquiry submissions and sends a formatted
 * notification email via AWS SES.
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendIntakeNotificationEmail, IntakeEmailParams } from '@/lib/email';

const REQUIRED_FIELDS: (keyof IntakeEmailParams)[] = [
  'name',
  'email',
  'projectType',
  'budget',
  'timeline',
  'description',
];

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    );
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || typeof body[field] !== 'string') {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 },
      );
    }
  }

  const email = (body.email as string).trim().toLowerCase();
  if (!email.includes('@')) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 },
    );
  }

  const params: IntakeEmailParams = {
    name: (body.name as string).trim(),
    email,
    company: ((body.company as string) || '').trim(),
    projectType: (body.projectType as string).trim(),
    budget: (body.budget as string).trim(),
    timeline: (body.timeline as string).trim(),
    description: (body.description as string).trim(),
  };

  try {
    await sendIntakeNotificationEmail(params);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Intake email failed:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again or email hello@kiln.studio directly.' },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createContact } from "@/lib/mautic";

export async function POST(request: NextRequest) {
  let body: { email?: string; name?: string };

  try {
    body = (await request.json()) as { email?: string; name?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const fullName = body.name?.trim();
  const firstname = fullName ? fullName.split(" ").slice(0, 1).join("") : undefined;
  const lastname = fullName ? fullName.split(" ").slice(1).join(" ") || undefined : undefined;

  const result = await createContact(email, firstname, lastname);
  if (!result.success) {
    return NextResponse.json({ error: result.error || "Subscription failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

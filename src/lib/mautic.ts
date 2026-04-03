interface MauticResult {
  success: boolean;
  error?: string;
}

const baseUrl = process.env.MAUTIC_BASE_URL?.replace(/\/$/, "") || "";
const apiUser = process.env.MAUTIC_API_USER || "";
const apiPassword = process.env.MAUTIC_API_PASSWORD || "";

function isConfigured() {
  return Boolean(baseUrl && apiUser && apiPassword);
}

function getAuthHeader() {
  const token = Buffer.from(`${apiUser}:${apiPassword}`).toString("base64");
  return `Basic ${token}`;
}

export async function createContact(
  email: string,
  firstname?: string,
  lastname?: string,
): Promise<MauticResult> {
  if (!isConfigured()) {
    return { success: true };
  }

  try {
    const response = await fetch(`${baseUrl}/api/contacts/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
      }),
    });

    if (!response.ok) {
      return { success: false, error: `Mautic contact create failed (${response.status})` };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Could not connect to Mautic" };
  }
}

export async function createBroadcastEmailFromTemplate(payload: {
  title: string;
  html: string;
  subject?: string;
  listIds?: number[];
}): Promise<MauticResult> {
  if (!isConfigured()) {
    return { success: true };
  }

  try {
    const response = await fetch(`${baseUrl}/api/emails/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        name: payload.title,
        subject: payload.subject || payload.title,
        customHtml: payload.html,
        lists: payload.listIds || [],
        isPublished: true,
      }),
    });

    if (!response.ok) {
      return { success: false, error: `Mautic email create failed (${response.status})` };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Could not create Mautic broadcast email" };
  }
}

# Listmonk Email Subscription Setup

This document covers the email subscription integration options for the KILN portfolio site.

---

## Overview

The site supports two email subscription modes:

1. **RSS-only** (default) — Users subscribe via RSS feed at `/rss.xml`
2. **Embedded subscription form** — An in-site form that submits to Listmonk

---

## Environment Variables

### Substack Integration

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUBSTACK_URL` | No | Your Substack URL (e.g., `https://hankcj.substack.com`). When set, appears on the System page. When unset, the Substack card is hidden. |

### Listmonk Integration

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_ENABLE_EMBEDDED_SUBSCRIBE` | No | Set to `"true"` to show the embedded email subscription form on the Signal page. Default: form is hidden. |
| `NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL` | Yes* | The public subscription form URL from your Listmonk instance. Required when embedded form is enabled. |
| `NEXT_PUBLIC_LISTMONK_LIST_IDS` | No | Comma-separated list IDs to subscribe users to (e.g., `"1,2"`). If unset, Listmonk's default list is used. |

\* Required only when `NEXT_PUBLIC_ENABLE_EMBEDDED_SUBSCRIBE` is `"true"`

---

## Configuration Examples

### RSS Only (Default)

```bash
# Only RSS subscribe link is shown
NEXT_PUBLIC_ENABLE_EMBEDDED_SUBSCRIBE=false
```

### With Substack Link

```bash
# System page shows Substack card linking to your publication
NEXT_PUBLIC_SUBSTACK_URL=https://hankcj.substack.com
```

### Full Email Subscription Setup

```bash
# Enable embedded form
NEXT_PUBLIC_ENABLE_EMBEDDED_SUBSCRIBE=true

# Your Listmonk public subscription URL
NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL=https://listmonk.yoursite.com/subscription/form

# Optional: specify which lists to subscribe to
NEXT_PUBLIC_LISTMONK_LIST_IDS=1,2

# Optional: also show Substack on System page
NEXT_PUBLIC_SUBSTACK_URL=https://hankcj.substack.com
```

---

## Setting Up Listmonk

### 1. Install Listmonk

Deploy Listmonk on your infrastructure:
- [Official Docker setup](https://listmonk.app/docs/installation/)
- Self-hosted on EC2 or similar

### 2. Create a Public Subscription Form

1. Log into Listmonk admin panel
2. Go to **Lists** → Create or select lists you want users to subscribe to
3. Go to **Forms** → **Public subscription form**
4. Note the public subscription URL (e.g., `https://listmonk.yoursite.com/subscription/form`)

### 3. Configure the Site

Add the environment variables to your deployment:

```bash
NEXT_PUBLIC_ENABLE_EMBEDDED_SUBSCRIBE=true
NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL=https://your-listmonk.com/subscription/form
```

### 4. Test the Integration

1. Visit `/signal` on your site
2. Confirm the subscription form appears below the RSS link
3. Submit a test email
4. Verify the subscription appears in Listmonk (with double opt-in, check the confirmation email)

---

## How It Works

### Embedded Form Behavior

The `SubscribeForm` component (`src/components/dom/SubscribeForm.tsx`):

1. **Renders conditionally** — Only shows when `NEXT_PUBLIC_ENABLE_EMBEDDED_SUBSCRIBE` is `"true"` AND `NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL` is set
2. **Submits via JavaScript** — Uses `fetch()` with `mode: 'no-cors'` to post to Listmonk's form endpoint
3. **Handles states** — Shows loading, success, and error states with appropriate messaging
4. **Double opt-in** — Listmonk handles confirmation emails; users must confirm via email

### Form Fields

| Field | Required | Description |
|-------|----------|-------------|
| Email | Yes | Subscriber's email address |
| Name | No | Optional subscriber name |

---

## Troubleshooting

### Form Not Appearing

- Check that `NEXT_PUBLIC_ENABLE_EMBEDDED_SUBSCRIBE` is exactly `"true"` (case-sensitive)
- Verify `NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL` is set and valid
- Remember: Next.js env vars are baked at build time — you must rebuild after changing them

### Submissions Failing

- Verify the Listmonk URL is correct and accessible
- Check Listmonk's logs for rejected submissions
- Ensure your Listmonk instance allows public subscriptions (check privacy settings)

### CORS Errors

The form uses `mode: 'no-cors'` which prevents reading the response but allows the submission to succeed. This is normal for Listmonk's public forms which don't send CORS headers.

---

## Related Files

| File | Purpose |
|------|---------|
| `src/components/dom/SubscribeForm.tsx` | The subscription form component |
| `src/app/signal-page.tsx` | Signal page that conditionally renders the form |
| `src/app/system/page.tsx` | System page with Substack link |
| `.env.local.example` | Environment variable templates |

---

## See Also

- [Listmonk Documentation](https://listmonk.app/docs/)
- [Ghost CMS Setup](./GHOST_SETUP.md) — for the blog integration

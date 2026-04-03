# Ghost → Mautic Webhook Troubleshooting

When you **publish a post** in Ghost, a webhook fires to your app. The app clones your Mautic Signal template, fills it with the post content, creates a new email in Mautic, and queues it for the segment. If the new email never appears in Mautic, use this guide.

## 1. Run the verification endpoint

Your deployment exposes a **read-only check** (no secrets in the response):

```text
GET https://<your-site>/api/webhooks/ghost
```

Example: `https://studiokiln.io/api/webhooks/ghost` or `https://kiln.studio/api/webhooks/ghost`

**What to look for:**

| Field | Meaning |
|-------|--------|
| `checks.ghostWebhookSecret` | `true` = env var set. If `false`, Ghost webhooks will get 500. |
| `checks.mauticBaseUrl` / `mauticApiUser` / `mauticApiPassword` | All must be `true` or Mautic calls fail. |
| `checks.mauticSignalTemplateId` | Template ID in Mautic (e.g. `2`). Must be a segment email that contains `%%SIGNAL_EXCERPT%%`, `%%SIGNAL_BODY%%`, `%%SIGNAL_URL%%`. |
| `checks.mauticTemplateReach` | `ok` = Mautic API is reachable and template exists. `failed` or an error string = fix Mautic URL/credentials or template ID. |
| `checks.webhookUrl` | URL Ghost must call on **post.published**. Must match what you configured in Ghost. |

If any of these are wrong, fix the **environment variables** in Vercel (or wherever the app runs), redeploy if needed, then hit the GET endpoint again.

## 2. Ghost webhook configuration

In **Ghost Admin** → **Settings** → **Integrations** → your integration → **Webhooks**:

- **Event:** `post.published`
- **URL:** exactly `checks.webhookUrl` from the verification response (e.g. `https://yoursite.com/api/webhooks/ghost`)
- **Secret:** must match `GHOST_WEBHOOK_SECRET` in your app env. Ghost signs the payload with this; if it doesn’t match, the app returns 401 and the email is never created.

Create or edit the webhook, save, then publish a test post.

## 3. Check deployment logs

After publishing a post, check **server logs** for the webhook request:

- **Vercel:** Project → **Logs** (or **Functions**), filter by path `/api/webhooks/ghost`. Look for:
  - `Ghost webhook processed: { postTitle, mauticEmailId, ... }` → success.
  - `GHOST_WEBHOOK_SECRET not configured` or `Invalid or missing Ghost webhook signature` → fix secret or Ghost webhook config.
  - `Failed to fetch template` / `Failed to create email in Mautic` → fix Mautic env or template (see verification step).
  - `Failed to send email` → email was created but Mautic send API failed; check Mautic and segment.

## 4. Checklist summary

- [ ] `GET /api/webhooks/ghost` returns `mauticTemplateReach: "ok"` and all booleans `true` (except optional delay).
- [ ] Ghost webhook URL equals `checks.webhookUrl` and event is `post.published`.
- [ ] `GHOST_WEBHOOK_SECRET` in app env matches the value in Ghost’s webhook config.
- [ ] Mautic template (ID = `MAUTIC_SIGNAL_TEMPLATE_ID`) exists and contains placeholders `%%SIGNAL_EXCERPT%%`, `%%SIGNAL_BODY%%`, `%%SIGNAL_URL%%`.
- [ ] After publishing, wait 1–2 minutes and check Vercel logs for the webhook; then check Mautic for an email named **Signal: &lt;post title&gt;**.

If the GET verification passes and Ghost is configured correctly, the next place to look is deployment logs when you publish a post.

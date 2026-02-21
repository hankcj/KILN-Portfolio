# Listmonk + RSS-to-email setup

Newsletter delivery for KILN Signal uses Listmonk (self-hosted) and listmonk-rss for RSS-to-email campaigns. Ghost remains the canonical content source; the site’s RSS feed is the single output that fans out to Listmonk (email) and Substack (discovery).

## Architecture

```
Ghost (canonical) → Next.js /signal + /rss.xml
                          ↓
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
   Listmonk          Substack            RSS readers
   (email)           (RSS client)       (feed)
```

- **Ghost:** Content engine. You publish here.
- **Site RSS (`/rss.xml`):** Generated from Ghost; includes full body (`content:encoded`), thumbnails (enclosure + media), excerpts.
- **Listmonk:** Renders and sends email. No built-in RSS polling; listmonk-rss (e.g. GitHub Actions) polls the feed and creates campaigns.
- **Substack:** Point it at your RSS URL; use it for discovery only. Turn off Substack’s own email so Listmonk is the single delivery engine.

## 1. Deploy Listmonk

**Option A: EC2 + Nginx + SSL (listmonk.studiokiln.io)**

- **Prereqs:** DNS A record for `listmonk.studiokiln.io` to the instance; ports 22, 80, 443 open.
- **Run:**  
  `sudo bash deploy/listmonk/deploy-on-ec2.sh`  
  Optional: `CERTBOT_EMAIL=you@example.com` to skip Certbot prompts. Optional first run: `LISTMONK_ADMIN_USER=admin LISTMONK_ADMIN_PASSWORD=changeme` to auto-create the admin user.
- **Artifacts:** [deploy/listmonk/](../deploy/listmonk/) — `docker-compose.yml`, Nginx config, deploy script.

**Option B: Any host with Docker**

- Copy `deploy/listmonk/docker-compose.yml` to the server.
- Set `LISTMONK_ADMIN_USER` and `LISTMONK_ADMIN_PASSWORD` on first run to create the admin user.
- Expose port 9000 (or put a reverse proxy in front) and configure SSL yourself.

**Post-deploy checklist**

Do these once Listmonk is live at `https://listmonk.studiokiln.io` (or your URL):

1. **Create admin** — Open the app URL and complete first-time signup (email, password).
2. **Create list** — Lists → New list → Name: **Signal** (exact) → Create.
3. **Configure SMTP (Amazon SES)** — Settings → SMTP (or Mail server):
   - **Host:** `email-smtp.us-east-2.amazonaws.com` (use your SES region if different, e.g. `us-east-1`)
   - **Port:** `587` (STARTTLS)
   - **Username / Password:** From SES → SMTP settings → Create SMTP credentials (save the password when shown).
   - **From email:** `signal@studiokiln.io` (or another address on your verified SES domain).
   - **From name:** e.g. `KILN Signal`
   - Save; send a test email if the option is available (in SES sandbox only verified addresses receive until production is granted).
4. **Create API user** — Settings → API → Create API user (e.g. name `listmonk-rss`). Copy and store the **username** and **token**; needed for listmonk-rss and the Ghost webhook bridge.

## 2. Ghost webhook bridge (recommended for new posts)

When you publish a post in Ghost, a webhook can create a Listmonk campaign immediately (no polling). The bridge runs on the **same EC2 as Ghost**; Nginx proxies `/webhook/` to it.

**Flow:** Ghost (post published) → `https://ghost.studiokiln.io/webhook/post-published` → Nginx → bridge (127.0.0.1:3001) → Listmonk API (create campaign).

- **Deploy:** From repo root on the Ghost EC2: `sudo bash deploy/ghost-webhook-bridge/deploy-on-ec2.sh`. Ensure `/opt/ghost-webhook-bridge/.env` exists and has the required variables (copy from `deploy/ghost-webhook-bridge/.env.example`).
- **Ghost:** Settings → Integrations → (e.g. Listmonk) → Add webhook: event **Post published**, target URL `https://ghost.studiokiln.io/webhook/post-published`, and a **Secret**; set the same value as `GHOST_WEBHOOK_SECRET` in the bridge’s `.env`.
- **Env:** See table in §5; required: `GHOST_WEBHOOK_SECRET`, `LISTMONK_URL`, `LISTMONK_API_USER`, `LISTMONK_API_TOKEN`, `LISTMONK_LIST_ID`, `SIGNAL_BASE_URL`. Optional: `DELAY_SEND_MINS` (schedule send in N minutes).
- **listmonk-rss:** This bridge replaces listmonk-rss for new posts. You can disable the listmonk-rss workflow or keep it as a fallback.

## 3. RSS-to-email (listmonk-rss)

Listmonk does not poll RSS itself. Use [listmonk-rss](https://github.com/ping13/listmonk-rss) (e.g. in GitHub Actions) to fetch your feed and create campaigns.

- **Config and template:** [deploy/listmonk-rss/](../deploy/listmonk-rss/) — `env.example`, `template.md.j2`, and [README](../deploy/listmonk-rss/README.md) with setup steps.
- **Flow:** Fork listmonk-rss → copy our template and env example → set GitHub Secrets (e.g. `LISTMONK_API_USER`, `LISTMONK_API_TOKEN`, `GH_TOKEN`) and Variables (`LAST_UPDATE`, `LISTMONK_HOST`, `LIST_NAME`, `RSS_FEED`, `GH_REPOSITORY`, `DELAY_SEND_MINS`) → workflow runs on schedule and creates Listmonk campaigns from new RSS items.
- **Test:** Run `make dry_run` locally to create a draft campaign (scheduled far in the future) and review the body in Listmonk.

## 4. Wire the site to Listmonk (subscribe)

- **Subscribe URL:** Listmonk exposes a public subscription form. Typical URL: `https://listmonk.studiokiln.io/subscription/form` (or your Listmonk base URL + `/subscription/form`). Create a **public subscription form** in Listmonk (Settings or Campaigns) and note the form URL.
- **Site env:** Set `NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL` to that form URL (e.g. in Vercel or `.env.local`). The System page and Signal page will show a “Subscribe by email” / “SUBSCRIBE_VIA_EMAIL” link when this is set.
- **Copy:** The Signal page footer and System “External systems” section describe email via Listmonk and Substack as RSS; no further code changes needed.

## 5. Substack as RSS client and subscriber reconciliation

**Point Substack at your feed**

- In Substack: use “Import from RSS” or equivalent and set the feed URL to `https://<your-production-domain>/rss.xml`.
- Treat Substack as a discovery/reading surface. Turn off Substack’s own email if you want Listmonk to be the only delivery channel.

**Subscriber reconciliation (one-time or occasional)**

- **Export from Substack:** Use Substack’s export to get a list of subscriber emails (and optionally names).
- **Import into Listmonk:** In Listmonk, use the subscriber import (CSV or API) to add them to your Signal list. Respect double opt-in if required in your jurisdiction; you can import as “unconfirmed” and let Listmonk send confirmations.
- **Communicate:** Tell subscribers that delivery is moving (e.g. “Emails will now come from KILN; you can unsubscribe via the link in the footer”).
- **Unsubscribes:** Keep a single source of truth for “do not email.” If someone unsubscribes in Listmonk, they are removed from the list. If you ever sync from Substack again, either re-export and reconcile (e.g. remove in Listmonk anyone who unsubscribed on Substack) or use a global “unsub” list and exclude it from campaigns. Document your chosen rule (e.g. “Honor Listmonk unsubscribes; when re-importing from Substack, remove Substack unsubscribes from the import before adding to Listmonk”) in your own runbook or team docs.

## 6. Env summary

| Where | Variable | Purpose |
|-------|----------|---------|
| Site (Vercel / .env.local) | `NEXT_PUBLIC_LISTMONK_SUBSCRIBE_URL` | Public subscribe form URL; when set, “Subscribe by email” appears on System and Signal. |
| Ghost webhook bridge (/opt/ghost-webhook-bridge/.env) | `GHOST_WEBHOOK_SECRET`, `LISTMONK_URL`, `LISTMONK_API_USER`, `LISTMONK_API_TOKEN`, `LISTMONK_LIST_ID`, `SIGNAL_BASE_URL`; optional `DELAY_SEND_MINS`, `PORT` | See [deploy/ghost-webhook-bridge/.env.example](../deploy/ghost-webhook-bridge/.env.example). |
| listmonk-rss (GitHub Secrets/Variables or .env) | `LISTMONK_HOST`, `LISTMONK_API_USER`, `LISTMONK_API_TOKEN`, `LIST_NAME`, `RSS_FEED`, `GH_REPOSITORY`, `GH_TOKEN`, `DELAY_SEND_MINS` | See [deploy/listmonk-rss/env.example](../deploy/listmonk-rss/env.example). |

No changes to Ghost are required for the site and feed. For the webhook bridge, add a webhook in Ghost (Settings → Integrations) as in §2.

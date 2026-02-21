# Ghost → Listmonk webhook bridge

Receives Ghost `post.published` webhooks, verifies the signature, and creates a Listmonk campaign (draft or scheduled). Run on the same EC2 as Ghost and proxy via Nginx so Ghost can call `https://ghost.studiokiln.io/webhook/post-published`.

## Quick start (local)

```bash
cp .env.example .env
# Edit .env with GHOST_WEBHOOK_SECRET, LISTMONK_*, LISTMONK_LIST_ID, SIGNAL_BASE_URL
npm install
npm start
```

## Ghost setup

1. **Settings → Integrations → Add custom integration** (e.g. name "Listmonk").
2. **Add webhook:**
   - **Event:** Post published
   - **Target URL:** `https://ghost.studiokiln.io/webhook/post-published`
   - **Secret:** Generate a random string; set the same value as `GHOST_WEBHOOK_SECRET` in this app’s `.env`.
3. Save the integration.

## Listmonk

- Use the same API user/token as listmonk-rss (Settings → API).
- Set `LISTMONK_LIST_ID` to the numeric ID of your Signal list (Lists in Listmonk, or `GET /api/lists`).

## Deploy on Ghost EC2

1. Copy this folder to the server, e.g. `/opt/ghost-webhook-bridge`.
2. Create `.env` from `.env.example` and fill in secrets.
3. Run `npm install --production` and start the service (systemd or `node server.js`).
4. Add the Nginx `location /webhook/` block (see `nginx-snippet.conf`) inside the existing `server { ... }` for `ghost.studiokiln.io`, then `nginx -t && systemctl reload nginx`.

Or use the one-shot deploy script from the repo root:

```bash
sudo bash deploy/ghost-webhook-bridge/deploy-on-ec2.sh
```

(Ensure `.env` is on the server at `/opt/ghost-webhook-bridge/.env` before or after running the script.)

## Env summary

| Variable | Required | Description |
|----------|----------|-------------|
| `GHOST_WEBHOOK_SECRET` | Yes | Same as the Secret in Ghost’s webhook form. |
| `LISTMONK_URL` | Yes | Listmonk base URL (no trailing slash). |
| `LISTMONK_API_USER` | Yes | Listmonk API username. |
| `LISTMONK_API_TOKEN` | Yes | Listmonk API token. |
| `LISTMONK_LIST_ID` | Yes | Numeric list ID for campaigns. |
| `SIGNAL_BASE_URL` | Yes | Site base URL for “Read on KILN” links (no trailing slash). |
| `PORT` | No | Default `3001`. |
| `DELAY_SEND_MINS` | No | If set, campaign is scheduled to send in N minutes. |

## listmonk-rss

This bridge replaces listmonk-rss for new posts. You can disable the listmonk-rss GitHub Action or keep it as a fallback.

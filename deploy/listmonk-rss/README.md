# listmonk-rss setup for KILN Signal

RSS-to-email for Signal uses [listmonk-rss](https://github.com/ping13/listmonk-rss). Listmonk has no built-in RSS campaigns; this tool runs on a schedule (e.g. GitHub Actions), fetches your feed, and creates Listmonk campaigns.

## Setup

1. **Fork listmonk-rss**  
   Fork [ping13/listmonk-rss](https://github.com/ping13/listmonk-rss) so you can add secrets and use the workflow.

2. **Copy config and template from this repo**  
   - Copy `deploy/listmonk-rss/env.example` to `.env` in your fork (or use GitHub Secrets).  
   - Copy `deploy/listmonk-rss/template.md.j2` to the root of your fork, replacing the default template.

3. **Configure GitHub**  
   - In the fork: Settings → Secrets and variables → Actions.  
   - Add **Secrets**: `LISTMONK_API_USER`, `LISTMONK_API_TOKEN`, `GH_TOKEN`.  
   - Add **Variables**: `LAST_UPDATE` (create once; the workflow will update it).  
   - Add remaining vars as **Variables** or in a `.env` in the repo (e.g. `LISTMONK_HOST`, `LIST_NAME`, `RSS_FEED`, `GH_REPOSITORY`, `DELAY_SEND_MINS`).  
   - Create a GitHub PAT with `repo` and **Actions → Variables: write**. Use it as `GH_TOKEN`.

4. **Test locally (optional)**  
   In the fork: `uv sync`, then `make dry_run` with your `.env`. This creates a Listmonk campaign scheduled far in the future so you can review the body.

5. **Enable the workflow**  
   The fork’s `.github/workflows/listmonk_rss.yml` runs on a schedule (e.g. weekdays 8:00 UTC). Adjust the cron if needed. Run “Run workflow” once to verify.

## Template variables

The Jinja2 template receives `items`: each has `title`, `link`, `summary`, and optionally `media_content` (from Open Graph). The KILN template in this folder uses a minimal, editorial style; edit `template.md.j2` in your fork to match your voice.

## Notes

- The script compares feed item dates to `LAST_UPDATE`; only newer items are included in the next campaign.  
- Campaigns are created as Markdown; Listmonk renders them to HTML when sending.  
- For full HTML control, you’d need to extend the script or use a different pipeline (e.g. fetch `content:encoded` from the feed and render with your own HTML template).

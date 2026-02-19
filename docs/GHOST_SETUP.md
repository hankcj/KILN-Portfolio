# Ghost CMS Integration Setup

## Overview

Your KILN portfolio now has a fully integrated publishing platform using Ghost CMS as a headless content source. The `/signal` route displays your essays and writings fetched from your self-hosted Ghost instance.

## Architecture

```
┌─────────────────┐      Content API       ┌──────────────────┐
│  Your Next.js   │  ◄──────────────────►  │  Self-hosted     │
│  Frontend       │    (build-time fetch)  │  Ghost           │
│  - /signal      │                        │  - Editor        │
│  - /signal/[id] │                        │  - Members       │
└─────────────────┘                        │  - Newsletters   │
                                           └──────────────────┘
```

## Setup Instructions

### 1. Deploy Ghost

Self-host Ghost on your preferred platform:

**Option A: DigitalOcean (Easiest)**
```bash
# Use the 1-Click Ghost droplet
# https://marketplace.digitalocean.com/apps/ghost
```

**Option B: Docker**
```yaml
# docker-compose.yml
version: '3.1'
services:
  ghost:
    image: ghost:latest
    ports:
      - "2368:2368"
    environment:
      url: https://cms.yourdomain.com
      NODE_ENV: production
    volumes:
      - ghost-data:/var/lib/ghost/content
volumes:
  ghost-data:
```

### 2. Configure Ghost Integration

1. In your Ghost admin panel, go to **Settings → Integrations**
2. Click **"Add custom integration"**
3. Name it "KILN Portfolio"
4. Copy the **Content API Key**

### 3. Configure Environment Variables

Create `.env.local` in your project root:

```env
GHOST_URL=https://cms.yourdomain.com
GHOST_CONTENT_API_KEY=your_content_api_key_here
```

### 4. Test the Integration

```bash
# Run development server
npm run dev

# Visit http://localhost:3000/signal
```

## Features

### /signal (Index Page)
- Lists all posts from Ghost in chronological order
- Shows reading time, publish date, author, and tags
- Featured posts are marked with ★
- Includes link to RSS feed
- Empty state when no posts available

### /signal/[slug] (Individual Post)
- Full post content rendered with KILN styling
- Syntax highlighting for code blocks
- Pull quotes and styled blockquotes
- Author bio and profile image
- Tags display
- Navigation back to index

### Page Transitions
Each destination has unique microcopy during transitions:
- **Home**: `RETURNING_TO_ORIGIN`, `RESET_NAVIGATION`
- **Work**: `LOADING_ARCHIVE`, `ACCESS_GRANTED`
- **Signal**: `TUNING_FREQUENCY`, `RECEIVING_TRANSMISSION`
- **System**: `SYSTEM_DIAGNOSTICS`, `QUERY_PARAMETERS`

## Content Styling

Ghost content is styled with the `ghost-content` class in `globals.css`. Supported elements:

- Headings (H1-H6) with serif typography
- Paragraphs with comfortable line height
- Blockquotes with accent border
- Code blocks with dark background
- Tables with styled headers
- Images with captions
- Bookmarks/cards
- Toggle cards

## Syndication to Substack

The Signal page includes a "SYNCED_WITH_SUBSTACK" indicator. To syndicate:

1. Write and publish in Ghost
2. Use Substack's import feature or manually cross-post
3. Keep traffic flowing to Substack while owning your canonical content

## Static Generation & Revalidation

- Posts are statically generated at build time
- ISR (Incremental Static Regeneration) revalidates every 60 seconds
- Run `next build` to regenerate with latest content

## Fallback Behavior

If Ghost is not configured, the site gracefully degrades:
- `/signal` shows empty state message
- No build errors
- Console warning indicates missing configuration

## RSS Feed

Ghost provides an RSS feed at:
```
https://cms.yourdomain.com/rss/
```

You can proxy this through your Next.js site if desired.

## Next Steps

1. Deploy your Ghost instance
2. Add environment variables
3. Write your first post in Ghost
4. Rebuild your site to include the new content
5. Set up Substack cross-posting workflow

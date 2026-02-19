/**
 * RSS Feed Route
 * 
 * Generates RSS 2.0 feed from Ghost CMS posts.
 * Syndicates Signal transmissions to RSS readers.
 */

import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/ghost';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiln.studio';
const SITE_TITLE = 'KILN — SIGNAL';
const SITE_DESCRIPTION = 'Essays, research, and long-form writing on systems, design, and technology.';

export async function GET() {
  try {
    const result = await getPosts({
      limit: 'all',
      include: ['authors', 'tags'],
      order: 'published_at DESC',
      filter: 'visibility:public',
    });
    const posts = result?.posts ?? [];

    const rss = generateRSS(posts);

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    // Return empty but valid RSS on error
    return new NextResponse(generateRSS([]), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
      status: 200,
    });
  }
}

function generateRSS(posts: Awaited<ReturnType<typeof getPosts>>['posts']): string {
  const now = new Date().toUTCString();
  const list = Array.isArray(posts) ? posts : [];

  const items = list.map((post) => {
    const pubDate = new Date(post.published_at).toUTCString();
    const author = post.primary_author?.name || 'KILN';
    const categories = (post.tags || [])
      .map((tag) => `<category>${escapeXml(tag.name)}</category>`)
      .join('\n      ');
    
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/signal/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/signal/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(author)}</author>
      <dc:creator>${escapeXml(author)}</dc:creator>
      <description>${escapeXml(post.custom_excerpt || post.excerpt)}</description>
      ${post.feature_image ? `<enclosure url="${post.feature_image}" type="image/jpeg" />` : ''}
      ${categories}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${BASE_URL}/signal</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>KILN RSS Generator</generator>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/favicon.ico</url>
      <title>${SITE_TITLE}</title>
      <link>${BASE_URL}/signal</link>
    </image>
    ${items}
  </channel>
</rss>`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

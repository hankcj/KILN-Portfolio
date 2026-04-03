import { getPosts } from "@/lib/ghost";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPosts(100);
  const items = posts
    .map((post) => {
      const link = `${siteUrl}/signal/${post.slug}`;
      const description = post.custom_excerpt || post.excerpt || "";
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapeXml(link)}</link>
          <guid>${escapeXml(link)}</guid>
          <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
          <description>${escapeXml(description)}</description>
        </item>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>KILN Signal</title>
      <link>${siteUrl}/signal</link>
      <description>Essays and notes from KILN.</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  });
}

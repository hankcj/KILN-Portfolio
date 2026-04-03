import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/ghost";
import { works } from "@/lib/work";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1.0, lastModified: new Date() },
    { url: `${siteUrl}/work`, changeFrequency: "weekly", priority: 0.9, lastModified: new Date() },
    { url: `${siteUrl}/signal`, changeFrequency: "daily", priority: 0.9, lastModified: new Date() },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.7, lastModified: new Date() },
    { url: `${siteUrl}/system`, changeFrequency: "monthly", priority: 0.6, lastModified: new Date() },
    { url: `${siteUrl}/shop`, changeFrequency: "weekly", priority: 0.7, lastModified: new Date() },
    { url: `${siteUrl}/project`, changeFrequency: "monthly", priority: 0.5, lastModified: new Date() },
    { url: `${siteUrl}/intake`, changeFrequency: "monthly", priority: 0.6, lastModified: new Date() },
  ];

  const workRoutes: MetadataRoute.Sitemap = works.map((entry) => ({
    url: `${siteUrl}/work/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  let signalRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts(100);
    signalRoutes = posts.map((post) => ({
      url: `${siteUrl}/signal/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at),
      changeFrequency: "monthly",
      priority: 0.75,
    }));
  } catch {
    signalRoutes = [];
  }

  return [...staticRoutes, ...workRoutes, ...signalRoutes];
}

/**
 * Sitemap Generation
 * 
 * Generates XML sitemap for SEO.
 * Includes static routes and dynamic content from Ghost CMS.
 */

import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/ghost';

// Base URL - update this to your actual domain
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiln.studio';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/signal`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/system`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic routes from Ghost CMS
  let postRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const { posts } = await getPosts({
      limit: 'all',
      include: ['authors'],
    });

    postRoutes = posts.map((post) => ({
      url: `${BASE_URL}/signal/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.warn('Failed to fetch posts for sitemap:', error);
    // Continue with static routes only
  }

  // Work/Output routes (placeholder - update when work data source is available)
  const workRoutes: MetadataRoute.Sitemap = [
    // Example work entries - replace with actual data source
    // {
    //   url: `${BASE_URL}/work/project-name`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.6,
    // },
  ];

  return [...staticRoutes, ...postRoutes, ...workRoutes];
}

/**
 * Ghost CMS Integration
 * 
 * Client for fetching content from self-hosted Ghost instance.
 * Falls back to empty data if configuration is missing (for build time).
 */

import GhostContentAPI from '@tryghost/content-api';

// Environment variables for Ghost connection
const GHOST_URL = process.env.GHOST_URL || '';
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY || '';

// Check if Ghost is configured
const isGhostConfigured = GHOST_URL && GHOST_CONTENT_API_KEY;

// Initialize Ghost Content API client only if configured
export const ghostClient = isGhostConfigured
  ? GhostContentAPI({
      url: GHOST_URL,
      key: GHOST_CONTENT_API_KEY,
      version: 'v5.0',
    })
  : null;

// Types for Ghost content
export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt: string;
  custom_excerpt?: string;
  feature_image: string | null;
  featured: boolean;
  visibility: 'public' | 'members' | 'paid';
  created_at: string;
  updated_at: string;
  published_at: string;
  reading_time: number;
  tags?: GhostTag[];
  authors?: GhostAuthor[];
  primary_author?: GhostAuthor;
  primary_tag?: GhostTag;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  feature_image?: string;
  visibility: 'public' | 'internal';
}

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  cover_image?: string;
  bio?: string;
  website?: string;
  location?: string;
  facebook?: string;
  twitter?: string;
}

// Valid include parameters for Ghost API
const DEFAULT_INCLUDES = ['tags', 'authors'] as const;

// Default empty response for when Ghost is not configured
const emptyPostsResponse = {
  posts: [],
  meta: { pagination: { page: 1, limit: 15, pages: 0, total: 0 } }
};

// Fetch all published posts
export async function getPosts(options?: {
  limit?: number | 'all';
  page?: number;
  filter?: string;
  order?: string;
  include?: string[];
}): Promise<{ posts: GhostPost[]; meta: { pagination: { page: number; limit: number; pages: number; total: number } } }> {
  if (!ghostClient) {
    console.warn('Ghost CMS not configured. Set GHOST_URL and GHOST_CONTENT_API_KEY environment variables.');
    return emptyPostsResponse;
  }

  try {
    // SDK returns the posts array with .meta attached, not { posts, meta }
    const result = await ghostClient.posts.browse({
      limit: options?.limit || 'all',
      page: options?.page || 1,
      filter: options?.filter,
      order: options?.order || 'published_at DESC',
      include: (options?.include || DEFAULT_INCLUDES) as ('tags' | 'authors')[],
    });
    const postList = Array.isArray(result) ? result : [];
    const meta = (result as { meta?: typeof emptyPostsResponse.meta })?.meta ?? emptyPostsResponse.meta;
    return { posts: postList as GhostPost[], meta };
  } catch (error) {
    console.error('Error fetching posts from Ghost:', error);
    return emptyPostsResponse;
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  if (!ghostClient) {
    console.warn('Ghost CMS not configured. Set GHOST_URL and GHOST_CONTENT_API_KEY environment variables.');
    return null;
  }

  try {
    const post = await ghostClient.posts.read(
      { slug },
      { include: ['tags', 'authors'] as ('tags' | 'authors')[] }
    );
    return post as unknown as GhostPost;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

// Fetch featured posts
export async function getFeaturedPosts(limit: number = 3): Promise<GhostPost[]> {
  if (!ghostClient) {
    return [];
  }

  try {
    const posts = await ghostClient.posts.browse({
      filter: 'featured:true',
      limit,
      include: ['tags', 'authors'] as ('tags' | 'authors')[],
      order: 'published_at DESC',
    });
    return posts as unknown as GhostPost[];
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

// Fetch all tags
export async function getTags(): Promise<GhostTag[]> {
  if (!ghostClient) {
    return [];
  }

  try {
    const tags = await ghostClient.tags.browse({
      limit: 'all',
      filter: 'visibility:public',
    });
    return tags as unknown as GhostTag[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

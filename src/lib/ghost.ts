export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string | null;
  excerpt: string | null;
  custom_excerpt: string | null;
  feature_image: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
  reading_time: number;
  tags?: { id: string; name: string; slug: string }[];
  primary_tag?: { id: string; name: string; slug: string } | null;
}

export interface GhostPostsResponse {
  posts: GhostPost[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      pages: number;
      total: number;
    };
  };
}

const GHOST_URL = process.env.GHOST_URL || '';
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY || '';

function buildUrl(path: string, params: Record<string, string> = {}): string {
  const url = new URL(`/ghost/api/content/${path}/`, GHOST_URL);
  url.searchParams.set('key', GHOST_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return url.toString();
}

function isConfigured(): boolean {
  return Boolean(GHOST_URL && GHOST_KEY);
}

export async function getPosts(limit = 20): Promise<GhostPost[]> {
  if (!isConfigured()) return [];
  try {
    const res = await fetch(
      buildUrl('posts', {
        limit: String(limit),
        include: 'tags',
        fields:
          'id,uuid,title,slug,excerpt,custom_excerpt,feature_image,featured,published_at,updated_at,reading_time',
      }),
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data: GhostPostsResponse = await res.json();
    return data.posts;
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<GhostPost | null> {
  if (!isConfigured()) return null;
  try {
    const res = await fetch(
      buildUrl('posts/slug/' + slug, {
        include: 'tags',
      }),
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data: { posts: GhostPost[] } = await res.json();
    return data.posts[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPostsByTag(
  tag: string,
  limit = 20,
): Promise<GhostPost[]> {
  if (!isConfigured()) return [];
  try {
    const res = await fetch(
      buildUrl('posts', {
        limit: String(limit),
        include: 'tags',
        filter: `tag:${tag}`,
        fields:
          'id,uuid,title,slug,excerpt,custom_excerpt,feature_image,featured,published_at,updated_at,reading_time',
      }),
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data: GhostPostsResponse = await res.json();
    return data.posts;
  } catch {
    return [];
  }
}

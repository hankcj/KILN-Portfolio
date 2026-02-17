import { defineConfig, defineCollection, s } from 'velite';

// Essay / Signal content collection
const essays = defineCollection({
  name: 'Essay',
  pattern: 'essays/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      status: s.enum(['published', 'draft', 'archived']).default('draft'),
      type: s.enum(['Essay', 'System', 'Note']).default('Essay'),
      cover: s.image().optional(),
      metadata: s
        .object({
          readingTime: s.number().optional(),
          wordCount: s.number().optional(),
        })
        .optional(),
      content: s.mdx(),
    })
    // Transform fields
    .transform((data) => ({
      ...data,
      permalink: `/signal/${data.slug}`,
    })),
});

// Work / Output content collection
const works = defineCollection({
  name: 'Work',
  pattern: 'works/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      type: s.enum(['Essay', 'System', 'Tool', 'Visual', 'Experiment']),
      status: s.enum(['Published', 'Ongoing', 'Archived']).default('Published'),
      date: s.isodate(),
      dateRange: s
        .object({
          start: s.isodate(),
          end: s.isodate().optional(),
        })
        .optional(),
      thumbnail: s.image().optional(),
      gallery: s.array(s.image()).optional(),
      content: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/work/${data.slug}`,
    })),
});

// System / About content
const systems = defineCollection({
  name: 'System',
  pattern: 'systems/**/*.mdx',
  schema: s.object({
    slug: s.path(),
    title: s.string().max(99),
    content: s.mdx(),
  }),
});

export default defineConfig({
  root: 'src/content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { essays, works, systems },
});

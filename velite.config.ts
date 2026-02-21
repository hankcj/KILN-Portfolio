import { defineCollection, defineConfig, s } from 'velite'

const works = defineCollection({
  name: 'Work',
  pattern: 'work/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      slug: s.slug('work'),
      type: s.enum(['Essay', 'System', 'Tool', 'Visual', 'Experiment']),
      status: s.enum(['Published', 'Ongoing', 'Archived']),
      date: s.string(),
      description: s.string().optional(),
      coverImage: s.string().optional(),
      body: s.mdx(),
    })
    .transform(data => ({
      ...data,
      permalink: `/work/${data.slug}`,
    })),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { works },
})

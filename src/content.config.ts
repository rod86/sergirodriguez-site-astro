import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './collections/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    company: z.string().optional().nullable().default(null),
    image: image().optional().nullable().default(null),
    url: z.string().url().optional().nullable().default(null),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { 
  projects: projectCollection, 
};

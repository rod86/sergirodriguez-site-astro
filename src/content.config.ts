import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './collections/projects' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.coerce.date(),
        image: image(),
        short_description: z.string(),
        company: z.string().optional().nullable().default(null),
        url: z.url().optional().nullable().default(null),
        github_url: z.url().optional().nullable().default(null),
        tags: z.array(z.string()).optional().default([]),
    }),
});

export const collections = { 
    projects: projectCollection, 
};

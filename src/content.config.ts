import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Guide frontmatter is schema-validated, so the metadata rules are enforced
 * for content authors the same way BaseLayout enforces them for page authors.
 * A guide with a missing or out-of-range description fails `astro build`.
 */
const toIsoDay = (value: Date): string => value.toISOString().slice(0, 10);

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(15).max(54),
    description: z.string().min(70).max(165),
    /** Short label for cards and lists. */
    summary: z.string().min(40).max(200),
    /** YAML parses a bare date as a Date; coerce so both forms are accepted
        and downstream code always receives an ISO day string. */
    published: z.coerce.date().transform(toIsoDay),
    updated: z.coerce.date().transform(toIsoDay),
    /** Drives ordering on the hub; lower sorts first. */
    order: z.number().int().default(50),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

export const collections = { guides };

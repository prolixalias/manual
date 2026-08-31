import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const manuals = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/manuals" }),
  schema: z.object({
    title: z.string(),
    group: z.enum(["indoors", "outdoors"]),
    banner: z.string(),
    kicker: z.string(),
    lede: z.string(),
    note: z.string().optional(),
  }),
});

export const collections = { manuals };

import { z, defineCollection } from "astro:content";

const news = defineCollection({
  type: 'content',
  schema: z.object({
    isDraft: z.boolean(),
    title: z.string(),
    publishDate: z.date().transform((str) => new Date(str))
  })
})
const venues = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({ 
    name: z.string(),
    website: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      googleUrl: z.string(),
    }),
    cover: image().refine((img) => img.width >= 200, {
      message: "Cover image must be at least 200px wide."
    }).optional()
  })
});
const musicians = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({ 
    name: z.string(),
    title: z.string(),
    website: z.string(),
    cover: image().refine((img) => img.width >= 200, {
      message: "Cover image must be at least 200px wide."
    }).optional()
  })
});

export const collections = {
  'news': news,
  'venue': venues,
  'musician': musicians,
};
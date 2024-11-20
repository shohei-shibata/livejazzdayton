import { z, defineCollection } from "astro:content";

const venues = defineCollection({
  type: 'content',
  schema: z.object({ 
    name: z.string(),
    website: z.string(),
    address: z.string(),
  })
});
const musicians = defineCollection({
  type: 'content',
  schema: z.object({ 
    name: z.string(),
    website: z.string(),
  })
});

export const collections = {
  'venue': venues,
  'musician': musicians,
};
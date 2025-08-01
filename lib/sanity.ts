// lib/sanity.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '3aubrrqp',
  dataset: 'production',
  apiVersion: '2024-01-01', // use a stable API version
  useCdn: true, // `false` if you want to ensure fresh data
  // Add this part to enable tag-based revalidation
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});

import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '3aubrrqp',
  dataset: 'production',
  apiVersion: '2025-01-01', // use today’s date
  useCdn: true,
});

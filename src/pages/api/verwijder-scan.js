import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST({ request, redirect }) {
  const formData = await request.formData();
  const scanId = formData.get('scanId');

  await sanityClient.delete(scanId);

  return redirect('/');
}
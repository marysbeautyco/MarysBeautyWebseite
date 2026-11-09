import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';

// Platzhalter-Projekt-ID: Solange kein echtes Sanity-Projekt verbunden ist,
// liefert der Client bewusst keine Daten, damit der Build trotzdem funktioniert
// und die Seiten auf ihre Fallback-Inhalte zurückfallen (siehe src/lib/content.ts).
export const isSanityConfigured = Boolean(projectId) && projectId !== 'xxxxxxxx';

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token: import.meta.env.SANITY_API_READ_TOKEN || undefined,
      useCdn: true,
      perspective: 'published',
    })
  : null;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error('[Sanity] Abfrage fehlgeschlagen:', error);
    return null;
  }
}

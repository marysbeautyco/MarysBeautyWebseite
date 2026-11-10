import { sanityFetch } from './sanity';
import { siteSettingsQuery } from './queries';
import { siteSettingsFallback } from './content';
import type { SiteSettings, Treatment, TreatmentCategory } from '../types/sanity';

function isEmpty(value: unknown) {
  return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
}

/**
 * Lädt Inhalte aus Sanity und ergänzt fehlende Felder aus dem Fallback.
 * GROQ liefert für ungepflegte Felder null und für leere Listen [], beides
 * würde mit einem einfachen `??` die Seite unvollständig machen.
 */
export async function getContent<T>(query: string, fallback: T, params: Record<string, unknown> = {}): Promise<T> {
  const result = await sanityFetch<T>(query, params);
  if (isEmpty(result)) return fallback;
  if (Array.isArray(result) || typeof result !== 'object') return result as T;

  const merged = { ...fallback } as Record<string, unknown>;
  for (const [key, value] of Object.entries(result as Record<string, unknown>)) {
    if (!isEmpty(value)) merged[key] = value;
  }
  return merged as T;
}

let cachedSettings: Promise<SiteSettings> | undefined;

async function loadSiteSettings(): Promise<SiteSettings> {
  const settings = await getContent<SiteSettings>(siteSettingsQuery, siteSettingsFallback);
  return { ...settings, planityUrl: settings.planityUrl || import.meta.env.PUBLIC_PLANITY_URL };
}

/** Im Build nur einmal laden, im Dev-Server immer aktuell. */
export function getSiteSettings(): Promise<SiteSettings> {
  if (!import.meta.env.PROD) return loadSiteSettings();
  cachedSettings ??= loadSiteSettings();
  return cachedSettings;
}

export function groupTreatments(kategorien: TreatmentCategory[], treatments: Treatment[]) {
  return kategorien
    .map((kategorie) => ({
      kategorie,
      treatments: treatments.filter((t) => t.kategorie?._id === kategorie._id),
    }))
    .filter((gruppe) => gruppe.treatments.length > 0);
}

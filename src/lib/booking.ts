import type { SiteSettings } from '../types/sanity';

/**
 * Zentrale Logik für die Online-Buchung (aktuell Beautinda). Alle Buchungs-Buttons
 * der Seite nutzen diese Funktionen, das Verhalten ergibt sich allein aus den
 * Feldern in Sanity bzw. den Startinhalten (src/lib/content.ts):
 *
 * - embed: Einbettungscode gepflegt, Buchung läuft auf /termin
 * - link: echter Buchungslink gepflegt, Buttons führen direkt zur Buchungsseite;
 *   Behandlungen mit eigenem Link springen direkt zur Terminauswahl
 * - kontakt: noch nichts gepflegt, /termin zeigt Telefon und E-Mail
 *
 * Die Sanity-Felder heißen aus historischen Gründen weiter planityUrl/planityEmbedCode.
 */
export type BookingMode = 'embed' | 'link' | 'kontakt';

export const BOOKING_PAGE = '/termin';

/** Die reinen Startseiten der Buchungsportale gelten als Platzhalter, nicht als Buchungslink. */
export function isRealBookingUrl(url?: string | null): url is string {
  if (!url?.trim()) return false;
  try {
    const parsed = new URL(url);
    const isPortalHome =
      /(^|\.)(planity\.com|beautinda\.de)$/.test(parsed.hostname) && parsed.pathname.replace(/\/+$/, '') === '';
    return /^https?:$/.test(parsed.protocol) && !isPortalHome;
  } catch {
    return false;
  }
}

export function getBookingMode(settings: SiteSettings): BookingMode {
  if (settings.planityEmbedCode?.trim()) return 'embed';
  if (isRealBookingUrl(settings.planityUrl)) return 'link';
  return 'kontakt';
}

/** Ziel eines Buchungs-Buttons; ein behandlungsspezifischer Link hat Vorrang. */
export function getBookingHref(settings: SiteSettings, treatmentUrl?: string | null): string {
  const mode = getBookingMode(settings);
  if (mode === 'embed') return BOOKING_PAGE;
  if (isRealBookingUrl(treatmentUrl)) return treatmentUrl;
  return mode === 'link' ? settings.planityUrl! : BOOKING_PAGE;
}

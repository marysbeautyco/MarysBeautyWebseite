import type { SiteSettings } from '../types/sanity';

/**
 * Zentrale Logik für die Planity-Anbindung. Alle Buchungs-Buttons der Seite
 * nutzen diese Funktionen, das Verhalten ergibt sich allein aus den Sanity-Feldern:
 *
 * - embed: Planity-Einbettungscode gepflegt, Buchung läuft auf /termin
 * - link: echter Planity-Link gepflegt, Buttons führen direkt zu Planity
 * - kontakt: noch nichts gepflegt, /termin zeigt Telefon und E-Mail
 */
export type BookingMode = 'embed' | 'link' | 'kontakt';

export const BOOKING_PAGE = '/termin';

/** Die reine Planity-Startseite gilt als Platzhalter, nicht als Buchungslink. */
export function isRealBookingUrl(url?: string | null): url is string {
  if (!url?.trim()) return false;
  try {
    const parsed = new URL(url);
    const isPlanityHome = parsed.hostname.endsWith('planity.com') && parsed.pathname.replace(/\/+$/, '') === '';
    return /^https?:$/.test(parsed.protocol) && !isPlanityHome;
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

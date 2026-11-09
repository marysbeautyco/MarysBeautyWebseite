/**
 * Dokumenttypen, die ausschließlich über feste, in der Struktur verlinkte
 * Dokument-IDs bearbeitet werden (echte Singletons wie "Website-Einstellungen"
 * sowie "legalPage", von dem es zwar zwei, aber ausschließlich die beiden
 * fest verdrahteten Dokumente "impressum"/"datenschutz" geben soll). Wird
 * sowohl in der Struktur (structure/index.ts) als auch bei den
 * Dokument-Aktionen (sanity.config.ts) verwendet, um "Neu erstellen",
 * "Duplizieren" und "Löschen" zu unterbinden.
 */
export const SINGLETON_TYPES = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'galleryPage',
  'contactPage',
  'legalPage',
])

export const SINGLETON_DOCUMENT_IDS: Record<string, string> = {
  siteSettings: 'siteSettings',
  homePage: 'homePage',
  aboutPage: 'aboutPage',
  galleryPage: 'galleryPage',
  contactPage: 'contactPage',
}

// Feste IDs für die beiden rechtlichen Seiten, damit die Struktur direkt
// auf genau ein Dokument je Seite verlinken kann.
export const LEGAL_PAGE_IDS: Record<string, string> = {
  impressum: 'legalPage-impressum',
  datenschutz: 'legalPage-datenschutz',
}

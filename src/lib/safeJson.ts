/**
 * JSON.stringify, das zusätzlich "<" escaped. Verhindert, dass CMS-Inhalte
 * (z. B. eine Meta-Beschreibung mit "</script>") aus einem <script
 * type="application/ld+json">-Tag ausbrechen und XSS ermöglichen.
 */
export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

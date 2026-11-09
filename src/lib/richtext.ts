import { toHTML } from '@portabletext/to-html';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Wandelt sehr einfach formatierten Platzhaltertext (## Überschrift, Leerzeile = Absatz,
 * --- = Trenner) sicher in HTML um. Wird nur für die fiktiven Fallback-Texte in
 * src/lib/content.ts verwendet, bevor echte Sanity-Inhalte (Portable Text) vorliegen.
 */
function plainTextToHtml(text: string): string {
  const bloecke = text.split(/\n{2,}/);
  return bloecke
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (trimmed === '---') return '<hr />';
      if (trimmed.startsWith('## ')) {
        return `<h2>${escapeHtml(trimmed.slice(3))}</h2>`;
      }
      const zeilen = trimmed.split('\n').map((zeile) => {
        const fett = zeile.match(/^\*\*(.+)\*\*$/);
        return fett ? `<strong>${escapeHtml(fett[1])}</strong>` : escapeHtml(zeile);
      });
      return `<p>${zeilen.join('<br />')}</p>`;
    })
    .join('\n');
}

/**
 * Rendert entweder echte Sanity Portable-Text-Blöcke (Array) oder den einfachen
 * Fallback-Text (String) sicher zu HTML. Beide Pfade escapen Nutzerinhalte,
 * Portable-Text-Bilder/Marks werden durch @portabletext/to-html serialisiert.
 */
export function richTextToHtml(inhalt: unknown): string {
  if (!inhalt) return '';
  if (typeof inhalt === 'string') return plainTextToHtml(inhalt);
  if (Array.isArray(inhalt)) return toHTML(inhalt as never);
  return '';
}

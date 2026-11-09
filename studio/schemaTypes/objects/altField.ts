import type { ObjectDefinition } from 'sanity'

/**
 * Wiederverwendbares Alternativtext-Feld für Bilder. Wird direkt in jedes
 * `image`-Feld als zusätzliches `fields: [altField]` eingebunden, damit die
 * Website (src/types/sanity.ts: SanityImage.alt) das Feld konsistent an
 * derselben Stelle findet.
 */
export const altField: ObjectDefinition['fields'][number] = {
  name: 'alt',
  title: 'Alternativtext',
  type: 'string',
  description: 'Kurze Beschreibung des Bildinhalts – wichtig für Barrierefreiheit und SEO.',
}

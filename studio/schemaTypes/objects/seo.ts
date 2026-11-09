import { defineField, defineType } from 'sanity'
import { altField } from './altField'

export default defineType({
  name: 'seo',
  title: 'SEO-Einstellungen',
  type: 'object',
  description:
    'Optionale Angaben für Suchmaschinen und die Vorschau beim Teilen in sozialen Netzwerken. Wird ein Feld leer gelassen, verwendet die Webseite einen sinnvollen Standardwert.',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'SEO-Titel',
      type: 'string',
      description: 'Wird als Seitentitel in Suchmaschinen angezeigt. Empfohlen: max. 60 Zeichen.',
      validation: (Rule) => Rule.max(60).warning('Titel über 60 Zeichen werden in Google oft abgeschnitten.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta-Beschreibung',
      type: 'text',
      rows: 3,
      description: 'Kurzbeschreibung unter dem Titel in den Suchergebnissen. Empfohlen: 50–160 Zeichen.',
      validation: (Rule) => Rule.max(160).warning('Beschreibungen über 160 Zeichen werden oft abgeschnitten.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Vorschaubild (Social Media)',
      type: 'image',
      description: 'Bild, das beim Teilen des Links z. B. auf Facebook oder Instagram angezeigt wird. Ideal: 1200 × 630 Pixel.',
      options: { hotspot: true },
      fields: [altField],
    }),
    defineField({
      name: 'noIndex',
      title: 'Seite von Suchmaschinen ausschließen',
      type: 'boolean',
      description: 'Nur aktivieren, wenn diese Seite NICHT bei Google & Co. erscheinen soll.',
      initialValue: false,
    }),
  ],
})

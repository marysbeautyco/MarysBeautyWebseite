import { HomeIcon } from '../../icons'
import { defineField, defineType } from 'sanity'
import { altField } from '../objects/altField'

export default defineType({
  name: 'homePage',
  title: 'Startseite',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroBild',
      title: 'Hero-Hintergrundbild',
      type: 'image',
      description: 'Großes Bild ganz oben auf der Startseite. Querformat, möglichst hochauflösend.',
      options: { hotspot: true },
      fields: [altField],
    }),
    defineField({
      name: 'heroUeberschrift',
      title: 'Hero-Überschrift',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroText',
      title: 'Hero-Beschreibungstext',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Text des Buchungs-Buttons',
      type: 'string',
      initialValue: 'Jetzt Termin buchen',
    }),
    defineField({
      name: 'kurzvorstellungTitel',
      title: 'Titel der Kurzvorstellung',
      type: 'string',
    }),
    defineField({
      name: 'kurzvorstellungText',
      title: 'Text der Kurzvorstellung',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'vorteile',
      title: 'Vorteile / Besonderheiten',
      type: 'array',
      of: [{ type: 'vorteil' }],
      description: 'Werden als kleine Kacheln auf der Startseite angezeigt (z. B. 4 Stück).',
    }),
    defineField({
      name: 'galerieVorschau',
      title: 'Galerie-Vorschaubilder',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true }, fields: [altField] }],
      description: 'Eine kleine Auswahl an Bildern für die Startseite (unabhängig von der vollständigen Galerie-Seite).',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'seo',
      title: 'SEO-Einstellungen',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'heroUeberschrift', media: 'heroBild' },
    prepare({ title, media }) {
      return { title: title || 'Startseite', media }
    },
  },
})

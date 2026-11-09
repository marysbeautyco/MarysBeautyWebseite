import { ImageIcon } from '../../icons'
import { defineField, defineType } from 'sanity'
import { altField } from '../objects/altField'

export default defineType({
  name: 'galleryImage',
  title: 'Galeriebild',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'bild',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [altField],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titel',
      title: 'Titel / Alternativtext',
      type: 'string',
      description: 'Kurze Beschreibung des Bildes – wichtig für Barrierefreiheit und SEO.',
    }),
    defineField({
      name: 'reihenfolge',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Bestimmt die Position in der Galerie (aufsteigend).',
    }),
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'reihenfolgeAsc',
      by: [{ field: 'reihenfolge', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'titel', media: 'bild' },
    prepare({ title, media }) {
      return { title: title || 'Galeriebild', media }
    },
  },
})

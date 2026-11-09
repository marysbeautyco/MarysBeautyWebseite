import { TagIcon } from '../../icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'treatmentCategory',
  title: 'Behandlungskategorie',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'titel',
      title: 'Titel',
      type: 'string',
      description: 'z. B. "Facials", "Specials" oder "Laserhaarentfernung"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titel', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reihenfolge',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Bestimmt die Reihenfolge der Kategorien auf der Behandlungen-Seite.',
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
    select: { title: 'titel' },
  },
})

import { SparklesIcon } from '../../icons'
import { defineField, defineType } from 'sanity'
import { altField } from '../objects/altField'

export default defineType({
  name: 'treatment',
  title: 'Behandlung',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'titel',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titel', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kategorie',
      title: 'Kategorie',
      type: 'reference',
      to: [{ type: 'treatmentCategory' }],
    }),
    defineField({
      name: 'kurzbeschreibung',
      title: 'Kurzbeschreibung',
      type: 'text',
      rows: 3,
      description: 'Wird in der Behandlungsliste angezeigt.',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'beschreibung',
      title: 'Ausführliche Beschreibung',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optional: ausführlicherer Text, falls benötigt.',
    }),
    defineField({
      name: 'bild',
      title: 'Bild',
      type: 'image',
      description: 'Optional. Wird als kleines Hochformat neben der Behandlung angezeigt.',
      options: { hotspot: true },
      fields: [altField],
    }),
    defineField({
      name: 'planityUrl',
      title: 'Abweichender Buchungslink (optional)',
      type: 'url',
      description:
        'Nur ausfüllen, falls diese Behandlung in Planity einen eigenen Buchungslink hat. Ansonsten wird automatisch der allgemeine Planity-Link verwendet.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'reihenfolge',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Bestimmt die Reihenfolge innerhalb der Kategorie.',
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
    select: { title: 'titel', subtitle: 'kategorie.titel', media: 'bild' },
  },
})

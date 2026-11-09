import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'openingHoursEntry',
  title: 'Öffnungszeiten-Zeile',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag(e)',
      type: 'string',
      description: 'z. B. "Montag" oder "Dienstag – Freitag"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zeiten',
      title: 'Uhrzeiten',
      type: 'string',
      description: 'z. B. "09:00 – 18:00 Uhr" oder "geschlossen"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'tag', subtitle: 'zeiten' },
  },
})

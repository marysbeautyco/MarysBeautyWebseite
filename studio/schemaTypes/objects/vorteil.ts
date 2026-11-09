import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'vorteil',
  title: 'Vorteil / Besonderheit',
  type: 'object',
  fields: [
    defineField({
      name: 'titel',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Kurztext',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'titel', subtitle: 'text' },
  },
})

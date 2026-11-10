import { UsersIcon } from '../../icons'
import { defineField, defineType } from 'sanity'
import { altField } from '../objects/altField'

export default defineType({
  name: 'aboutPage',
  title: 'Über uns',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'titel',
      title: 'Seitentitel',
      type: 'string',
      initialValue: 'Über uns',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bild',
      title: 'Bild (Studio / Team)',
      type: 'image',
      description: 'Erscheint in einem Bogen. Am besten ein Foto im Hochformat (4:5).',
      options: { hotspot: true },
      fields: [altField],
    }),
    defineField({
      name: 'philosophieTitel',
      title: 'Titel: Philosophie',
      type: 'string',
      initialValue: 'Unsere Philosophie',
    }),
    defineField({
      name: 'philosophieText',
      title: 'Text: Philosophie',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Beschreiben Sie die Haltung und Arbeitsweise des Studios.',
    }),
    defineField({
      name: 'team',
      title: 'Teammitglieder',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      description: 'Wählen Sie die Teammitglieder aus, die auf dieser Seite angezeigt werden sollen.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO-Einstellungen',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'titel', media: 'bild' },
  },
})

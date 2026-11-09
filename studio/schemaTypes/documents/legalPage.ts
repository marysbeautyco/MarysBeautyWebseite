import { DocumentTextIcon } from '../../icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Rechtliche Seite',
  type: 'document',
  icon: DocumentTextIcon,
  description: 'Wird für Impressum und Datenschutzerklärung verwendet.',
  fields: [
    defineField({
      name: 'titel',
      title: 'Seitentitel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Seiten-Kennung',
      type: 'slug',
      description: 'Bitte nicht ändern: bestimmt, ob es sich um das Impressum oder die Datenschutzerklärung handelt.',
      options: {
        source: 'titel',
        maxLength: 64,
      },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const erlaubt = ['impressum', 'datenschutz']
          if (value?.current && !erlaubt.includes(value.current)) {
            return `Der Slug muss "impressum" oder "datenschutz" sein (aktuell: "${value.current}").`
          }
          return true
        }),
    }),
    defineField({
      name: 'inhalt',
      title: 'Inhalt',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO-Einstellungen',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'titel', subtitle: 'slug.current' },
  },
})

import { ImagesIcon } from '../../icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Galerie-Seite',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'titel',
      title: 'Seitentitel',
      type: 'string',
      initialValue: 'Galerie',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'einleitung',
      title: 'Einleitungstext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seo',
      title: 'SEO-Einstellungen',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'titel' },
  },
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social-Media-Link',
  type: 'object',
  fields: [
    defineField({
      name: 'plattform',
      title: 'Plattform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Pinterest', value: 'pinterest' },
          { title: 'YouTube', value: 'youtube' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      description: 'Vollständiger Link zum Profil, z. B. https://www.instagram.com/marysbeauty.co/',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'plattform', subtitle: 'url' },
  },
})

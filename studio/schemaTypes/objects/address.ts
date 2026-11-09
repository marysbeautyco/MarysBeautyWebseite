import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'address',
  title: 'Adresse',
  type: 'object',
  fields: [
    defineField({
      name: 'strasse',
      title: 'Straße und Hausnummer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'plz',
      title: 'Postleitzahl',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ort',
      title: 'Ort',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

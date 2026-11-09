import { UserIcon } from '../../icons'
import { defineField, defineType } from 'sanity'
import { altField } from '../objects/altField'

export default defineType({
  name: 'teamMember',
  title: 'Teammitglied',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rolle',
      title: 'Rolle / Funktion',
      type: 'string',
      description: 'z. B. "Inhaberin & Kosmetikerin"',
    }),
    defineField({
      name: 'bild',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [altField],
    }),
    defineField({
      name: 'beschreibung',
      title: 'Kurzbeschreibung',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'reihenfolge',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Bestimmt die Sortierung im Team (aufsteigend). Kleinere Zahl = weiter vorne.',
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
    select: { title: 'name', subtitle: 'rolle', media: 'bild' },
  },
})

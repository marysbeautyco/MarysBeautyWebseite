import { EnvelopeIcon } from '../../icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Kontakt-Seite',
  type: 'document',
  icon: EnvelopeIcon,
  description:
    'Texte für die Kontaktseite. Die eigentlichen Kontaktdaten (Adresse, Telefon, E-Mail, Öffnungszeiten) werden zentral unter "Allgemeine Website-Einstellungen" gepflegt.',
  fields: [
    defineField({
      name: 'titel',
      title: 'Seitentitel',
      type: 'string',
      initialValue: 'Kontakt',
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

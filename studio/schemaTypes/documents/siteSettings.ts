import { CogIcon } from '../../icons'
import { defineField, defineType } from 'sanity'
import { altField } from '../objects/altField'

export default defineType({
  name: 'siteSettings',
  title: 'Allgemeine Website-Einstellungen',
  type: 'document',
  icon: CogIcon,
  // Singleton: Es soll immer nur genau dieses eine Dokument geben.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'studioName',
      title: 'Name des Studios',
      type: 'string',
      description: 'Wird z. B. im Seitentitel, im Footer und in der Navigation verwendet.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Erscheint oben links in der Navigation. Am besten ein Logo mit transparentem Hintergrund.',
      options: { hotspot: true },
      fields: [altField],
    }),
    defineField({
      name: 'claim',
      title: 'Claim / Untertitel',
      type: 'string',
      description: 'Kurzer Slogan, der z. B. im Footer unter dem Studionamen erscheint.',
    }),
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'telefon',
      title: 'Telefonnummer',
      type: 'string',
      description: 'Bitte im Format +49 123 4567890 eingeben, damit der Klick-zum-Anrufen-Link funktioniert.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'E-Mail-Adresse',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'oeffnungszeiten',
      title: 'Öffnungszeiten',
      type: 'array',
      of: [{ type: 'openingHoursEntry' }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social-Media-Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'planityUrl',
      title: 'Planity-Buchungslink',
      type: 'url',
      description:
        'Der Standard-Buchungslink, der z. B. für den "Jetzt Termin buchen"-Button verwendet wird (z. B. https://www.planity.com/ihr-studio).',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'planityEmbedCode',
      title: 'Planity White-Label-Einbettungscode (optional)',
      type: 'text',
      rows: 6,
      description:
        'Nur ausfüllen, falls Planity Pro das White-Label-Buchungsmodul für dieses Studio freigeschaltet hat. Den von Planity bereitgestellten Einbettungscode hier unverändert einfügen – er wird dann zusätzlich zum normalen Buchungs-Button auf der Kontaktseite angezeigt. Leer lassen, wenn nur der normale Buchungslink (Variante A) genutzt werden soll.',
    }),
    defineField({
      name: 'kartenlink',
      title: 'Link zur Anfahrt (Kartendienst)',
      type: 'url',
      description: 'z. B. ein Google-Maps-Link zur Adresse des Studios.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'seo',
      title: 'Standard-SEO (Fallback)',
      type: 'seo',
      description: 'Wird verwendet, wenn eine einzelne Seite keine eigenen SEO-Angaben hat.',
    }),
  ],
  preview: {
    select: { title: 'studioName', media: 'logo' },
    prepare({ title, media }) {
      return { title: title || 'Website-Einstellungen', media }
    },
  },
})

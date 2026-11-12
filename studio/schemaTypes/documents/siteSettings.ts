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
      description: 'Erscheint oben links in der Navigation. Bitte ein PNG mit transparentem Hintergrund verwenden. Leer lassen, um das hinterlegte Standardlogo zu nutzen.',
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
      description: 'So wie sie auf der Webseite erscheinen soll, z. B. 0171 1009917 oder +49 171 1009917.',
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
      title: 'Online-Buchungslink (Beautinda)',
      type: 'url',
      description:
        'Der Link zu Ihrer Studio-Seite bei Beautinda (z. B. https://beautinda.de/salon/pkRTjJWdfyqUFk88REa6). Alle allgemeinen "Termin buchen"-Buttons führen dorthin. Solange das Feld leer ist, zeigen die Buttons auf die Seite "Termin buchen" mit Telefon und E-Mail.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'planityEmbedCode',
      title: 'Planity White-Label-Einbettungscode (optional)',
      type: 'text',
      rows: 6,
      description:
        'Nur ausfüllen, falls Planity Pro das White-Label-Buchungsmodul für dieses Studio freigeschaltet hat. Den von Planity bereitgestellten Einbettungscode hier unverändert einfügen. Die Buchung läuft dann direkt auf der Seite "Termin buchen" dieser Webseite. Leer lassen, wenn nur der normale Buchungslink genutzt werden soll.',
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

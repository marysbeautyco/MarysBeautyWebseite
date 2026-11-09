import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  ImagesIcon,
  SparklesIcon,
  TagIcon,
  UsersIcon,
} from '../icons'
import { LEGAL_PAGE_IDS, SINGLETON_DOCUMENT_IDS } from './singletons'

/**
 * Kuratierte Studio-Navigation auf Deutsch, gruppiert nach den im
 * Projektauftrag genannten Bearbeitungsbereichen. Singletons verlinken
 * direkt auf ihr einziges Dokument (kein "Neu erstellen"-Knopf nötig).
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('MARYS BEAUTY – Inhalte')
    .items([
      S.listItem()
        .title('Startseite')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId(SINGLETON_DOCUMENT_IDS.homePage)),

      S.listItem()
        .title('Behandlungen')
        .icon(SparklesIcon)
        .child(
          S.list()
            .title('Behandlungen')
            .items([
              S.documentTypeListItem('treatmentCategory').title('Kategorien').icon(TagIcon),
              S.documentTypeListItem('treatment').title('Behandlungen').icon(SparklesIcon),
            ]),
        ),

      S.listItem()
        .title('Über uns & Team')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Über uns & Team')
            .items([
              S.listItem()
                .title('Über uns – Seite')
                .icon(UsersIcon)
                .child(S.document().schemaType('aboutPage').documentId(SINGLETON_DOCUMENT_IDS.aboutPage)),
              S.documentTypeListItem('teamMember').title('Teammitglieder').icon(UsersIcon),
            ]),
        ),

      S.listItem()
        .title('Galerie')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Galerie')
            .items([
              S.listItem()
                .title('Galerie – Seite')
                .icon(ImagesIcon)
                .child(S.document().schemaType('galleryPage').documentId(SINGLETON_DOCUMENT_IDS.galleryPage)),
              S.documentTypeListItem('galleryImage').title('Galeriebilder').icon(ImagesIcon),
            ]),
        ),

      S.listItem()
        .title('Kontakt – Seite')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('contactPage').documentId(SINGLETON_DOCUMENT_IDS.contactPage)),

      S.divider(),

      S.listItem()
        .title('Allgemeine Website-Einstellungen')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId(SINGLETON_DOCUMENT_IDS.siteSettings)),

      S.listItem()
        .title('Rechtliches')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Rechtliches')
            .items([
              S.listItem()
                .title('Impressum')
                .icon(DocumentTextIcon)
                .child(S.document().schemaType('legalPage').documentId(LEGAL_PAGE_IDS.impressum)),
              S.listItem()
                .title('Datenschutzerklärung')
                .icon(DocumentTextIcon)
                .child(S.document().schemaType('legalPage').documentId(LEGAL_PAGE_IDS.datenschutz)),
            ]),
        ),
    ])

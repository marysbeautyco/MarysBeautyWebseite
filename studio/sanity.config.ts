import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './schemaTypes'
import { structure } from './structure'
import { SINGLETON_TYPES } from './structure/singletons'

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID || 'xxxxxxxx'
const dataset = import.meta.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'marysbeauty-studio',
  title: 'MARYS BEAUTY – Website-Inhalte',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    // Vision erlaubt technisch versierten Nutzer:innen GROQ-Testabfragen –
    // für die tägliche Redaktion nicht nötig, aber hilfreich für Entwickler.
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Singletons (siteSettings, homePage, ...) können nicht dupliziert oder
    // gelöscht werden – es soll immer nur genau ein Dokument pro Typ geben.
    actions: (prev, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? prev.filter(({ action }) => action && !['duplicate', 'delete', 'unpublish'].includes(action))
        : prev,
    // Verhindert, dass über "Neues Dokument" versehentlich ein zweites
    // Singleton-Dokument angelegt wird.
    newDocumentOptions: (prev) => prev.filter((item) => !SINGLETON_TYPES.has(item.templateId)),
  },
})

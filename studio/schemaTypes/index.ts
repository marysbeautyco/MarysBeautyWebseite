import address from './objects/address'
import openingHoursEntry from './objects/openingHoursEntry'
import seo from './objects/seo'
import socialLink from './objects/socialLink'
import vorteil from './objects/vorteil'

import aboutPage from './documents/aboutPage'
import contactPage from './documents/contactPage'
import galleryImage from './documents/galleryImage'
import galleryPage from './documents/galleryPage'
import homePage from './documents/homePage'
import legalPage from './documents/legalPage'
import siteSettings from './documents/siteSettings'
import teamMember from './documents/teamMember'
import treatment from './documents/treatment'
import treatmentCategory from './documents/treatmentCategory'

export const schemaTypes = [
  // Objekte (wiederverwendbare Feldgruppen)
  address,
  openingHoursEntry,
  seo,
  socialLink,
  vorteil,

  // Singletons (genau ein Dokument)
  siteSettings,
  homePage,
  aboutPage,
  galleryPage,
  contactPage,

  // Listen-Dokumente
  treatmentCategory,
  treatment,
  teamMember,
  galleryImage,
  legalPage,
]

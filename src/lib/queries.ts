// Zentrale GROQ-Abfragen für alle Seiten.
// `image` wird jeweils mit Asset-URL und Metadaten mitgeladen, damit kein
// zusätzlicher Request zur Bild-Auflösung nötig ist.

const imageProjection = `{
  asset->{_id, url, metadata{dimensions, lqip}},
  alt,
  hotspot
}`;

const seoProjection = `{
  metaTitle,
  metaDescription,
  ogImage ${imageProjection},
  noIndex
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  studioName,
  logo ${imageProjection},
  claim,
  adresse,
  telefon,
  email,
  oeffnungszeiten,
  socialLinks,
  planityUrl,
  planityEmbedCode,
  kartenlink,
  seo ${seoProjection}
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  heroBild ${imageProjection},
  heroUeberschrift,
  heroText,
  heroButtonText,
  kurzvorstellungTitel,
  kurzvorstellungText,
  vorteile,
  galerieVorschau[] ${imageProjection},
  seo ${seoProjection}
}`;

export const treatmentsQuery = `*[_type == "treatment"] | order(reihenfolge asc, titel asc){
  _id,
  titel,
  slug,
  kategorie->{_id, titel, slug, reihenfolge},
  kurzbeschreibung,
  beschreibung,
  bild ${imageProjection},
  planityUrl,
  reihenfolge
}`;

export const treatmentCategoriesQuery = `*[_type == "treatmentCategory"] | order(reihenfolge asc, titel asc){
  _id, titel, slug, reihenfolge
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  titel,
  philosophieTitel,
  philosophieText,
  bild ${imageProjection},
  team[]->{_id, name, rolle, bild ${imageProjection}, beschreibung, reihenfolge},
  seo ${seoProjection}
}`;

export const galleryPageQuery = `*[_type == "galleryPage"][0]{
  titel,
  einleitung,
  seo ${seoProjection}
}`;

export const galleryImagesQuery = `*[_type == "galleryImage"] | order(reihenfolge asc){
  _id,
  bild ${imageProjection},
  titel,
  reihenfolge
}`;

export const contactPageQuery = `*[_type == "contactPage"][0]{
  titel,
  einleitung,
  seo ${seoProjection}
}`;

// $slug wird als GROQ-Parameter übergeben (siehe sanityFetch-Aufruf), nicht per
// String-Interpolation, um jegliche Injection-Möglichkeit auszuschließen.
export const legalPageQuery = `*[_type == "legalPage" && slug.current == $slug][0]{
  _id, titel, slug, inhalt, seo ${seoProjection}
}`;

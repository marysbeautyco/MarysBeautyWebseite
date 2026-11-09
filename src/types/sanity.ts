// Typdefinitionen für die aus Sanity geladenen Inhalte.
// Spiegeln die Schemas in studio/schemaTypes/ wider.

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: { width: number; height: number; aspectRatio: number };
      lqip?: string;
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number };
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface OpeningHoursEntry {
  tag: string;
  zeiten: string;
}

export interface SocialLink {
  plattform: 'instagram' | 'facebook' | 'tiktok' | 'pinterest' | 'youtube';
  url: string;
}

export interface SiteSettings {
  studioName: string;
  logo?: SanityImage;
  claim?: string;
  adresse: {
    strasse: string;
    plz: string;
    ort: string;
  };
  telefon: string;
  email: string;
  oeffnungszeiten: OpeningHoursEntry[];
  socialLinks?: SocialLink[];
  planityUrl: string;
  planityEmbedCode?: string;
  kartenlink?: string;
  seo?: Seo;
}

export interface TreatmentCategory {
  _id: string;
  titel: string;
  slug: { current: string };
  reihenfolge?: number;
}

export interface Treatment {
  _id: string;
  titel: string;
  slug: { current: string };
  kategorie?: TreatmentCategory;
  kurzbeschreibung: string;
  beschreibung?: unknown;
  bild?: SanityImage;
  planityUrl?: string;
  reihenfolge?: number;
}

export interface TeamMember {
  _id: string;
  name: string;
  rolle?: string;
  bild?: SanityImage;
  beschreibung?: string;
  reihenfolge?: number;
}

export interface HomePage {
  heroBild?: SanityImage;
  heroUeberschrift: string;
  heroText: string;
  heroButtonText?: string;
  kurzvorstellungTitel?: string;
  kurzvorstellungText?: string;
  vorteile?: { titel: string; text: string; icon?: string }[];
  galerieVorschau?: SanityImage[];
  seo?: Seo;
}

export interface AboutPage {
  titel: string;
  philosophieTitel?: string;
  philosophieText?: unknown;
  bild?: SanityImage;
  team?: TeamMember[];
  seo?: Seo;
}

export interface GalleryImage {
  _id: string;
  bild: SanityImage;
  titel?: string;
  reihenfolge?: number;
}

export interface GalleryPage {
  titel: string;
  einleitung?: string;
  seo?: Seo;
}

export interface ContactPage {
  titel: string;
  einleitung?: string;
  seo?: Seo;
}

export interface LegalPage {
  _id: string;
  titel: string;
  slug: { current: string };
  inhalt: unknown;
  seo?: Seo;
}

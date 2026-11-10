// Startinhalte für MARYS BEAUTY. Studioname, Behandlungstexte, Kontaktdaten und
// Instagram-Name stammen vom Kunden. Sie greifen, solange in Sanity noch nichts
// gepflegt ist, und sind zugleich die Quelle für den Sanity-Startdatensatz
// (scripts/generate-sanity-seed.ts).
// Preise werden bewusst NICHT gepflegt – sie kommen ausschließlich aus Planity.
import type {
  AboutPage,
  ContactPage,
  GalleryPage,
  HomePage,
  LegalPage,
  SiteSettings,
  Treatment,
  TreatmentCategory,
} from '../types/sanity';

export const siteSettingsFallback: SiteSettings = {
  studioName: 'Marys Beauty',
  claim: 'Für Ihre natürliche Schönheit und Ihr Wohlbefinden',
  adresse: {
    strasse: 'Kirchstraße 11',
    plz: '48282',
    ort: 'Emsdetten',
  },
  telefon: '0171 1009917',
  email: 'marysbeautyco7@gmail.com',
  // Feste Öffnungszeiten liegen noch nicht vor.
  oeffnungszeiten: [{ tag: 'Termine', zeiten: 'nach Vereinbarung' }],
  // Instagram-Handle @marysbeauty.co stammt aus der gelieferten Preisliste.
  socialLinks: [{ plattform: 'instagram', url: 'https://www.instagram.com/marysbeauty.co/' }],
  kartenlink: 'https://www.google.com/maps/search/?api=1&query=Kirchstra%C3%9Fe+11%2C+48282+Emsdetten',
};

export const homePageFallback: HomePage = {
  heroUeberschrift: 'Natürliche Schönheit, individuell gepflegt',
  heroText:
    'Moderne Behandlungsmethoden, hochwertige Pflegeprodukte und individuell abgestimmte Anwendungen für ein gepflegtes und strahlendes Erscheinungsbild.',
  heroButtonText: 'Termin buchen',
  kurzvorstellungTitel: 'Herzlich willkommen bei Marys Beauty',
  kurzvorstellungText:
    'Mit modernen Behandlungsmethoden, hochwertigen Pflegeprodukten und individuell abgestimmten Anwendungen bieten wir Ihnen professionelle Beautybehandlungen – von Facials über Permanent Make-up bis zur Laserhaarentfernung. Jede Anwendung wird unter Berücksichtigung Ihrer persönlichen Wünsche und Bedürfnisse ausgewählt.',
  vorteile: [
    { titel: 'Individuelle Beratung', text: 'Jede Behandlung wird auf Ihre persönlichen Wünsche abgestimmt.' },
    { titel: 'Moderne Methoden', text: 'Hydrafacial, Microneedling, Laser & mehr auf aktuellem Stand der Technik.' },
    { titel: 'Hochwertige Produkte', text: 'Sorgfältig ausgewählte, hautfreundliche Pflegeserien.' },
    { titel: 'Natürliche Ergebnisse', text: 'Für ein gepflegtes, strahlendes und natürlich wirkendes Erscheinungsbild.' },
  ],
};

export const treatmentCategoriesFallback: TreatmentCategory[] = [
  {
    _id: 'cat-facials',
    titel: 'Facials',
    slug: { current: 'facials' },
    beschreibung: 'Reinigung, Pflege und moderne Technologie für ein frisches, strahlendes Hautbild.',
    reihenfolge: 1,
  },
  {
    _id: 'cat-specials',
    titel: 'Specials',
    slug: { current: 'specials' },
    beschreibung: 'Wimpern, Brauen und Permanent Make-up, dezent betont und natürlich im Ausdruck.',
    reihenfolge: 2,
  },
  {
    _id: 'cat-laser',
    titel: 'Laserhaarentfernung',
    slug: { current: 'laserhaarentfernung' },
    beschreibung: 'Dauerhaft glatte Haut für Gesicht und Körper, abgestimmt in einer persönlichen Beratung.',
    reihenfolge: 3,
  },
];

export const treatmentsFallback: Treatment[] = [
  {
    _id: 'behandlung-klassische-gesichtsbehandlung',
    titel: 'Klassische Gesichtsbehandlung',
    slug: { current: 'klassische-gesichtsbehandlung' },
    kategorie: treatmentCategoriesFallback[0],
    kurzbeschreibung:
      'Eine perfekte Kombination aus intensiver Hautpflege und wohltuender Entspannung: gründliche Reinigung, individuell abgestimmte Pflegeprodukte, intensive Feuchtigkeitsversorgung und eine entspannende Gesichtsmassage für ein frisches, strahlendes Hautbild.',
    reihenfolge: 1,
  },
  {
    _id: 'behandlung-tiefenreinigung',
    titel: 'Tiefenreinigung',
    slug: { current: 'tiefenreinigung' },
    kategorie: treatmentCategoriesFallback[0],
    kurzbeschreibung:
      'Überschüssiger Talg, abgestorbene Hautzellen und Unreinheiten werden schonend entfernt. Die gezielte Ausreinigung verstopfter Poren unterstützt ein ebenmäßigeres, verfeinertes Hautbild.',
    reihenfolge: 2,
  },
  {
    _id: 'behandlung-hydrafacial',
    titel: 'Hydrafacial',
    slug: { current: 'hydrafacial' },
    kategorie: treatmentCategoriesFallback[0],
    kurzbeschreibung:
      'Intensive Hautpflege trifft auf moderne Technologie: sanfte Hautabtragung, gründliche Reinigung und intensive Feuchtigkeitsversorgung in einer Behandlung.',
    reihenfolge: 3,
  },
  {
    _id: 'behandlung-diamant-mikrodermabrasion',
    titel: 'Diamant-Mikrodermabrasion',
    slug: { current: 'diamant-mikrodermabrasion' },
    kategorie: treatmentCategoriesFallback[0],
    kurzbeschreibung:
      'Mithilfe eines speziellen Diamantaufsatzes werden abgestorbene Hautzellen schonend abgetragen. Unterstützt die natürliche Hauterneuerung und kann feine Linien sowie Hautunregelmäßigkeiten verbessern.',
    reihenfolge: 4,
  },
  {
    _id: 'behandlung-microneedling-deluxe',
    titel: 'Microneedling Deluxe',
    slug: { current: 'microneedling-deluxe' },
    kategorie: treatmentCategoriesFallback[0],
    kurzbeschreibung:
      'Durch den gezielten Einsatz feinster Nadeln werden die natürlichen Regenerationsprozesse der Haut angeregt und die körpereigene Kollagen- und Elastinbildung unterstützt.',
    reihenfolge: 5,
  },
  {
    _id: 'behandlung-mesotherapie',
    titel: 'Mesotherapie',
    slug: { current: 'mesotherapie' },
    kategorie: treatmentCategoriesFallback[0],
    kurzbeschreibung: 'Ausgewählte Wirkstoffkomplexe tragen zur Pflege und intensiven Feuchtigkeitsversorgung der Haut bei.',
    reihenfolge: 6,
  },
  {
    _id: 'behandlung-lash-lifting',
    titel: 'Lash Lifting',
    slug: { current: 'lash-lifting' },
    kategorie: treatmentCategoriesFallback[1],
    kurzbeschreibung:
      'Natürlich schöne Wimpern mit elegantem Schwung: Ihre eigenen Wimpern werden sanft angehoben und für mehrere Wochen in Form gebracht – für einen offeneren, ausdrucksstärkeren Blick.',
    reihenfolge: 1,
  },
  {
    _id: 'behandlung-brow-lifting',
    titel: 'Brow Lifting',
    slug: { current: 'brow-lifting' },
    kategorie: treatmentCategoriesFallback[1],
    kurzbeschreibung:
      'Die natürlichen Brauenhärchen werden sanft in die gewünschte Form gebracht und fixiert – für vollere, gleichmäßigere und definierte Augenbrauen.',
    reihenfolge: 2,
  },
  {
    _id: 'behandlung-augenbrauenkorrektur',
    titel: 'Augenbrauenkorrektur',
    slug: { current: 'augenbrauenkorrektur' },
    kategorie: treatmentCategoriesFallback[1],
    kurzbeschreibung:
      'Präzise Korrektur überschüssiger Härchen – individuell angepasst an Ihre natürliche Gesichtsform für mehr Ausdruck und Harmonie.',
    reihenfolge: 3,
  },
  {
    _id: 'behandlung-pmu-combibrows',
    titel: 'Permanent Make-up: Combibrows',
    slug: { current: 'permanent-make-up-combibrows' },
    kategorie: treatmentCategoriesFallback[1],
    kurzbeschreibung:
      'Fein gezeichnete Härchen kombiniert mit sanfter Puderschattierung gleichen lichte Stellen optisch aus. Form und Farbton werden individuell auf Gesichtszüge und Haarfarbe abgestimmt.',
    reihenfolge: 4,
  },
  {
    _id: 'behandlung-pmu-lip-blushing',
    titel: 'Permanent Make-up: Lip Blushing',
    slug: { current: 'permanent-make-up-lip-blushing' },
    kategorie: treatmentCategoriesFallback[1],
    kurzbeschreibung:
      'Ausgewählte Farbpigmente intensivieren dezent die natürliche Lippenfarbe und betonen die Konturen – Form und Farbton ganz nach Ihren Wünschen.',
    reihenfolge: 5,
  },
  {
    _id: 'behandlung-laserhaarentfernung',
    titel: 'Laserhaarentfernung',
    slug: { current: 'laserhaarentfernung' },
    kategorie: treatmentCategoriesFallback[2],
    kurzbeschreibung:
      'Dauerhaft glatte Haut für verschiedene Körperbereiche – u. a. Gesicht/Hals, Arme, Achseln, Rücken, Bauch, Brust, Beine, Bikini- und Intimzone. Die passende Zone wählen wir gemeinsam bei der Beratung.',
    reihenfolge: 1,
  },
];

export const aboutPageFallback: AboutPage = {
  titel: 'Über uns',
  philosophieTitel: 'Unsere Philosophie',
  philosophieText:
    'Bei Marys Beauty legen wir besonderen Wert auf individuelle Beratung, sorgfältige Behandlung und natürlich wirkende Ergebnisse. Jede Anwendung wird unter Berücksichtigung Ihrer persönlichen Wünsche und Bedürfnisse ausgewählt.',
  team: [
    {
      _id: 'team-1',
      name: 'Mary',
      rolle: 'Inhaberin & Kosmetikerin',
      beschreibung:
        'Mit langjähriger Erfahrung und Leidenschaft für ihren Beruf legt Mary besonderen Wert auf individuelle Beratung, sorgfältige Behandlung und natürlich wirkende Ergebnisse.',
      reihenfolge: 1,
    },
  ],
};

export const galleryPageFallback: GalleryPage = {
  titel: 'Galerie',
  einleitung: 'Ein Einblick in unser Studio und unsere Arbeit.',
};

export const contactPageFallback: ContactPage = {
  titel: 'Kontakt',
  einleitung: 'Wir freuen uns auf Ihre Nachricht oder Ihren Anruf.',
};

const impressumPlatzhalter = `## Angaben gemäß § 5 TMG

**[PLATZHALTER – bitte durch echte Angaben ersetzen]**

Marys Beauty
Kirchstraße 11
48282 Emsdetten

Vertreten durch: Mary [Nachname PLATZHALTER]

**Kontakt**
Telefon: 0171 1009917
E-Mail: marysbeautyco7@gmail.com

**Umsatzsteuer-ID**
[PLATZHALTER – USt-IdNr. gemäß §27a Umsatzsteuergesetz]

**Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV**
Mary [Nachname PLATZHALTER], Kirchstraße 11, 48282 Emsdetten

---

Dies ist eine unverbindliche Musterstruktur und ersetzt keine rechtliche Prüfung.
Bitte durch eine rechtssichere Fassung (z. B. über einen Impressum-Generator oder
eine Rechtsberatung) ersetzen lassen.`;

const datenschutzPlatzhalter = `**[PLATZHALTER – bitte durch eine rechtlich geprüfte Fassung ersetzen]**

Diese Webseite nutzt Cloudflare Pages zum Hosting, Sanity als Content-Management-System
sowie ggf. Planity als externen Buchungsdienst. Beim Besuch dieser Seiten können
technisch notwendige Daten (z. B. IP-Adresse, Zugriffszeit) verarbeitet werden.

**Verantwortlicher**
Marys Beauty, Kirchstraße 11, 48282 Emsdetten, marysbeautyco7@gmail.com

**Hosting**
Diese Website wird bei Cloudflare, Inc. gehostet. Weitere Informationen:
https://www.cloudflare.com/privacypolicy/

**Externe Terminbuchung (Planity)**
Für die Online-Terminbuchung wird auf den externen Dienst Planity verlinkt bzw. ein
Planity-Modul eingebunden. Beim Aufruf der Buchungsseite gelten die Datenschutzbestimmungen
von Planity.

**Ihre Rechte**
Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
Datenübertragbarkeit und Widerspruch gemäß Art. 15–21 DSGVO.

---

Dies ist eine unverbindliche Musterstruktur und ersetzt keine rechtliche Prüfung.
Bitte durch eine individuell geprüfte, rechtssichere Datenschutzerklärung ersetzen lassen.`;

export const legalPagesFallback: Record<string, LegalPage> = {
  impressum: {
    _id: 'legal-impressum',
    titel: 'Impressum',
    slug: { current: 'impressum' },
    inhalt: impressumPlatzhalter,
  },
  datenschutz: {
    _id: 'legal-datenschutz',
    titel: 'Datenschutzerklärung',
    slug: { current: 'datenschutz' },
    inhalt: datenschutzPlatzhalter,
  },
};

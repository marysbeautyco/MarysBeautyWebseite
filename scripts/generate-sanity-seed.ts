// Erzeugt aus src/lib/content.ts den Startdatensatz für Sanity:
//   node scripts/generate-sanity-seed.ts
// Import (siehe README, Abschnitt 5):
//   cd studio && npx sanity dataset import seed/initial-content.ndjson production --missing
import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  aboutPageFallback,
  contactPageFallback,
  galleryPageFallback,
  homePageFallback,
  legalPagesFallback,
  siteSettingsFallback,
  treatmentCategoriesFallback,
  treatmentsFallback,
} from '../src/lib/content.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const seedDir = join(root, 'studio', 'seed');
const logoName = 'marys-beauty-logo-espresso.png';

const key = () => randomBytes(6).toString('hex');
const slug = (current: string) => ({ _type: 'slug', current });

/** Einfacher Text (## Überschrift, **fett**, Leerzeile = Absatz) als Portable Text. */
function toBlocks(text: string) {
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block && block !== '---')
    .map((block) => {
      const heading = block.startsWith('## ');
      const raw = heading ? block.slice(3) : block;
      const children = raw.split('\n').flatMap((zeile, index, zeilen) => {
        const fett = zeile.match(/^\*\*(.+)\*\*$/);
        const textValue = (fett ? fett[1] : zeile) + (index < zeilen.length - 1 ? '\n' : '');
        return [{ _type: 'span', _key: key(), text: textValue, marks: fett ? ['strong'] : [] }];
      });
      return { _type: 'block', _key: key(), style: heading ? 'h2' : 'normal', markDefs: [], children };
    });
}

const settings = siteSettingsFallback;
const teamMembers = aboutPageFallback.team ?? [];

const documents: Record<string, unknown>[] = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    studioName: settings.studioName,
    claim: settings.claim,
    logo: { _type: 'image', _sanityAsset: `image@file://./assets/${logoName}`, alt: 'Logo Marys Beauty' },
    adresse: { _type: 'address', ...settings.adresse },
    telefon: settings.telefon,
    email: settings.email,
    oeffnungszeiten: settings.oeffnungszeiten.map((z) => ({ _type: 'openingHoursEntry', _key: key(), ...z })),
    socialLinks: settings.socialLinks?.map((l) => ({ _type: 'socialLink', _key: key(), ...l })),
    kartenlink: settings.kartenlink,
  },
  {
    _id: 'homePage',
    _type: 'homePage',
    ...homePageFallback,
    vorteile: homePageFallback.vorteile?.map((v) => ({ _type: 'vorteil', _key: key(), ...v })),
  },
  ...treatmentCategoriesFallback.map((k) => ({
    ...k,
    _type: 'treatmentCategory',
    slug: slug(k.slug.current),
  })),
  ...treatmentsFallback.map((t) => ({
    ...t,
    _type: 'treatment',
    slug: slug(t.slug.current),
    kategorie: t.kategorie ? { _type: 'reference', _ref: t.kategorie._id } : undefined,
  })),
  ...teamMembers.map((m) => ({ ...m, _type: 'teamMember' })),
  {
    _id: 'aboutPage',
    _type: 'aboutPage',
    titel: aboutPageFallback.titel,
    philosophieTitel: aboutPageFallback.philosophieTitel,
    philosophieText: toBlocks(String(aboutPageFallback.philosophieText)),
    team: teamMembers.map((m) => ({ _type: 'reference', _key: key(), _ref: m._id })),
  },
  { _id: 'galleryPage', _type: 'galleryPage', ...galleryPageFallback },
  { _id: 'contactPage', _type: 'contactPage', ...contactPageFallback },
  ...Object.entries(legalPagesFallback).map(([name, seite]) => ({
    _id: `legalPage-${name}`,
    _type: 'legalPage',
    titel: seite.titel,
    slug: slug(name),
    inhalt: toBlocks(String(seite.inhalt)),
  })),
];

for (const t of treatmentsFallback) {
  if (t.kurzbeschreibung.length > 280) {
    throw new Error(`Kurzbeschreibung von "${t.titel}" überschreitet das Studio-Limit von 280 Zeichen.`);
  }
}

mkdirSync(join(seedDir, 'assets'), { recursive: true });
copyFileSync(join(root, 'public', 'brand', logoName), join(seedDir, 'assets', logoName));
writeFileSync(join(seedDir, 'initial-content.ndjson'), documents.map((d) => JSON.stringify(d)).join('\n') + '\n');
console.log(`${documents.length} Dokumente nach studio/seed/initial-content.ndjson geschrieben.`);

import type { SiteSettings, SocialLink } from '../types/sanity';

export const socialLabels: Record<SocialLink['plattform'], string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
  youtube: 'YouTube',
};

/** Wandelt eine deutsche Rufnummer in die internationale Form +49… um. */
export function telefonInternational(telefon: string) {
  const ziffern = telefon.replace(/[^+\d]/g, '');
  if (ziffern.startsWith('+')) return ziffern;
  if (ziffern.startsWith('00')) return `+${ziffern.slice(2)}`;
  if (ziffern.startsWith('0')) return `+49${ziffern.slice(1)}`;
  return ziffern;
}

export function telefonHref(telefon: string) {
  return `tel:${telefonInternational(telefon)}`;
}

export function emailHref(email: string) {
  return `mailto:${email}`;
}

/** Sichtbarer Linktext, bei Instagram der @-Name aus der URL. */
export function socialLinkText(link: SocialLink) {
  if (link.plattform === 'instagram') {
    const name = link.url.replace(/\/+$/, '').split('/').pop();
    if (name) return `@${name}`;
  }
  return socialLabels[link.plattform] ?? link.plattform;
}

export function adresseEinzeilig(settings: SiteSettings) {
  return `${settings.adresse.strasse}, ${settings.adresse.plz} ${settings.adresse.ort}`;
}

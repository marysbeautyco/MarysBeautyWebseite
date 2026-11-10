import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImage } from '../types/sanity';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';

const builder =
  projectId && projectId !== 'xxxxxxxx' ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * Erstellt eine optimierte Bild-URL aus einem Sanity-Bildobjekt.
 * Gibt bei fehlender Sanity-Konfiguration null zurück, damit Komponenten
 * auf ein Platzhalterbild zurückfallen können.
 */
export function urlFor(image: SanityImage | undefined | null, width = 1600) {
  if (image?.asset?._id === 'lokal') {
    return width <= 640 ? image.asset.url.replace(/\.webp$/, '-640.webp') : image.asset.url;
  }
  if (!builder || !image?.asset) return null;
  return builder.image(image).width(width).fit('max').auto('format').url();
}

export function getImageAlt(image: SanityImage | undefined | null, fallback: string) {
  return image?.alt?.trim() || fallback;
}

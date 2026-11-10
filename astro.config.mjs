// @ts-check
import { rename, rm } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Basis für Sitemap, robots.txt, Canonical-Links und Open-Graph-Tags.
const siteUrl = 'https://marysbeautyco.de';

// @astrojs/sitemap schreibt immer sitemap-index.xml plus sitemap-0.xml. Für diese
// Seite reicht eine einzige Datei, die direkt unter /sitemap.xml alle Seiten listet.
/** @type {import('astro').AstroIntegration} */
const einzelneSitemap = {
  name: 'einzelne-sitemap',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await rename(new URL('sitemap-0.xml', dir), new URL('sitemap.xml', dir));
      await rm(new URL('sitemap-index.xml', dir));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [sitemap(), einzelneSitemap],
  image: {
    // Hochwertige, aber kleine responsive Bilder für ein schnelles, SEO-freundliches Ergebnis.
    responsiveStyles: true,
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
    build: {
      // Skripte nie inline ausgeben: Die Content-Security-Policy in public/_headers
      // erlaubt mit script-src 'self' nur Skripte aus eigenen Dateien.
      assetsInlineLimit: 0,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Bootstrap 5.3 nutzt noch alte Sass-Farbfunktionen (red()/green()/blue()
          // und @import). Das ist ein bekanntes, harmloses Upstream-Thema von
          // Bootstrap selbst – wir unterdrücken nur die Warnungen, nicht die Fehler.
          silenceDeprecations: ['color-functions', 'import', 'global-builtin'],
          quietDeps: true,
        },
      },
    },
  },
});

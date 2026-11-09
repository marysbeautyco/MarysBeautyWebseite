// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.PUBLIC_SITE_URL || 'https://www.beispiel-kosmetikstudio.de';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [sitemap()],
  image: {
    // Hochwertige, aber kleine responsive Bilder für ein schnelles, SEO-freundliches Ergebnis.
    responsiveStyles: true,
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
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

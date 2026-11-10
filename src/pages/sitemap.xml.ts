import type { APIRoute } from 'astro';

// Feste Adresse /sitemap.xml für die Google Search Console. Die eigentliche
// Seitenliste erzeugt @astrojs/sitemap beim Build als sitemap-0.xml.
export const GET: APIRoute = ({ site }) => {
  const seitenliste = new URL('sitemap-0.xml', site).toString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${seitenliste}</loc></sitemap>
</sitemapindex>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

import type { MetadataRoute } from 'next';
import config from '@/config';
import { source } from '@/lib/source';

// Static, so the GitHub Pages export writes it to out/sitemap.xml.
export const dynamic = 'force-static';

// metadataBase carries the base path: URLs are resolved relative to it ("./docs/…"), since an
// absolute "/docs/…" would drop it. The trailing slash matches the canonical of the export.
const SITE_URL = config.metadata.metadataBase.href;
const toUrl = (route: string) =>
  new URL(`.${route === '/' || route.endsWith('/') ? route : `${route}/`}`, SITE_URL).href;

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...source.getPages().map((page) => page.url)].map((route) => ({
    url: toUrl(route),
  }));
}

import type { MetadataRoute } from 'next';
import config from '@/config';
import { source } from '@/lib/source';

// Static, so the GitHub Pages export writes it to out/sitemap.xml.
export const dynamic = 'force-static';

// metadataBase carries the base path: URLs are resolved relative to it ("./docs/…"), since an
// absolute "/docs/…" would drop it. Only the static export has trailing slashes
// (next.config.mjs); on a server "/docs/api/" would answer with a redirect.
const SITE_URL = config.metadata.metadataBase.href;
const TRAILING_SLASH = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';
const toUrl = (route: string) =>
  new URL(
    `.${route === '/' || route.endsWith('/') || !TRAILING_SLASH ? route : `${route}/`}`,
    SITE_URL
  ).href;

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...source.getPages().map((page) => page.url)].map((route) => ({
    url: toUrl(route),
  }));
}

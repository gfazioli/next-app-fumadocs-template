import { createFromSource } from 'fumadocs-core/search/server';
import config from '@/config';
import { source } from '@/lib/source';

/**
 * Orama-powered search endpoint (built from the docs source at startup).
 *
 * - default (Vercel/Node): dynamic route handler, the index stays server-side
 *   and the client queries it via `useDocsSearch({ type: 'fetch' })`
 * - NEXT_PUBLIC_STATIC_EXPORT=1 (GitHub Pages): the whole index is
 *   pre-rendered as a static file and queried in the browser via
 *   `useDocsSearch({ type: 'static' })`
 *
 * @see https://www.fumadocs.dev/docs/headless/search/orama
 */
const server = createFromSource(source, {
  language: config.search.language,
});

export const GET = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1' ? server.staticGET : server.GET;

import { createFromSource } from 'fumadocs-core/search/server';
import config from '@/config';
import { source } from '@/lib/source';

/**
 * Orama-powered search endpoint (built from the docs source at startup).
 *
 * Client side: `useDocsSearch({ type: 'fetch' })` from `fumadocs-core/search/client`.
 * For a fully static export, switch to `staticGET` and the `static` client type.
 *
 * @see https://www.fumadocs.dev/docs/headless/search/orama
 */
export const { GET } = createFromSource(source, {
  language: config.search.language,
});

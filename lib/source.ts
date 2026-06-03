import { loader } from 'fumadocs-core/source';
import { docs } from 'collections/server';

/**
 * Content source: turns the fumadocs-mdx collections into page slugs,
 * URLs and the page tree consumed by the docs UI.
 *
 * NOTE: the loader is a server-side API. To use the page tree in client
 * components, serialize it with `source.serializePageTree()`.
 *
 * @see https://www.fumadocs.dev/docs/headless/source-api
 */
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

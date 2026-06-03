import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

/**
 * Content collections for the docs.
 *
 * `defineDocs` creates a `doc` collection (MDX pages) and a `meta` collection
 * (meta.json files controlling sidebar order/labels) over the same directory.
 *
 * @see https://www.fumadocs.dev/docs/mdx
 */
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig();

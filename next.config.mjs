import bundleAnalyzer from '@next/bundle-analyzer';
import { createMDX } from 'fumadocs-mdx/next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * fumadocs-mdx: compiles `content/docs` into the generated `.source` folder
 * (wired for both Turbopack and webpack) and registers the MDX page extensions.
 */
const withMDX = createMDX();

/**
 * Dual deploy mode:
 * - default: server build (Vercel, Node) with dynamic API routes
 * - NEXT_PUBLIC_STATIC_EXPORT=1: fully static export for GitHub Pages —
 *   static Orama search index, no dynamic API routes, optional basePath
 *   via NEXT_PUBLIC_BASE_PATH (e.g. "/next-app-fumadocs-template").
 */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default withMDX(
  withBundleAnalyzer({
    ...(isStaticExport && {
      output: 'export',
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }),
    reactStrictMode: false,
    cleanDistDir: true,
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['turbopack-inline-svg-loader'],
          condition: {
            content: /^[\s\S]{0,4000}$/, // <-- Inline SVGs smaller than ~4Kb (since Next.js v16)
          },
          as: '*.js',
        },
      },
    },
  })
);

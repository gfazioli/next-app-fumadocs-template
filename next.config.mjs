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

export default withMDX(
  withBundleAnalyzer({
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

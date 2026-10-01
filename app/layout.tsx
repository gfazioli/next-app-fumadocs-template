import '@mantine/core/styles.css';
// !! The order of these imports is important !!
import '@mantine/spotlight/styles.css';
import '@gfazioli/mantine-border-animate/styles.css';
import '@gfazioli/mantine-marquee/styles.css';
import '@gfazioli/mantine-text-animate/styles.css';
// Mantine theme overrides (page background, heading font)
import '@/theme/global.css';

import { Analytics } from '@vercel/analytics/react';
import { NextProvider } from 'fumadocs-core/framework/next';
import { Outfit } from 'next/font/google';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
// !! End of important imports !!

import { MantineFooter, MantineNavBar } from '@/components';
import { DocsSearch } from '@/components/docs/DocsSearch';
import config from '@/config';
import { theme } from '../theme';

import './global.css';

export const metadata = config.metadata;

// The type of mantine.dev: Outfit for headings (self-hosted and preloaded by Next), the system
// stack for everything else, which is Mantine's default and costs no download at all.
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { head } = config;

  return (
    <html lang="en" dir="ltr" className={outfit.variable} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript
          nonce={head.mantine.nonce}
          defaultColorScheme={head.mantine.defaultColorScheme}
        />
        <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`} />
      </head>
      <body>
        <NextProvider>
          <MantineProvider theme={theme} defaultColorScheme={head.mantine.defaultColorScheme}>
            <MantineNavBar />
            {children}
            <MantineFooter />
            <DocsSearch />
          </MantineProvider>
        </NextProvider>
        <Analytics />
      </body>
    </html>
  );
}

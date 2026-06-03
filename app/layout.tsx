import '@mantine/core/styles.css';
// !! The order of these imports is important !!
import '@mantine/spotlight/styles.css';
import '@gfazioli/mantine-marquee/styles.css';
import '@gfazioli/mantine-text-animate/styles.css';
// Mantine theme overrides (body background, marquee fade edges, etc.)
import '@/theme/global.css';

import { Analytics } from '@vercel/analytics/react';
import { NextProvider } from 'fumadocs-core/framework/next';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
// !! End of important imports !!

import { MantineFooter, MantineNavBar } from '@/components';
import { DocsSearch } from '@/components/docs/DocsSearch';
import config from '@/config';
import { theme } from '../theme';

import './global.css';

export const metadata = config.metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { head } = config;

  return (
    <html lang="en" dir="ltr" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript
          nonce={head.mantine.nonce}
          defaultColorScheme={head.mantine.defaultColorScheme}
        />
        <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
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

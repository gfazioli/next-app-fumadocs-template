export default {
  /**
   * Next.js Metadata configuration
   * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   */
  metadata: {
    title: {
      default: 'Mantine Next.js and Fumadocs template',
      template: '%s | Mantine Next.js and Fumadocs template',
    },
    description: 'I am using Mantine with Next.js and Fumadocs!',
    metadataBase: new URL('https://next-app-fumadocs-template.vercel.app/'),
    keywords: [
      'Mantine',
      'Fumadocs',
      'Next.js',
      'React',
      'JavaScript',
      'MDX',
      'Markdown',
      'Static Site Generator',
    ],
    generator: 'Next.js',
    applicationName: 'Mantine',
    appleWebApp: {
      title: 'Mantine',
    },
    openGraph: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      url: './',
      siteName: 'Mantine',
      locale: 'en_US',
      type: 'website',
    },
    other: {
      'msapplication-TileColor': '#fff',
    },
    twitter: {
      site: 'https://next-app-fumadocs-template.vercel.app/',
    },
    alternates: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      canonical: './',
    },
  },
  /**
   * Docs layout configuration
   */
  docsLayout: {
    docsRepositoryBase:
      'https://github.com/gfazioli/next-app-fumadocs-template/tree/main/content/docs/',
  },
  /**
   * Main Layout head configuration
   */
  head: {
    mantine: {
      defaultColorScheme: 'dark',
      nonce: '8IBTHwOdqNKAWeKl7plt8g==',
    },
  },
  /**
   * GitHub API configuration
   * @see https://docs.github.com/en/rest/reference/repos#releases
   *
   * The GitHub API token is optional for rate limiting.
   * If you want to use it, create a personal access token with the `repo` scope.
   *
   * This information is used to fetch the releases from the GitHub API.
   */
  gitHub: {
    repo: 'gfazioli/next-app-fumadocs-template',
    apiUrl: 'https://api.github.com',
    releasesUrl: 'https://api.github.com/repos/gfazioli/next-app-fumadocs-template/releases',
  },

  /**
   * Release notes configuration
   * This is used to link the release notes in the app.
   */
  releaseNotes: {
    url: 'https://github.com/gfazioli/next-app-fumadocs-template/releases',
    maxReleases: 10,
  },

  /**
   * Search configuration (Orama via fumadocs-core)
   * @see /app/api/search/route.ts
   *
   * `filters` drives the Filter row of the search dialog: each entry
   * matches results whose URL starts with one of the prefixes
   * (empty prefixes = no filtering).
   */
  search: {
    language: 'english',
    filters: [
      { label: 'All', prefixes: [] as string[] },
      { label: 'Guides', prefixes: ['/docs/guides'] },
      { label: 'Examples', prefixes: ['/docs/mantine', '/docs/inline-svg'] },
      { label: 'Reference', prefixes: ['/docs/api', '/docs/versioning'] },
    ],
  },
} as const;

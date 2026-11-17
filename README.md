# Mantine Next.js + Fumadocs template

<div align="center">
  <p><img src="https://raw.githubusercontent.com/gfazioli/gfazioli/master/glancecard/next-app-fumadocs-template.svg" width="880" alt="next-app-fumadocs-template at a glance, refreshed daily: commits, releases, stars, issues and pull requests, a year of commit activity, the weekly rhythm, languages, latest commits and releases, contributors" /><br>
  <sub>Made with <a href="https://github.com/gfazioli/glancecard">glancecard</a> · refreshed daily</sub></p>
</div>

A [Next.js](https://nextjs.org/) App Router template for documentation sites, on [Mantine](https://mantine.dev/) and [Fumadocs](https://www.fumadocs.dev/).

**The engine is headless Fumadocs**: `fumadocs-core` and `fumadocs-mdx` handle the content, the page tree and the search index, and the docs UI on top of them is built **100% with Mantine**. No Tailwind, no third-party docs theme, a single styling system for the whole app: change `primaryColor` in `theme.ts` and the entire docs UI follows.

**[Live demo](https://gfazioli.github.io/next-app-fumadocs-template/)** · [Documentation](https://gfazioli.github.io/next-app-fumadocs-template/docs) · [Release notes](https://github.com/gfazioli/next-app-fumadocs-template/releases) · [Mantine Extensions Hub](https://mantine-extensions.vercel.app/)

<div align="center">

[<kbd> <br/> ❤️ If this template has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

## One design, three engines

The same Mantine starter comes on three documentation engines: the same landing page, the same footer and the same Mantine look. What changes is what compiles and serves the docs.

| Template | Engine | Live demo |
| --- | --- | --- |
| [Mantine Next.js + Docs](https://github.com/gfazioli/next-app-mantine-docs-template) | [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx): no docs framework, every piece of the interface a Mantine component | [next-app-mantine-docs-template.vercel.app](https://next-app-mantine-docs-template.vercel.app/) |
| [Mantine Next.js + Nextra](https://github.com/gfazioli/next-app-nextra-template) | [Nextra 4](https://nextra.site/) and its docs theme, with Mantine wired in | [next-app-nextra-template.vercel.app](https://next-app-nextra-template.vercel.app/) |
| **Mantine Next.js + Fumadocs** (this one) | headless [`fumadocs-core`](https://www.fumadocs.dev/) under a docs UI built 100% with Mantine | [gfazioli.github.io/next-app-fumadocs-template](https://gfazioli.github.io/next-app-fumadocs-template/) |

Looking for components to put in your docs? The [Mantine Extensions Hub](https://mantine-extensions.vercel.app/) lists the same author's open-source extensions for Mantine.

## Quick start

```bash
git clone https://github.com/gfazioli/next-app-fumadocs-template.git my-docs
cd my-docs
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000): the landing page is at `/`, the documentation at `/docs`. Add pages in `content/docs` and order them in `content/docs/meta.json`.

**Requirements**: Node.js 24 (see `.nvmrc`) and Yarn 4, which the repository pins: do not use npm or pnpm.

## Features

This template comes with the following features:

- [Next.js 16](https://nextjs.org/) with App Router and Turbopack
- [Mantine 9](https://mantine.dev/) UI component library
- [Fumadocs](https://www.fumadocs.dev/) headless documentation engine (`fumadocs-core` + `fumadocs-mdx`)
- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript 6](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting
- [oxfmt](https://oxc.rs/docs/guide/usage/formatter) for formatting
- [Orama](https://oramasearch.com/) full-text search served by `/api/search`
- Turbopack inline SVG loader [turbopack-inline-svg-loader](https://github.com/vitalets/turbopack-inline-svg-loader)

## Fumadocs + Mantine Features

- Docs UI entirely built with Mantine: **collapsible sidebar** with built-in search box, section labels, collapsible folders with guide rail, mobile drawer
- **Clerk-style table of contents**: an SVG thread following the heading depth with smooth curves, and a primary-colored indicator sliding along it to the visible headings
- Search dialog with [Mantine Spotlight](https://mantine.dev/x/spotlight/) (`⌘K`), fed by the headless `useDocsSearch` hook, highlighted matches rendered with Mantine Mark
- Per-page chrome: breadcrumbs, previous/next navigation, divider-separated header
- Build-time syntax highlighting (Shiki) with light/dark themes following the Mantine color scheme, code titles, line highlighting and line numbers
- GitHub alert syntax (`> [!NOTE]`) rendered with Mantine Alert
- Mantine-native MDX components: Callout, Steps, FileTree, fully-styled tables — all customizable in `components/mdx`
- Single source of truth for dark mode: Mantine color scheme manager (no `next-themes`)
- GitHub Release Notes integration via API
- A landing page and a footer shared with the two sibling templates, with the versions of the stack read from `package.json` at build time

## Folder structure

- `app` – Next.js App Router pages, layouts, and API routes
- `components` – shared components, including `components/docs` (docs shell) and `components/mdx` (MDX map)
- `components/Home` – the landing page, section by section
- `content/docs` – documentation content (`.mdx` files and `meta.json` for sidebar order; `guides/` shows the folder convention)
- `config` – centralized site configuration (metadata, GitHub API, search); `config/site.ts` says which of the three templates this is
- `lib/source.ts` – the fumadocs content source (loader)
- `source.config.ts` – fumadocs-mdx collections and schemas

The shipped documentation doubles as a feature tour: Getting Started, MDX Components showcase, Customize UI and Search guides.

## Why headless (no Tailwind)?

`fumadocs-ui` — the official theme — is built on Tailwind CSS v4. Pairing it with Mantine means maintaining two styling systems and reconciling their cascade layers. This template instead consumes only the headless `fumadocs-core` (page tree, TOC scroll-spy, breadcrumbs, search — zero styling opinions) and paints everything with Mantine. One design system, one theme, no conflicts — and the docs UI lives in your repo as plain React + Mantine code you can freely edit.

## Scripts

- `dev` – the dev server
- `build` – the production build
- `build:static` – a static export to `out/` (GitHub Pages), with a pre-rendered search index
- `analyze` – bundle analysis with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- `test` – fumadocs-mdx codegen, typegen, formatting, lint, types and Jest
- `typecheck`, `lint`, `jest`, `jest:watch`, `format:test`, `format:write`
- `storybook`, `storybook:build`

## Deploy

- **GitHub Pages** (fully static — this is how the live demo is hosted): `yarn build:static` produces a static export with a pre-rendered Orama search index; the bundled `.github/workflows/deploy-pages.yml` workflow publishes it on every push to `main`. Release notes are fetched by the browser directly from the GitHub API.
- **Vercel / Node**: import the repo and deploy — the search API turns dynamic (the client stays lightweight) and the GitHub releases go through the bundled proxy with optional token.

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this template has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates
- Add new features, improve performance, and refine the developer experience
- Expand test coverage and documentation for smoother adoption
- Ensure long‑term sustainability without relying on ad hoc free time
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

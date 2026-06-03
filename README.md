# Mantine Next.js + Fumadocs template

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

This is a template for a [Next.js](https://nextjs.org/) App Router + [Mantine](https://mantine.dev/) + [Fumadocs](https://www.fumadocs.dev/) documentation site.

The docs UI is built **100% with Mantine** on top of the headless `fumadocs-core` — no Tailwind, no third-party docs theme, a single styling system for the whole app. Change `primaryColor` in `theme.ts` and the entire docs UI follows.

> Looking for the [Nextra](https://nextra.site/) flavor? Check out the sibling template [next-app-nextra-template](https://github.com/gfazioli/next-app-nextra-template).

## Quick start

```bash
git clone https://github.com/gfazioli/next-app-fumadocs-template my-docs
cd my-docs
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) — the landing page lives at `/`, the documentation at `/docs`. Add pages in `content/docs` and order them in `content/docs/meta.json`.

**Requirements**: Node.js ≥ 24, Yarn 4 (bundled — do not use npm or pnpm).

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

## Folder structure

- `app` – Next.js App Router pages, layouts, and API routes
- `components` – shared components, including `components/docs` (docs shell) and `components/mdx` (MDX map)
- `content/docs` – documentation content (`.mdx` files and `meta.json` for sidebar order; `guides/` shows the folder convention)
- `config` – centralized site configuration (metadata, GitHub API, search)
- `lib/source.ts` – the fumadocs content source (loader)
- `source.config.ts` – fumadocs-mdx collections and schemas

The shipped documentation doubles as a feature tour: Getting Started, MDX Components showcase, Customize UI and Search guides.

## Why headless (no Tailwind)?

`fumadocs-ui` — the official theme — is built on Tailwind CSS v4. Pairing it with Mantine means maintaining two styling systems and reconciling their cascade layers. This template instead consumes only the headless `fumadocs-core` (page tree, TOC scroll-spy, breadcrumbs, search — zero styling opinions) and paints everything with Mantine. One design system, one theme, no conflicts — and the docs UI lives in your repo as plain React + Mantine code you can freely edit.

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs oxlint and Stylelint
- `format:test` – checks files with oxfmt
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `format:test`, `lint`, `typecheck` and `jest` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `format:write` – formats all files with oxfmt

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

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

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/next-app-fumadocs-template&type=Timeline)](https://www.star-history.com/#gfazioli/next-app-fumadocs-template&Timeline)

</div>

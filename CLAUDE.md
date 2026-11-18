# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16 + Mantine 9 + Fumadocs (headless)** template: a documentation-site starter whose docs UI is built **100% with Mantine** on top of `fumadocs-core` — no Tailwind, no fumadocs-ui, no next-themes. It is the Fumadocs sibling of `next-app-nextra-template`.

## Commands

| Command | Purpose |
|---------|---------|
| `yarn dev` | Start Next.js dev server |
| `yarn build` | Production build |
| `yarn test` | Full suite: fumadocs-mdx codegen, typegen, oxfmt, lint, typecheck, jest |
| `yarn jest` | Run Jest tests only |
| `yarn jest -- path/to/file` | Run a single test file |
| `yarn typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `yarn lint` | oxlint + Stylelint |
| `yarn format:write` | Auto-format all TS/TSX/CSS files (oxfmt) |
| `yarn storybook` | Storybook dev server on port 6006 |
| `yarn analyze` | Bundle analysis with `@next/bundle-analyzer` |

## Architecture

### Content pipeline (fumadocs)

- `source.config.ts` — fumadocs-mdx collections over `content/docs` (schemas from `fumadocs-core/source/schema`, Zod 4)
- `next.config.mjs` — `createMDX()` from `fumadocs-mdx/next` (wires Turbopack + webpack)
- `.source/` — **generated** by fumadocs-mdx (gitignored, created by the `postinstall` script); imported via the tsconfig path alias `collections/*`
- `lib/source.ts` — the `loader()` content source: page slugs, URLs, page tree
- `app/docs/[[...slug]]/page.tsx` — catch-all docs route: `getPage` + `generateStaticParams` + per-page chrome
- Sidebar order/labels: `content/docs/meta.json`; page title/description: MDX frontmatter (required by schema)

### Docs UI (100% Mantine)

- `components/docs/DocsShell` — sidebar (recursive `NavLink` tree) + mobile `Drawer`; the page tree is serialized server-side (`source.serializePageTree`) and rehydrated client-side (`deserializePageTree`)
- `components/docs/Toc` — scroll-spy TOC on `fumadocs-core/toc` primitives (`AnchorProvider`/`TOCItem`), styled via `[data-active]`
- `components/docs/PageFooter` — prev/next from `findNeighbour`
- `components/docs/DocsSearch` — Mantine Spotlight fed by `useDocsSearch`: `type: 'fetch'` on a server build, `type: 'static'` (the exported index) when `NEXT_PUBLIC_STATIC_EXPORT=1`; trigger in the navbar, shortcut `mod+K`
- `components/mdx/` — the MDX component map (`getMDXComponents`): headings, links, tables, CodeBlock (build-time Shiki + copy button), GitHub-alert blockquotes, Callout, Steps, FileTree

### RSC gotchas (learned the hard way)

- `next/link` is a *shared* component: do NOT pass it as a `component` prop to Mantine components from a server component — use `fumadocs-core/link` (which is `'use client'`) instead, or `@/components/Link/Link` (the same re-export the sibling templates have, used by the shared home page)
- Compound components with static properties (`FileTree.Folder`) cannot cross the RSC boundary as client references — the compound object is assembled in the server module `components/mdx/index.tsx`
- The loader is server-only; `source.serializePageTree()` is async

### Theming

- Mantine color scheme manager only (`MantineProvider` + `ColorSchemeScript`); no next-themes. **Light by default** (`head.mantine.defaultColorScheme` in `config/index.ts`, and the `useComputedColorScheme` fallback in `ColorSchemeControl`); a stored choice beats the default, so check it in a private window
- Shiki dual themes are driven by `[data-mantine-color-scheme]` in `app/global.css` (CSS vars `--shiki-light/dark`)
- **The mantine.dev look** (since 2026-10-01, the same as the Mantine Extensions hub): Outfit for headings through `next/font` (`--font-outfit`, read by `theme.ts`), Mantine's system stack for text, and the page on Mantine's body colours (`#fff` / `#242424`) from `theme/global.css`. Keep accents on primary tokens (`--mantine-primary-color-light`, `--mantine-color-anchor`) rather than hard-coded blue, so changing `primaryColor` still re-colours the docs UI; the TOC uses the anchor colour because primary-filled is shade 8 in dark mode, 3.09:1 on the page
- **No global Button override**: `theme/global.css` used to turn every `.mantine-Button-root` into a pill with a hover scale, beating the `radius` prop. Buttons now render with Mantine's own radius and variants

### The home page and the site footer (shared with the sibling templates)

- **The same files in the three templates** (`next-app-mantine-docs-template`, `next-app-nextra-template`, `next-app-fumadocs-template`): `components/Home/`, `components/Motion/`, `components/Sponsors/`, `components/MantineFooter/`, `components/Link/`, `config/templates.ts` and `theme/site.css`. Change them in all three together and compare with `diff -r`. `config/site.ts` is the one line that says which template a repository is; everything that differs (engine name, its colours, repository and demo links, the features) is read from it.
- **`HomePage`** is a server component and renders no `<main>`: `app/page.tsx` or the engine's layout provides it. Its sections: `Hero` (with `DocsWindow`, a docs page drawn in CSS), `Stack`, `Features`, `Templates`, `Extensions`, `Sponsors`, `FinalCta`. The look is a blueprint: graph paper at the top of the page (fine lines, a heavier one every fifth; `.page::before`, whole through the hero and the stack, then covered little by little by a gradient of the paper's own colour until the page is plain), a registration mark at each corner of every drawing (`home.marks`: the hero's sheet, the stack, a group of cards, the closing call), labels in monospace capitals, dimension lines on the hero's window and line drawings in the cards (`Sketch`, inline SVG) — all CSS or inline SVG, painted once. Colours come from `theme/site.css` (`--site-*`, on `body` because of `light-dark()`); `data-site-paper` on the page's root element switches the whole document to paper through `:root:has()` (a pale paper in light, a deep one in dark: `--mantine-color-body`, the dark default-variant colours and the `--site-*` tokens), so the header and the footer follow and every other page keeps Mantine's colours. The attribute's value is which paper, and it is what tells the three templates apart: `paper` in `config/templates.ts` (`orange` here, `blue` for Docs, `violet` for Nextra), each a set of the same tokens in `theme/site.css` (paper, ink, `--site-fill` for filled buttons and tags, `--site-tint`, the heading gradient); `beam` there is the two colours of the light on a rim. Same layout on all three. `Sponsors` and `MantineFooter` are client components on purpose: as server components their links and icon paths were sent twice in every document, as markup and again in the RSC payload (7 KiB gzipped on the home page, 5 on every docs page).
- **Live numbers** (`components/Home/stats.ts`): each template card shows its repository's GitHub stars, the hero a "Star" link to this template's own repository with the same count (`stats.stars[site.key]`: no second request; without a count the link stays, with no figure), the Extensions section the npm downloads of the last month summed over the listed `@gfazioli/mantine-*` packages (one request per package: npm's bulk endpoint refuses scoped names). `getHomeStats()` runs on the server with `next: { revalidate: 3600 }` and an 8 s timeout, with `GITHUB_TOKEN` when it is set and again without it when GitHub refuses the token (as `/api/github-releases` does); the page component (`app/page.tsx`) awaits it and passes `stats` to `HomePage`, which stays synchronous, so tests and stories never reach the network. A number that could not be fetched is left out, never shown as zero; a static export keeps the build's numbers.
- **`Stack` is the versions block**: every number is read from `package.json` at build time, never typed. Six packages get a figure (`RollingNumber`, an odometer), the other dependencies a tag with the declared range.
- **Motion rules**: only `transform` and `opacity` move. A hover's colour fade (background, border or text colour, 200 ms at most, on hover only) is not motion and stays, with or without Reduce Motion. The hero's `h1` is the page's largest paint: it has no entrance, and nothing in its column does. Scroll reveals (`components/Motion`) hide nothing in the served HTML: a scope is armed by script only when it is off screen, then revealed once, both by an IntersectionObserver (`useReveal` never measures an element, which would force the layout of skipped sections). Everything stands still under `prefers-reduced-motion`.
- **First render**: the sections under the stack carry `RENDER_LATER` and are `content-visibility: auto` until `RenderLater` hands them back, one per idle period after the load. The first paint skips their style and layout (about 80 ms on a throttled phone), and a full-page capture taken after the load still shows them.
- **Text contrast**: `--site-text` and `--site-accent` hold 4.5:1 on the page, a card and the footer in both schemes; filled buttons use `blue.8` / `red.8` (white on Mantine's default `blue.6` is 3.5:1).
- **BorderAnimate** (the rim of the hero window and of the current template's card) uses `beamMode="wedge"` with `colorStops`, the one beam that animates a rotation and not a custom property. Its `trigger="inView"` leaves the border at opacity 0 in 3.0.11 (the rule that hides an idle border outweighs the one that shows an active one), hence `--border-animate-active: 1 !important` on `.beam`; it also ignores Reduce Motion unless the theme sets `respectReducedMotion`, hence the media query beside it.

### API Routes (`app/api/`)

- `search/` — Orama search built from the docs source (`createFromSource`): `GET` on a server build, `staticGET` (the whole index as a file) when `NEXT_PUBLIC_STATIC_EXPORT=1`, chosen in the route itself
- `github-releases/` — proxies GitHub releases API (configured in `config/index.ts`)
- `version/` — returns current package version

### CSS Import Order

In `app/layout.tsx`, CSS imports must follow this order:
1. `@mantine/core/styles.css`
2. `@mantine/spotlight/styles.css`
3. Mantine extension styles (marquee, text-animate)
4. Global styles

## Version pinning

`fumadocs-core` and `fumadocs-mdx` are pinned to **exact versions** (high release cadence upstream; their version lines are independent — mdx 15.x pairs with core 16.x). Bump deliberately, never with carets.

## Tooling

- **Formatter**: oxfmt (`.oxfmtrc.json`)
- **Linter**: oxlint + stylelint
- **TypeScript**: 6.x
- **Package Manager**: Yarn 4 (Berry). Do not use npm or pnpm.

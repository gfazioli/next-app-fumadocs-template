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
- `components/docs/DocsSearch` — Mantine Spotlight fed by `useDocsSearch({ type: 'fetch' })`; trigger in the navbar, shortcut `mod+K`
- `components/mdx/` — the MDX component map (`getMDXComponents`): headings, links, tables, CodeBlock (build-time Shiki + copy button), GitHub-alert blockquotes, Callout, Steps, FileTree

### RSC gotchas (learned the hard way)

- `next/link` is a *shared* component: do NOT pass it as a `component` prop to Mantine components from a server component — use `fumadocs-core/link` (which is `'use client'`) instead
- Compound components with static properties (`FileTree.Folder`) cannot cross the RSC boundary as client references — the compound object is assembled in the server module `components/mdx/index.tsx`
- The loader is server-only; `source.serializePageTree()` is async

### Theming

- Mantine color scheme manager only (`MantineProvider` + `ColorSchemeScript`); no next-themes
- Shiki dual themes are driven by `[data-mantine-color-scheme]` in `app/global.css` (CSS vars `--shiki-light/dark`)

### API Routes (`app/api/`)

- `search/` — Orama search built from the docs source (`createFromSource(source).GET`); switch to `staticGET` for static export
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

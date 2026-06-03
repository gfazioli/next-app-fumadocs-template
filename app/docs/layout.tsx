import { DocsShell } from '@/components/docs/DocsShell';
import { source } from '@/lib/source';

/**
 * Docs section layout: sidebar (desktop) + drawer (mobile), all Mantine.
 * The page tree is serialized here (server) and rehydrated in the client shell.
 */
export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const tree = await source.serializePageTree(source.getPageTree());

  return <DocsShell tree={tree}>{children}</DocsShell>;
}

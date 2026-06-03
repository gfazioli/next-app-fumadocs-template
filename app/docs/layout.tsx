import { Container } from '@mantine/core';

/**
 * Docs section layout. The full Mantine docs shell (sidebar + TOC)
 * is layered on top of this in the DocsShell component.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container size="xl" py="xl">
      {children}
    </Container>
  );
}

import Link from 'fumadocs-core/link';
import type { MDXComponents } from 'mdx/types';
import {
  Anchor,
  Divider,
  Table,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
} from '@mantine/core';
import { GitHubAlertBlockquote } from './Blockquote';

import { CodeBlock } from './CodeBlock';
import { FileTreeFile, FileTreeFolder, FileTreeRoot } from './FileTree';

export { Callout } from './Callout';
export { Steps } from './Steps';

/**
 * File-tree visualization with the compound authoring convention:
 * `<FileTree><FileTree.Folder name="app" defaultOpen><FileTree.File name="layout.tsx" /></FileTree.Folder></FileTree>`
 *
 * The compound object is assembled in this server module because static
 * properties cannot be attached to a client reference across the RSC boundary.
 */
function FileTreeBase(props: { children: React.ReactNode }) {
  return <FileTreeRoot {...props} />;
}

export const FileTree = Object.assign(FileTreeBase, {
  Folder: FileTreeFolder,
  File: FileTreeFile,
});

/**
 * Maps HTML tags produced by MDX to Mantine components.
 *
 * Pass the result to the compiled MDX body:
 * `<MDX components={getMDXComponents()} />`
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Title order={1} mt="xl" mb="md" {...props} />,
    h2: (props) => <Title order={2} mt="xl" mb="sm" {...props} />,
    h3: (props) => <Title order={3} mt="lg" mb="sm" {...props} />,
    h4: (props) => <Title order={4} mt="md" mb="xs" {...props} />,
    h5: (props) => <Title order={5} mt="md" mb="xs" {...props} />,
    h6: (props) => <Title order={6} mt="md" mb="xs" {...props} />,
    a: ({ href, ...props }) => <Anchor component={Link} href={href ?? '#'} {...props} />,
    pre: (props) => <CodeBlock {...props} />,
    hr: () => <Divider my="lg" />,
    blockquote: (props) => <GitHubAlertBlockquote {...props} />,
    table: (props) => (
      <TableScrollContainer minWidth={0} my="md">
        <Table striped highlightOnHover withTableBorder {...props} />
      </TableScrollContainer>
    ),
    thead: (props) => <TableThead {...props} />,
    tbody: (props) => <TableTbody {...props} />,
    tr: (props) => <TableTr {...props} />,
    th: (props) => <TableTh {...props} />,
    td: (props) => <TableTd {...props} />,
    ...components,
  };
}

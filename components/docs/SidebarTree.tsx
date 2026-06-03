'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Node, Root } from 'fumadocs-core/page-tree';
import { NavLink, Text } from '@mantine/core';
import classes from './SidebarTree.module.css';

function hasActivePage(node: Node, pathname: string): boolean {
  if (node.type === 'page') {
    return node.url === pathname;
  }
  if (node.type === 'folder') {
    if (node.index && node.index.url === pathname) {
      return true;
    }
    return node.children.some((child) => hasActivePage(child, pathname));
  }
  return false;
}

function TreeNode({ node, pathname }: { node: Node; pathname: string }) {
  if (node.type === 'separator') {
    return (
      <Text className={classes.label} mt="lg" mb={6} px="sm">
        {node.name}
      </Text>
    );
  }

  if (node.type === 'folder') {
    return (
      <NavLink
        label={node.name}
        defaultOpened={node.defaultOpen || hasActivePage(node, pathname)}
        childrenOffset={12}
        className={classes.link}
      >
        {node.index && (
          <NavLink
            component={Link}
            href={node.index.url}
            label={node.index.name}
            active={pathname === node.index.url}
            className={classes.link}
          />
        )}
        {node.children.map((child, index) => (
          <TreeNode key={child.$id ?? index} node={child} pathname={pathname} />
        ))}
      </NavLink>
    );
  }

  return (
    <NavLink
      component={Link}
      href={node.url}
      label={node.name}
      active={pathname === node.url}
      variant="light"
      className={classes.link}
    />
  );
}

/**
 * Recursive sidebar renderer for the fumadocs page tree, built on Mantine NavLink.
 */
export function SidebarTree({ tree }: { tree: Root }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs navigation">
      {tree.children.map((node, index) => (
        <TreeNode key={node.$id ?? index} node={node} pathname={pathname} />
      ))}
    </nav>
  );
}

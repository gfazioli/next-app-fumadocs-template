'use client';

import { useMemo } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import { deserializePageTree, type SerializedPageTree } from 'fumadocs-core/source/client';
import { Box, Burger, Drawer, Group, ScrollArea, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SidebarTree } from './SidebarTree';
import classes from './DocsShell.module.css';

type DocsShellProps = {
  tree: SerializedPageTree;
  children: React.ReactNode;
};

/**
 * Docs shell: desktop sidebar + mobile drawer, 100% Mantine.
 * The page tree is serialized on the server and rehydrated here.
 */
export function DocsShell({ tree, children }: DocsShellProps) {
  const pageTree = useMemo(() => deserializePageTree(tree), [tree]);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box className={classes.shell}>
      <Box component="aside" className={classes.sidebar} visibleFrom="md">
        <ScrollArea h="100%" type="hover">
          <Box py="md" pr="sm">
            <SidebarTree tree={pageTree} />
          </Box>
        </ScrollArea>
      </Box>

      <Box className={classes.main}>
        <Group hiddenFrom="md" py="xs" className={classes.mobileBar}>
          <Burger opened={opened} onClick={open} size="sm" aria-label="Open docs navigation" />
          <Group gap={6}>
            <IconMenu2 size={16} stroke={1.5} />
            <Text size="sm" c="dimmed">
              Menu
            </Text>
          </Group>
        </Group>
        {children}
      </Box>

      <Drawer opened={opened} onClose={close} title="Documentation" size="xs" hiddenFrom="md">
        <SidebarTree tree={pageTree} />
      </Drawer>
    </Box>
  );
}

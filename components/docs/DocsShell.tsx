'use client';

import { useMemo, useState } from 'react';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMenu2,
} from '@tabler/icons-react';
import { deserializePageTree, type SerializedPageTree } from 'fumadocs-core/source/client';
import { ActionIcon, Box, Burger, Drawer, Group, ScrollArea, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import config from '@/config';
import { ColorSchemeControl } from '../ColorSchemeControl/ColorSchemeControl';
import { SearchTrigger } from './SearchTrigger';
import { SidebarTree } from './SidebarTree';
import classes from './DocsShell.module.css';

type DocsShellProps = {
  tree: SerializedPageTree;
  children: React.ReactNode;
};

/**
 * Docs shell, fumadocs-style: collapsible desktop sidebar with search box,
 * nav tree and footer controls; drawer on mobile. 100% Mantine.
 * The page tree is serialized on the server and rehydrated here.
 */
export function DocsShell({ tree, children }: DocsShellProps) {
  const pageTree = useMemo(() => deserializePageTree(tree), [tree]);
  const [opened, { open, close }] = useDisclosure(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box className={classes.shell} data-collapsed={collapsed || undefined}>
      <Box component="aside" className={classes.sidebar} visibleFrom="md">
        <Group gap="xs" wrap="nowrap" className={classes.sidebarHeader}>
          <SearchTrigger fullWidth />
          <Tooltip label="Collapse sidebar">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              <IconLayoutSidebarLeftCollapse size={18} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>

        <ScrollArea flex={1} type="hover">
          <Box py="sm" pr="sm">
            <SidebarTree tree={pageTree} />
          </Box>
        </ScrollArea>

        <Group justify="space-between" className={classes.sidebarFooter}>
          <Group gap={4}>
            <Tooltip label="GitHub">
              <ActionIcon
                component="a"
                href={`https://github.com/${config.gitHub.repo}`}
                target="_blank"
                variant="subtle"
                color="gray"
                size="sm"
                aria-label="GitHub repository"
              >
                <IconBrandGithub size={16} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Discord">
              <ActionIcon
                component="a"
                href="https://discord.com/invite/wbH82zuWMN"
                target="_blank"
                variant="subtle"
                color="gray"
                size="sm"
                aria-label="Discord"
              >
                <IconBrandDiscord size={16} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <ColorSchemeControl />
        </Group>
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

      {collapsed && (
        <Tooltip label="Expand sidebar" position="right">
          <ActionIcon
            className={classes.expand}
            visibleFrom="md"
            variant="default"
            size="lg"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
          >
            <IconLayoutSidebarLeftExpand size={18} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      )}

      <Drawer opened={opened} onClose={close} title="Documentation" size="xs" hiddenFrom="md">
        <SidebarTree tree={pageTree} />
      </Drawer>
    </Box>
  );
}

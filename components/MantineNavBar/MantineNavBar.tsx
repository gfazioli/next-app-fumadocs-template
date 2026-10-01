'use client';

import Link from 'next/link';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconCoffee,
  IconHeartFilled,
} from '@tabler/icons-react';
import { ActionIcon, Anchor, Box, Group, Text, Tooltip } from '@mantine/core';
import config from '@/config';
import { SearchTrigger } from '../docs/SearchTrigger';
import { ColorSchemeControl } from '../ColorSchemeControl/ColorSchemeControl';
import { HeaderControl } from '../ColorSchemeControl/HeaderControl';
import { Logo } from '../Logo/Logo';
import classes from './MantineNavBar.module.css';

/**
 * Sticky top navigation bar, 100% Mantine.
 *
 * @since 1.0.0
 */
export const MantineNavBar = () => {
  return (
    <Box component="header" className={classes.header}>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Anchor component={Link} href="/" underline="never">
          <Group align="center" gap={4} wrap="nowrap">
            <Logo />
            <Text size="xl" fw={600} ff="heading" c="var(--mantine-color-text)" visibleFrom="sm">
              Mantine{' '}
              <Text span inherit c="blue">
                NextJS + Fumadocs
              </Text>
            </Text>
          </Group>
        </Anchor>

        <Group gap="xs" wrap="nowrap">
          <Anchor component={Link} href="/docs" size="sm" c="dimmed" underline="never" px="xs">
            Docs
          </Anchor>

          <SearchTrigger />

          <Tooltip label="Mantine Discord server">
            <ActionIcon
              component="a"
              href="https://discord.com/invite/wbH82zuWMN"
              target="_blank"
              variant="subtle"
              color="gray"
              aria-label="Mantine Discord server"
            >
              <IconBrandDiscord size={20} stroke={1.5} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="GitHub">
            <ActionIcon
              component="a"
              href={`https://github.com/${config.gitHub.repo}`}
              target="_blank"
              variant="subtle"
              color="gray"
              aria-label="GitHub repository"
            >
              <IconBrandGithub size={20} stroke={1.5} />
            </ActionIcon>
          </Tooltip>

          <ColorSchemeControl />

          {/* Same square controls as the colour-scheme toggle (mantine.dev's header style), with
              the icon carrying the colour: Mantine red and orange. The sponsors wall is on the
              home page, hence `/#sponsors`. */}
          <HeaderControl component={Link} href="/#sponsors" tooltip="Sponsor" visibleFrom="sm">
            <IconHeartFilled size={18} color="var(--mantine-color-red-6)" />
          </HeaderControl>
          <HeaderControl
            component="a"
            href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
            target="_blank"
            rel="noopener noreferrer"
            tooltip="Buy me a coffee"
            visibleFrom="sm"
          >
            <IconCoffee size={18} stroke={1.8} color="var(--mantine-color-orange-6)" />
          </HeaderControl>
        </Group>
      </Group>
    </Box>
  );
};

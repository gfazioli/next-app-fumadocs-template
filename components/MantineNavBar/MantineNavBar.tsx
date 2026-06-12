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
            <Text size="lg" fw={300} c="blue" visibleFrom="sm">
              Mantine NextJS + Fumadocs
            </Text>
          </Group>
        </Anchor>

        <Group gap="xs" wrap="nowrap">
          <Anchor component={Link} href="/docs" size="sm" c="dimmed" underline="never" px="xs">
            Docs
          </Anchor>

          <SearchTrigger />

          <Tooltip label="Discord">
            <ActionIcon
              component="a"
              href="https://discord.com/invite/wbH82zuWMN"
              target="_blank"
              variant="subtle"
              color="gray"
              aria-label="Discord"
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

          <Tooltip label="Sponsor" withArrow>
            <ActionIcon
              component={Link}
              href="/#sponsors"
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{ from: 'pink', to: 'grape' }}
              aria-label="Sponsor"
              visibleFrom="sm"
            >
              <IconHeartFilled size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Buy me a coffee" withArrow>
            <ActionIcon
              component="a"
              href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              radius="xl"
              variant="filled"
              color="yellow"
              aria-label="Buy me a coffee"
              visibleFrom="sm"
              styles={{ root: { color: 'var(--mantine-color-white)' } }}
            >
              <IconCoffee size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Box>
  );
};

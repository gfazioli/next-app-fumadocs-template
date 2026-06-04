'use client';

import Link from 'next/link';
import { IconBrandDiscord, IconBrandGithub, IconHeartFilled } from '@tabler/icons-react';
import { ActionIcon, Anchor, Box, Button, Group, Text, Tooltip } from '@mantine/core';
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

          <Button
            component={Link}
            href="/#sponsors"
            size="sm"
            radius="xl"
            variant="gradient"
            gradient={{ from: 'pink', to: 'grape' }}
            leftSection={<IconHeartFilled size={14} />}
            visibleFrom="sm"
          >
            Sponsor
          </Button>
        </Group>
      </Group>
    </Box>
  );
};

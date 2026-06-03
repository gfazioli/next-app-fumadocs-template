'use client';

import { IconSearch } from '@tabler/icons-react';
import { Group, Kbd, Text, UnstyledButton } from '@mantine/core';
import { spotlight } from '@mantine/spotlight';
import classes from './SearchTrigger.module.css';

/**
 * Search-box-like button that opens the docs search Spotlight.
 */
export function SearchTrigger() {
  return (
    <UnstyledButton
      className={classes.trigger}
      onClick={spotlight.open}
      aria-label="Search documentation"
    >
      <Group gap="xs" wrap="nowrap">
        <IconSearch size={16} stroke={1.5} />
        <Text size="sm" c="dimmed" visibleFrom="md">
          Search
        </Text>
        <Kbd size="xs" visibleFrom="md">
          ⌘K
        </Kbd>
      </Group>
    </UnstyledButton>
  );
}

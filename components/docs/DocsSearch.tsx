'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  IconAlignLeft,
  IconChevronDown,
  IconFileText,
  IconHash,
  IconSearch,
} from '@tabler/icons-react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { Button, Code, Divider, Group, Kbd, Loader, Mark, Menu, Text } from '@mantine/core';
import { Spotlight, spotlight } from '@mantine/spotlight';
import config from '@/config';

const typeIcon = {
  page: <IconFileText size={18} stroke={1.5} />,
  heading: <IconHash size={18} stroke={1.5} />,
  text: <IconAlignLeft size={18} stroke={1.5} />,
} as const;

const FILTERS = config.search.filters;

/**
 * Search results come back as a Markdown-ish string where matches are
 * wrapped in `<mark>` and inline code in backticks. Render both with
 * Mantine components instead of showing the raw markup.
 */
function ResultContent({ content }: { content: string }) {
  const parts = content.split(/(<mark>.*?<\/mark>|`[^`]+`)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('<mark>') && part.endsWith('</mark>')) {
          return <Mark key={index}>{part.slice(6, -7)}</Mark>;
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return (
            <Code key={index} fz="xs">
              {part.slice(1, -1)}
            </Code>
          );
        }
        return part;
      })}
    </>
  );
}

/**
 * Docs search dialog, fumadocs-style: Spotlight fed by the headless
 * `useDocsSearch` hook (Orama index served by /api/search), with an
 * ESC hint and a Filter row driven by `config.search.filters`.
 */
export function DocsSearch() {
  const router = useRouter();
  const { search, setSearch, query } = useDocsSearch({ type: 'fetch' });
  const [filterIndex, setFilterIndex] = useState(0);

  const results = query.data !== 'empty' && query.data ? query.data : [];
  const activeFilter = FILTERS[filterIndex] ?? FILTERS[0];
  const visible =
    activeFilter.prefixes.length === 0
      ? results
      : results.filter((result) =>
          activeFilter.prefixes.some((prefix) => result.url.startsWith(prefix))
        );

  return (
    <Spotlight.Root
      query={search}
      onQueryChange={setSearch}
      shortcut={['mod + K', '/']}
      scrollable
      maxHeight={420}
    >
      <Spotlight.Search
        placeholder="Search documentation..."
        leftSection={query.isLoading ? <Loader size={18} /> : <IconSearch size={18} stroke={1.5} />}
        rightSection={<Kbd size="xs">ESC</Kbd>}
        rightSectionPointerEvents="none"
        rightSectionWidth={60}
      />
      <Group gap="xs" px="md" py={8}>
        <Text size="xs" c="dimmed" fw={500}>
          Filter
        </Text>
        <Menu position="bottom-start" withinPortal={false}>
          <Menu.Target>
            <Button
              variant="subtle"
              color="gray"
              size="compact-xs"
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
            >
              {activeFilter.label}
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {FILTERS.map((filter, index) => (
              <Menu.Item key={filter.label} onClick={() => setFilterIndex(index)}>
                {filter.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Divider />
      <Spotlight.ActionsList>
        {visible.length === 0 && search.length > 0 && !query.isLoading && (
          <Spotlight.Empty>Nothing found...</Spotlight.Empty>
        )}
        {visible.map((result) => (
          <Spotlight.Action
            key={result.id}
            onClick={() => router.push(result.url)}
            pl={result.type === 'page' ? undefined : 'xl'}
          >
            <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
              {typeIcon[result.type as keyof typeof typeIcon] ?? typeIcon.text}
              <Text size="sm" truncate fw={result.type === 'page' ? 600 : undefined}>
                <ResultContent content={String(result.content)} />
              </Text>
            </Group>
          </Spotlight.Action>
        ))}
      </Spotlight.ActionsList>
    </Spotlight.Root>
  );
}

export { spotlight };

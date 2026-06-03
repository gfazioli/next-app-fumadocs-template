'use client';

import { useRouter } from 'next/navigation';
import { IconAlignLeft, IconFileText, IconHash, IconSearch } from '@tabler/icons-react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { Code, Group, Loader, Mark, Text } from '@mantine/core';
import { Spotlight, spotlight } from '@mantine/spotlight';

const typeIcon = {
  page: <IconFileText size={18} stroke={1.5} />,
  heading: <IconHash size={18} stroke={1.5} />,
  text: <IconAlignLeft size={18} stroke={1.5} />,
} as const;

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
 * Docs search dialog: Mantine Spotlight fed by the headless
 * `useDocsSearch` hook (Orama index served by /api/search).
 */
export function DocsSearch() {
  const router = useRouter();
  const { search, setSearch, query } = useDocsSearch({ type: 'fetch' });

  const results = query.data !== 'empty' && query.data ? query.data : [];

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
      />
      <Spotlight.ActionsList>
        {results.length === 0 && search.length > 0 && !query.isLoading && (
          <Spotlight.Empty>Nothing found...</Spotlight.Empty>
        )}
        {results.map((result) => (
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

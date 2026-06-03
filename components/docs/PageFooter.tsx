import Link from 'fumadocs-core/link';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Card, Group, SimpleGrid, Text } from '@mantine/core';

type Neighbour = { name: React.ReactNode; url: string } | undefined;

/**
 * Previous / next page navigation footer.
 */
export function PageFooter({ previous, next }: { previous?: Neighbour; next?: Neighbour }) {
  if (!previous && !next) {
    return null;
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
      {previous ? (
        <Card component={Link} href={previous.url} withBorder radius="md" padding="md">
          <Group gap="xs" wrap="nowrap">
            <IconChevronLeft size={18} stroke={1.5} />
            <div>
              <Text size="xs" c="dimmed">
                Previous
              </Text>
              <Text size="sm" fw={500}>
                {previous.name}
              </Text>
            </div>
          </Group>
        </Card>
      ) : (
        <div />
      )}
      {next && (
        <Card component={Link} href={next.url} withBorder radius="md" padding="md">
          <Group gap="xs" wrap="nowrap" justify="flex-end">
            <div style={{ textAlign: 'right' }}>
              <Text size="xs" c="dimmed">
                Next
              </Text>
              <Text size="sm" fw={500}>
                {next.name}
              </Text>
            </div>
            <IconChevronRight size={18} stroke={1.5} />
          </Group>
        </Card>
      )}
    </SimpleGrid>
  );
}

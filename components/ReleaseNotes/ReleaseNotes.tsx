'use client';

import { IconAlertTriangle, IconTag } from '@tabler/icons-react';
import { marked } from 'marked';
import {
  Alert,
  Anchor,
  Badge,
  Group,
  Skeleton,
  Stack,
  Text,
  Timeline,
  Typography,
} from '@mantine/core';
import config from '@/config';
import { useReleaseNotes } from './use-release-notes';
import classes from './ReleaseNotes.module.css';

/**
 * Live GitHub releases rendered with a Mantine Timeline.
 * Release bodies are GitHub-flavored Markdown, rendered with marked —
 * they come from this repository's own releases (trusted content).
 */
export function ReleaseNotes() {
  const { releases, error, isLoading } = useReleaseNotes();

  if (isLoading) {
    return (
      <Stack my="lg" gap="md">
        <Skeleton height={24} width="40%" />
        <Skeleton height={80} />
        <Skeleton height={24} width="35%" />
        <Skeleton height={80} />
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert
        my="lg"
        variant="light"
        color="yellow"
        icon={<IconAlertTriangle size={18} />}
        title="Could not load the releases"
      >
        The GitHub API request failed (possibly rate-limited). You can still browse the releases
        directly on{' '}
        <Anchor href={config.releaseNotes.url} target="_blank">
          GitHub
        </Anchor>
        .
      </Alert>
    );
  }

  if (releases.length === 0) {
    return (
      <Text c="dimmed" my="lg">
        No releases published yet.
      </Text>
    );
  }

  return (
    <Timeline active={0} bulletSize={28} lineWidth={2} my="lg">
      {releases.map((release) => (
        <Timeline.Item
          key={release.id}
          bullet={<IconTag size={14} />}
          title={
            <Group gap="xs">
              <Anchor href={release.html_url} target="_blank" fw={600}>
                {release.name || release.tag_name}
              </Anchor>
              <Badge variant="light" size="sm">
                {release.tag_name}
              </Badge>
              {release.prerelease && (
                <Badge color="orange" variant="light" size="sm">
                  pre-release
                </Badge>
              )}
            </Group>
          }
        >
          <Text size="xs" c="dimmed">
            {new Date(release.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          {release.body && (
            <Typography className={classes.body}>
              <div
                dangerouslySetInnerHTML={{ __html: marked.parse(release.body, { async: false }) }}
              />
            </Typography>
          )}
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

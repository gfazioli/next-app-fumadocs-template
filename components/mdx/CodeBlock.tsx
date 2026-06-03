'use client';

import { useRef } from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { ActionIcon, Box, CopyButton, Group, Text, Tooltip } from '@mantine/core';
import classes from './CodeBlock.module.css';

type CodeBlockProps = React.ComponentPropsWithoutRef<'pre'> & {
  title?: string;
};

/**
 * Mantine wrapper around the Shiki-highlighted `<pre>` produced at build
 * time by fumadocs rehype-code: optional title bar + copy button.
 */
export function CodeBlock({ title, children, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);

  const copyButton = (
    <CopyButton value="" timeout={1500}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy code'} position="left">
          <ActionIcon
            variant="subtle"
            color={copied ? 'teal' : 'gray'}
            size="sm"
            aria-label="Copy code"
            onClick={(event) => {
              const text = preRef.current?.textContent;
              if (text) {
                navigator.clipboard.writeText(text);
              }
              copy();
              event.currentTarget.blur();
            }}
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );

  return (
    <Box className={classes.root}>
      {title ? (
        <Group justify="space-between" className={classes.header}>
          <Text size="xs" c="dimmed" ff="monospace">
            {title}
          </Text>
          {copyButton}
        </Group>
      ) : (
        <Box className={classes.floatingCopy}>{copyButton}</Box>
      )}
      <pre ref={preRef} {...props} className={classes.pre}>
        {children}
      </pre>
    </Box>
  );
}

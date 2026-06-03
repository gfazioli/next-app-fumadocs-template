'use client';

import { useRef } from 'react';
import { AnchorProvider, ScrollProvider, TOCItem, type TOCItemType } from 'fumadocs-core/toc';
import { Box, Text } from '@mantine/core';
import classes from './Toc.module.css';

/**
 * Table of contents with scroll-spy, built on the fumadocs-core headless
 * TOC primitives and styled with Mantine tokens via `[data-active]`.
 */
export function Toc({ items }: { items: TOCItemType[] }) {
  const viewRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) {
    return null;
  }

  return (
    <Box component="nav" aria-label="Table of contents" className={classes.toc}>
      <Text size="xs" fw={700} c="dimmed" mb="xs">
        On this page
      </Text>
      <AnchorProvider toc={items}>
        <div ref={viewRef}>
          <ScrollProvider containerRef={viewRef}>
            {items.map((item) => (
              <TOCItem
                key={item.url}
                href={item.url}
                className={classes.item}
                style={{
                  paddingInlineStart: `calc(${item.depth - 1} * var(--mantine-spacing-sm))`,
                }}
              >
                {item.title}
              </TOCItem>
            ))}
          </ScrollProvider>
        </div>
      </AnchorProvider>
    </Box>
  );
}

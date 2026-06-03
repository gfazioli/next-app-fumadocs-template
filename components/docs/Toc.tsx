'use client';

import { useEffect, useRef, useState } from 'react';
import { IconListSearch } from '@tabler/icons-react';
import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  useActiveAnchor,
  type TOCItemType,
} from 'fumadocs-core/toc';
import { Box, Group, Text } from '@mantine/core';
import classes from './Toc.module.css';

/**
 * The moving indicator: a primary-colored segment that slides along the
 * rail to the active heading (clerk-lite, no SVG geometry).
 */
function TocThumb({ listRef }: { listRef: React.RefObject<HTMLDivElement | null> }) {
  const active = useActiveAnchor();
  const [style, setStyle] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    if (!active || !listRef.current) {
      setStyle(null);
      return;
    }
    const el = listRef.current.querySelector(`a[href="#${CSS.escape(active)}"]`);
    if (el instanceof HTMLElement) {
      setStyle({ top: el.offsetTop, height: el.offsetHeight });
    }
  }, [active, listRef]);

  if (!style) {
    return null;
  }

  return <span className={classes.thumb} style={{ top: style.top, height: style.height }} />;
}

/**
 * Table of contents with scroll-spy, built on the fumadocs-core headless
 * TOC primitives and styled with Mantine tokens via `[data-active]`.
 */
export function Toc({ items }: { items: TOCItemType[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) {
    return null;
  }

  return (
    <Box component="nav" aria-label="Table of contents" className={classes.toc}>
      <Group gap={6} mb="xs">
        <IconListSearch size={14} stroke={1.5} />
        <Text size="xs" fw={700} c="dimmed">
          On this page
        </Text>
      </Group>
      <AnchorProvider toc={items}>
        <div ref={listRef} className={classes.list}>
          <ScrollProvider containerRef={listRef}>
            <TocThumb listRef={listRef} />
            {items.map((item) => (
              <TOCItem
                key={item.url}
                href={item.url}
                className={classes.item}
                style={{
                  paddingInlineStart: `calc(${item.depth - 1} * var(--mantine-spacing-sm) + var(--mantine-spacing-md))`,
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

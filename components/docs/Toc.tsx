'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { IconListSearch } from '@tabler/icons-react';
import {
  AnchorProvider,
  ScrollProvider,
  TOCItem,
  useActiveAnchors,
  type TOCItemType,
} from 'fumadocs-core/toc';
import { Box, Group, Text } from '@mantine/core';
import classes from './Toc.module.css';

const SVG_NS = 'http://www.w3.org/2000/svg';
const INDENT = 12;
const RAIL_X = 1;

type Segment = { start: number; end: number };

type Thread = {
  d: string;
  width: number;
  height: number;
  total: number;
  segments: Segment[];
};

/**
 * Build the clerk-style thread: a path running along the left edge of the
 * items, indented by heading depth, with smooth S-curves between depth
 * changes. Returns the path and the [start, end] length of each item's
 * segment along it, used to position the active thumb.
 */
function buildThread(container: HTMLElement, anchors: HTMLElement[]): Thread | null {
  if (anchors.length === 0) {
    return null;
  }

  const depths = anchors.map((a) => Number(a.dataset.depth ?? 1));
  const minDepth = Math.min(...depths);
  const points = anchors.map((a, i) => ({
    x: RAIL_X + (depths[i] - minDepth) * INDENT,
    top: a.offsetTop + 6,
    bottom: a.offsetTop + a.offsetHeight - 6,
  }));

  const probe = document.createElementNS(SVG_NS, 'path');
  const lengthOf = (path: string) => {
    probe.setAttribute('d', path);
    return probe.getTotalLength();
  };

  let d = '';
  const segments: Segment[] = [];

  points.forEach((point, index) => {
    if (index === 0) {
      d += `M ${point.x} ${point.top}`;
    } else {
      const prev = points[index - 1];
      if (prev.x === point.x) {
        d += ` L ${point.x} ${point.top}`;
      } else {
        const midY = (prev.bottom + point.top) / 2;
        d += ` L ${prev.x} ${prev.bottom}`;
        d += ` C ${prev.x} ${midY}, ${point.x} ${midY}, ${point.x} ${point.top}`;
      }
    }
    const start = lengthOf(d);
    d += ` L ${point.x} ${point.bottom}`;
    segments.push({ start, end: lengthOf(d) });
  });

  return {
    d,
    width: Math.max(...points.map((p) => p.x)) + 2,
    height: container.scrollHeight,
    total: lengthOf(d),
    segments,
  };
}

function TocThread({
  items,
  listRef,
}: {
  items: TOCItemType[];
  listRef: React.RefObject<HTMLDivElement | null>;
}) {
  const activeIds = useActiveAnchors();
  const [thread, setThread] = useState<Thread | null>(null);

  const measure = useCallback(() => {
    const container = listRef.current;
    if (!container) {
      return;
    }
    const anchors = Array.from(container.querySelectorAll<HTMLElement>('a[data-depth]'));
    setThread(buildThread(container, anchors));
  }, [listRef]);

  useEffect(() => {
    measure();
    const container = listRef.current;
    if (!container) {
      return;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [measure, listRef]);

  if (!thread) {
    return null;
  }

  const activeIndexes = items
    .map((item, index) => (activeIds.includes(item.url.slice(1)) ? index : -1))
    .filter((index) => index !== -1);

  const thumb =
    activeIndexes.length > 0
      ? {
          start: thread.segments[activeIndexes[0]].start,
          end: thread.segments[activeIndexes[activeIndexes.length - 1]].end,
        }
      : null;

  return (
    <svg
      className={classes.thread}
      width={thread.width}
      height={thread.height}
      viewBox={`0 0 ${thread.width} ${thread.height}`}
      aria-hidden
    >
      <path d={thread.d} className={classes.rail} />
      {thumb && (
        <path
          d={thread.d}
          className={classes.thumb}
          strokeDasharray={`${thumb.end - thumb.start} ${thread.total}`}
          strokeDashoffset={-thumb.start}
        />
      )}
    </svg>
  );
}

function TocItems({
  items,
  listRef,
}: {
  items: TOCItemType[];
  listRef: React.RefObject<HTMLDivElement | null>;
}) {
  const activeIds = useActiveAnchors();
  const minDepth = Math.min(...items.map((item) => item.depth));

  return (
    <>
      {items.map((item) => (
        <TOCItem
          key={item.url}
          href={item.url}
          data-depth={item.depth}
          data-thread-active={activeIds.includes(item.url.slice(1)) || undefined}
          className={classes.item}
          style={{
            paddingInlineStart: (item.depth - minDepth) * INDENT + INDENT + 2,
          }}
        >
          {item.title}
        </TOCItem>
      ))}
    </>
  );
}

/**
 * Clerk-style table of contents: a thread following the heading depth
 * with smooth curves, and a primary-colored thumb sliding along it to
 * cover the currently visible headings.
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
            <TocThread items={items} listRef={listRef} />
            <TocItems items={items} listRef={listRef} />
          </ScrollProvider>
        </div>
      </AnchorProvider>
    </Box>
  );
}

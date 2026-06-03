import { Children, isValidElement } from 'react';
import { Blockquote } from '@mantine/core';
import { Callout, type CalloutType } from './Callout';

const ALERT_RE = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/;

function getNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }
  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return '';
}

/**
 * Blockquote with GitHub alert syntax support:
 *
 * ```md
 * > [!NOTE]
 * >
 * > Useful information that users should know.
 * ```
 *
 * When the first paragraph is a `[!TYPE]` marker, the blockquote renders
 * as a Mantine-based Callout of that type; otherwise as a regular
 * Mantine Blockquote.
 */
export function GitHubAlertBlockquote(props: React.ComponentPropsWithoutRef<'blockquote'>) {
  const children = Children.toArray(props.children).filter(
    (child) => !(typeof child === 'string' && child.trim() === '')
  );

  const [first, ...rest] = children;
  const marker = getNodeText(first).trim().match(ALERT_RE);

  if (marker) {
    const type = marker[1].toLowerCase() as CalloutType;
    return <Callout type={type}>{rest}</Callout>;
  }

  return <Blockquote my="md">{props.children}</Blockquote>;
}

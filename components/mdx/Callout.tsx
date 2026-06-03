import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconBulb,
  IconExclamationCircle,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Alert } from '@mantine/core';
import classes from './Callout.module.css';

export type CalloutType = 'note' | 'info' | 'tip' | 'important' | 'warning' | 'caution' | 'error';

type CalloutProps = {
  type?: CalloutType;
  title?: React.ReactNode;
  children: React.ReactNode;
};

const calloutConfig: Record<CalloutType, { color: string; title: string; icon: React.ReactNode }> =
  {
    note: { color: 'blue', title: 'Note', icon: <IconInfoCircle size={18} /> },
    info: { color: 'blue', title: 'Info', icon: <IconInfoCircle size={18} /> },
    tip: { color: 'teal', title: 'Tip', icon: <IconBulb size={18} /> },
    important: { color: 'violet', title: 'Important', icon: <IconExclamationCircle size={18} /> },
    warning: { color: 'yellow', title: 'Warning', icon: <IconAlertTriangle size={18} /> },
    caution: { color: 'red', title: 'Caution', icon: <IconAlertOctagon size={18} /> },
    error: { color: 'red', title: 'Error', icon: <IconAlertOctagon size={18} /> },
  };

/**
 * Admonition box built on Mantine Alert: light variant with a colored
 * accent border, fumadocs-style.
 */
export function Callout({ type = 'note', title, children }: CalloutProps) {
  const { color, title: defaultTitle, icon } = calloutConfig[type] ?? calloutConfig.note;

  return (
    <Alert
      my="md"
      variant="light"
      color={color}
      title={title ?? defaultTitle}
      icon={icon}
      radius="md"
      classNames={{ root: classes.root }}
    >
      {children}
    </Alert>
  );
}

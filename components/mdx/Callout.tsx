import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconBulb,
  IconExclamationCircle,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Alert } from '@mantine/core';

export type CalloutType = 'note' | 'info' | 'tip' | 'important' | 'warning' | 'caution' | 'error';

type CalloutProps = {
  type?: CalloutType;
  title?: React.ReactNode;
  children: React.ReactNode;
};

const calloutConfig: Record<CalloutType, { color: string; title: string; icon: React.ReactNode }> =
  {
    note: { color: 'blue', title: 'Note', icon: <IconInfoCircle size={20} /> },
    info: { color: 'blue', title: 'Info', icon: <IconInfoCircle size={20} /> },
    tip: { color: 'green', title: 'Tip', icon: <IconBulb size={20} /> },
    important: { color: 'violet', title: 'Important', icon: <IconExclamationCircle size={20} /> },
    warning: { color: 'yellow', title: 'Warning', icon: <IconAlertTriangle size={20} /> },
    caution: { color: 'red', title: 'Caution', icon: <IconAlertOctagon size={20} /> },
    error: { color: 'red', title: 'Error', icon: <IconAlertOctagon size={20} /> },
  };

/**
 * Admonition box built on Mantine Alert.
 * Mantine-native replacement for the Nextra/fumadocs-ui Callout.
 */
export function Callout({ type = 'note', title, children }: CalloutProps) {
  const { color, title: defaultTitle, icon } = calloutConfig[type] ?? calloutConfig.note;

  return (
    <Alert my="md" color={color} title={title ?? defaultTitle} icon={icon}>
      {children}
    </Alert>
  );
}

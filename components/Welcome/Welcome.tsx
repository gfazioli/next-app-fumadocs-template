'use client';

import Link from 'next/link';
import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { IconBook, IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { Anchor, Button, Code, Group, Paper, Text, Title } from '@mantine/core';
import pack from '../../package.json';
import classes from './Welcome.module.css';

// Product Hunt badge — re-enable the import and the block below
// after launching the template on Product Hunt.
// import { ProductHunt } from '../ProductHunt/ProductHunt';

export function Welcome() {
  return (
    <>
      {/*
      <Center my={64}>
        <ProductHunt />
      </Center>
      */}
      <Title maw="90vw" mx="auto" pt={64} className={classes.title} ta="center">
        Welcome to Mantine Next.js +
        <TextAnimate
          animate="in"
          by="character"
          inherit
          variant="gradient"
          component="span"
          segmentDelay={0.2}
          duration={2}
          animation="scale"
          animateProps={{
            scaleAmount: 3,
          }}
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Fumadocs template
        </TextAnimate>
      </Title>

      <Text c="dimmed" ta="center" size="xl" maw={620} mx="auto" mt="sm">
        A documentation starter with Next.js App Router, Mantine 9 and the headless Fumadocs engine
        — docs UI built 100% with Mantine, no Tailwind. Write your pages in{' '}
        <Code fz="xl">content/docs</Code>, and if you want to learn more about the Mantine + Next.js
        integration follow <Anchor href="https://mantine.dev/guides/next/">this guide</Anchor>.
      </Text>

      <Group justify="center" gap="md" mt="xl">
        <Button
          component={Link}
          href="/docs"
          leftSection={<IconBook size={20} />}
          px={32}
          radius={256}
          size="lg"
        >
          Read the docs
        </Button>
        <Button
          href="https://github.com/gfazioli/next-app-fumadocs-template"
          component="a"
          rightSection={<IconExternalLink />}
          leftSection={<IconBrandGithub />}
          variant="outline"
          px={32}
          radius={256}
          size="lg"
        >
          Use template v{pack.version}
        </Button>
      </Group>

      <Paper shadow="xl" p={8} mih={300} my={32} bg="black" mx="auto" radius={8}>
        <TextAnimate.Typewriter
          fz={11}
          c="green.5"
          ff="monospace"
          multiline
          delay={100}
          loop={false}
          value={[
            'Dependencies :',
            ...Object.keys(pack.dependencies).map(
              (key: string) =>
                `${key} : ${pack.dependencies[key as keyof typeof pack.dependencies].toString()}`
            ),
          ]}
        />
      </Paper>
    </>
  );
}

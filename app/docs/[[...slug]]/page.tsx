import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Text, Title } from '@mantine/core';
import { getMDXComponents } from '@/components/mdx';
import { source } from '@/lib/source';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page(props: Props) {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <article>
      <Title order={1} mb="xs">
        {page.data.title}
      </Title>
      {page.data.description && (
        <Text c="dimmed" size="lg" mb="xl">
          {page.data.description}
        </Text>
      )}
      <MDX components={getMDXComponents()} />
    </article>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

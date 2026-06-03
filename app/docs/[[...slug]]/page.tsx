import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'fumadocs-core/link';
import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb';
import { findNeighbour } from 'fumadocs-core/page-tree';
import { Anchor, Box, Breadcrumbs, Text, Title } from '@mantine/core';
import { PageFooter } from '@/components/docs/PageFooter';
import { Toc } from '@/components/docs/Toc';
import { getMDXComponents } from '@/components/mdx';
import { source } from '@/lib/source';
import classes from './page.module.css';

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
  const tree = source.getPageTree();
  const breadcrumbs = getBreadcrumbItems(page.url, tree);
  const { previous, next } = findNeighbour(tree, page.url);

  return (
    <Box className={classes.page}>
      <Box className={classes.content}>
        {breadcrumbs.length > 1 && (
          <Breadcrumbs mb="md" separatorMargin={6}>
            {breadcrumbs.map((item, index) =>
              item.url ? (
                <Anchor key={index} component={Link} href={item.url} size="sm" c="dimmed">
                  {item.name}
                </Anchor>
              ) : (
                <Text key={index} size="sm" c="dimmed">
                  {item.name}
                </Text>
              )
            )}
          </Breadcrumbs>
        )}

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

        <PageFooter previous={previous} next={next} />
      </Box>

      <Box component="aside" visibleFrom="lg" className={classes.aside}>
        <Toc items={page.data.toc} />
      </Box>
    </Box>
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

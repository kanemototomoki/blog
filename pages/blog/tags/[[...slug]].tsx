import { useState } from 'react';
import {
  GetStaticPathsResult,
  GetStaticPropsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { usePagination } from '@mantine/hooks';
import { Grid } from '@mantine/core';
import type { Blog } from 'contentlayer/generated';
import { BlogOverView } from '@components/BlogOverView';
import { BlogListContainer } from '@components/BlogListContainer';
import { Pager } from '@components/Pager';
import { getAllTags, getBlogByTag } from '@utils/getBlog';

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const { all } = getAllTags();

  const paths = [];
  for (let i = 0; i < all.length; i++) {
    paths.push({
      params: {
        slug: [all[i].tag],
      },
    });
    for (let j = 1; j < all[i].totalPageCount + 1; j++) {
      paths.push({
        params: {
          slug: [all[i].tag, String(j)],
        },
      });
    }
  }

  return {
    paths: [
      {
        params: {
          slug: [''],
        },
      },
      ...paths,
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<{
    blog: Blog[];
    tag: string;
    totalPageCount: number;
    currentPageCount: number;
  }>
> {
  if (!(params && params.slug != undefined)) {
    return {
      notFound: true,
    };
  }

  const slug = params.slug;
  const num = Number(slug[1] || 1);

  const { blog, totalPageCount } = getBlogByTag({
    tag: slug[0],
    currentPageCount: num,
  });

  return {
    props: {
      blog,
      tag: params.slug[0],
      totalPageCount,
      currentPageCount: num,
    },
  };
}

export default function Page({
  blog,
  tag,
  totalPageCount,
  currentPageCount,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [page, onChange] = useState(currentPageCount || 1);
  const pagination = usePagination({ total: totalPageCount, page, onChange });

  return (
    <>
      <Head>
        <title>blog - knmt.dev</title>
      </Head>
      <BlogListContainer>
        <h1>Blog</h1>

        <Grid>
          {blog.map((blog) => (
            <Grid.Col key={blog.title}>
              <BlogOverView
                tags={blog.tags}
                title={blog.title}
                url={blog.url}
                createdAt={blog.createdAt}
                updatedAt={blog.updatedAt}
              />
            </Grid.Col>
          ))}
        </Grid>
      </BlogListContainer>
      <Pager
        totalPageCount={totalPageCount}
        currentPageCount={page}
        pagination={pagination}
        path={`/blog/tags/${tag}/`}
      />
    </>
  );
}

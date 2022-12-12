import { useState } from 'react';
import { GetStaticPathsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { usePagination } from '@mantine/hooks';
import { Pagination, Grid } from '@mantine/core';
import type { Blog } from 'contentlayer/generated';
import { BlogOverView } from '@components/BlogOverView';
import { BlogListContainer } from '@components/BlogListContainer';
import { MdxContent } from '@components/MdxContent';
import { getBlog } from '@utils/getBlog';

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const { blog, totalPageCount } = getBlog();
  const pagePaths = new Array(totalPageCount).fill(0).map((_, i) => ({
    params: {
      page: [String(i + 1)],
    },
  }));
  const blogPaths = blog.map((blog) => ({
    params: {
      page: [blog.url],
    },
  }));

  return {
    paths: [
      {
        params: {
          page: [''],
        },
      },
      ...pagePaths,
      ...blogPaths,
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { page: string[] };
}) {
  const num = Number((params.page && params.page[0]) || 1);
  const isNaN = Number.isNaN(num);

  if (isNaN) {
    const { blog, totalPageCount } = getBlog();
    return {
      props: {
        blog: blog.find((blog) => blog.url === params.page[0]),
        totalPageCount,
      },
    };
  }

  const { blog, totalPageCount } = getBlog({
    currentPageNum: num,
  });

  return {
    props: {
      blog,
      totalPageCount,
      currentPageCount: num,
    },
  };
}

export default function Page({
  blog,
  totalPageCount,
  currentPageCount,
}: {
  blog: Blog[];
  totalPageCount: number;
  currentPageCount?: number;
}) {
  const router = useRouter();
  const [page, onChange] = useState(currentPageCount || 1);
  const pagination = usePagination({ total: totalPageCount, page, onChange });

  return (
    <>
      {!Array.isArray(blog) ? (
        <MdxContent blog={blog} />
      ) : (
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
          <Pagination
            sx={{
              justifyContent: 'center',
              marginTop: '20px',
            }}
            total={totalPageCount}
            page={currentPageCount}
            onChange={(num) => {
              pagination.setPage(num);
              router.push({
                pathname: '/blog/[page]',
                query: { page: num },
              });
            }}
          />
        </>
      )}
    </>
  );
}

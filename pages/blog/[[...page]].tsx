import { useState } from 'react';
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { usePagination } from '@mantine/hooks';
import { Grid, Title } from '@mantine/core';
import { LayoutBlog } from '@src/components/LayoutBlog';
import { BlogOverView } from '@src/components/BlogOverView';
import { BlogListContainer } from '@src/components/BlogListContainer';
import { MdxContent } from '@src/components/MdxContent';
import { Pager } from '@src/components/Pager';
import { getAllBlog } from '@src/utils/getBlog';

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const { blog, totalPageCount } = getAllBlog();
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!(params && params.page != undefined)) {
    const { blog, totalPageCount } = getAllBlog({
      currentPageCount: 1,
    });
    return {
      props: {
        blog,
        totalPageCount,
        currentPageCount: 1,
      },
    };
  }

  const num = Number((params.page && params.page[0]) || 1);
  const isNaN = Number.isNaN(num);

  if (isNaN) {
    const { blog, totalPageCount } = getAllBlog();
    return {
      props: {
        blog: blog.find((blog) => params.page && blog.url === params.page[0]),
        totalPageCount,
      },
    };
  }

  const { blog, totalPageCount } = getAllBlog({
    currentPageCount: num,
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [page, onChange] = useState(currentPageCount || 1);
  const pagination = usePagination({ total: totalPageCount, page, onChange });

  return (
    <>
      <LayoutBlog>
        {blog && !Array.isArray(blog) ? (
          <MdxContent blog={blog} />
        ) : (
          <>
            <Head>
              <title>blog - knmt.dev</title>
            </Head>
            <BlogListContainer>
              <Title order={1}>Blog</Title>

              <Grid mt={10}>
                {blog &&
                  blog.map((blog) => (
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
              path={'/blog/'}
            />
          </>
        )}
      </LayoutBlog>
    </>
  );
}

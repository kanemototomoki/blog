import type { Blog } from 'contentlayer/generated';
import Head from 'next/head';
import { BlogOverView } from '@components/BlogOverView';
import { BlogListContainer } from '@components/BlogListContainer';
import { Grid } from '@mantine/core';
import { Pagination } from '@mantine/core';
import { useState } from 'react';
import { usePagination } from '@mantine/hooks';
import { getBlog } from '@utils/getBlog';
import { useRouter } from 'next/router';
import { MdxContent } from '@components/MdxContent';

export async function getStaticPaths() {
  const { blog, totalPageCount } = getBlog();
  const pagePaths = new Array(totalPageCount).fill(0).map((_, i) => ({
    params: {
      page: String(i + 1),
    },
  }));
  const blogPaths = blog.map((blog) => ({
    params: {
      page: blog.url,
    },
  }));

  return {
    paths: [...pagePaths, ...blogPaths],
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const num = Number(context.params.page);
  const isNaN = Number.isNaN(num);

  if (isNaN) {
    const { blog, totalPageCount } = getBlog();
    return {
      props: {
        blog: blog.find((blog) => blog.url === context.params.page),
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
      <Head>
        <title>blog - knmt.dev</title>
      </Head>

      {!Array.isArray(blog) ? (
        <MdxContent blog={blog} />
      ) : (
        <>
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

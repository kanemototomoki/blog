import type { Blog } from 'contentlayer/generated';
import Head from 'next/head';
import { BlogOverView } from '@components/BlogOverView';
import { BlogListContainer } from '@components/BlogListContainer';
import { Grid } from '@mantine/core';
import { Pagination } from '@mantine/core';
import { useState } from 'react';
import { usePagination } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { getBlog } from '@utils/getBlog';

const PER_PAGE = 1;

export async function getStaticProps() {
  const { blog } = getBlog({ currentPageNum: 1, perPage: PER_PAGE });
  const lastPageCount = 3;
  return {
    props: {
      blog: blog.slice(0, PER_PAGE),
      lastPageCount,
      currentPageCount: 1,
    },
  };
}

export default function Page({
  blog,
  lastPageCount,
  currentPageCount,
}: {
  blog: Blog[];
  lastPageCount: number;
  currentPageCount: number;
}) {
  const router = useRouter();
  const [page, onChange] = useState(currentPageCount);
  const pagination = usePagination({ total: lastPageCount, page, onChange });

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
      <Pagination
        sx={{
          justifyContent: 'center',
          marginTop: '20px',
        }}
        total={lastPageCount}
        onChange={(num) => {
          pagination.setPage(num);
          if (num > 1) {
            router.push({
              pathname: '/blog/[page]',
              query: { page: num },
            });
          }
        }}
      />
    </>
  );
}

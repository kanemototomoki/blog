'use client';

import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { usePagination } from '@mantine/hooks';
import { Pagination, Grid } from '@mantine/core';
import type { Blog } from 'contentlayer/generated';
import { BlogOverView } from '@components/BlogOverView';
import { BlogListContainer } from '@components/BlogListContainer';
import { MdxContent } from '@components/MdxContent';
import { getBlog } from '@utils/getBlog';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // const { blog, totalPageCount, currentPageCount } = await getPage({ params });
  // const [page, onChange] = useState(currentPageCount || 1);
  // const pagination = usePagination({ total: totalPageCount, page, onChange });

  console.warn({ children });
  return null;
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
              router.push(`/blog/${num}`);
            }}
          />
        </>
      )}
    </>
  );
}

import { allBlogs } from 'contentlayer/generated';
import type { Blog } from 'contentlayer/generated';
import Head from 'next/head';
import { BlogOverView } from '@components/BlogOverView';
import { BlogListContainer } from '@components/BlogListContainer';
import { Grid } from '@mantine/core';

export async function getStaticProps() {
  const blog = allBlogs;
  return { props: { blog } };
}

export default function Page({ blog }: { blog: Blog[] }) {
  console.log({ blog})
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
    </>
  );
}

import Head from 'next/head';
import { allBlogs, Blog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { BackButton } from '@components/BackButton';
import { getBlog } from '@utils/getBlog';

// @ts-ignore
export async function getStaticPaths() {
  const paths = getBlog().blog.map((blog) => blog.url);

  return {
    paths: [...paths],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  return {
    props: {
      blog,
    },
  };
}

const BlogLayout = ({ blog }: { blog: Blog }) => {
  const MDXContent = useMDXComponent(blog.body.code);
  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <article>
        <div>
          <BackButton />
        </div>
        <div>
          <h1>{blog.title}</h1>
        </div>
        <MDXContent />
      </article>
    </>
  );
};

export default BlogLayout;

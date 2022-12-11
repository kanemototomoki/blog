import Head from 'next/head';
import Link from 'next/link';
import { allBlogs, Blog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { BackButton } from '@components/BackButton';

export async function getStaticPaths() {
  const paths = allBlogs.map((blog) => blog.url);
  return {
    paths,
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

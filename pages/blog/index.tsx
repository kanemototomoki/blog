import { allBlogs } from 'contentlayer/generated';
import type { Blog } from 'contentlayer/generated';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
  const blog = allBlogs;
  return { props: { blog } };
}

function BlogCard(blog: Blog) {
  return (
    <div>
      <time dateTime={blog.createdAt}>{blog.createdAt}</time>
      <h2>
        <Link href={blog.url}>{blog.title}</Link>
      </h2>
    </div>
  );
}

export default function Home({ blog }: { blog: Blog[] }) {
  console.warn({ blog });
  return (
    <div>
      <Head>
        <title>knmt.dev - 記事一覧</title>
      </Head>

      <h1>Contentlayer Blog Example</h1>

      {blog.map((blog, idx) => (
        <BlogCard key={idx} {...blog} />
      ))}
    </div>
  );
}

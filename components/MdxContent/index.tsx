import Head from 'next/head';
import { Blog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { BackButton } from '@components/BackButton';

export const MdxContent = ({ blog }: { blog: Blog }) => {
  const MDXContent = useMDXComponent(blog.body.code);
  return (
    <>
      <Head>
        <title>{`${blog.title} - knmt.dev`}</title>
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

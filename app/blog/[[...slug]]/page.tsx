
import type { Blog } from 'contentlayer/generated';
import { getBlog } from '@utils/getBlog';

export const dynamicParams = true;
export async function generateStaticParams() {
  const { blog, totalPageCount } = getBlog();
  const pagePaths = new Array(totalPageCount).fill(0).map((_, i) => ({
    slug: [String(i + 1)],
  }));
  const blogPaths = blog.map((blog) => ({
    slug: [blog.url],
  }));


  return [
    {
      slug: [''],
    },
    ...pagePaths,
    ...blogPaths,
  ];
}

export type Params = {
  slug: string[];
};

export async function getPage({ params }: { params: Params }): Promise<{
  blog: Blog[];
  totalPageCount: number;
  currentPageCount?: number;
}> {
  const { slug } = params;
  const num = Number((slug && slug[0]) || 1);
  const isNaN = Number.isNaN(num);

  if (isNaN) {
    const { blog, totalPageCount } = getBlog();
    return {
      blog: blog.find((blog) => blog.url === slug[0]) as unknown as Blog[],
      totalPageCount,
    };
  }

  const { blog, totalPageCount } = getBlog({
    currentPageNum: num,
  });

  return {
    blog,
    totalPageCount,
    currentPageCount: num,
  };
}

export default async function Page(params: Params) {
  const { blog, totalPageCount, currentPageCount } = await getPage({ params });

  return <h1>blog</h1>;
  // return (
  //   <>
  //     {!Array.isArray(blog) ? (
  //       <MdxContent blog={blog} />
  //     ) : (
  //       <>
  //         <Head>
  //           <title>blog - knmt.dev</title>
  //         </Head>
  //         <BlogListContainer>
  //           <h1>Blog</h1>

  //           <Grid>
  //             {blog.map((blog) => (
  //               <Grid.Col key={blog.title}>
  //                 <BlogOverView
  //                   tags={blog.tags}
  //                   title={blog.title}
  //                   url={blog.url}
  //                   createdAt={blog.createdAt}
  //                   updatedAt={blog.updatedAt}
  //                 />
  //               </Grid.Col>
  //             ))}
  //           </Grid>
  //         </BlogListContainer>
  //         <Pagination
  //           sx={{
  //             justifyContent: 'center',
  //             marginTop: '20px',
  //           }}
  //           total={totalPageCount}
  //           page={currentPageCount}
  //           onChange={(num) => {
  //             // pagination.setPage(num);
  //             // router.push({
  //             //   pathname: '/blog/[page]',
  //             //   query: { page: num },
  //             // });
  //           }}
  //         />
  //       </>
  //     )}
  //   </>
  // );
}

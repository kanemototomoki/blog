import { allBlogs, Blog } from 'contentlayer/generated';

export const PER_PAGE = 10;
export type Props = {
  currentPageNum?: number;
  perPage?: number;
};
export const getBlog = ({ currentPageNum, perPage = PER_PAGE }: Props = {}): {
  blog: Blog[];
  totalPageCount: number;
} => {
  const blog = allBlogs;
  const totalPageCount = Math.ceil(blog.length / perPage);

  if (!currentPageNum) {
    return {
      blog,
      totalPageCount,
    };
  }

  return {
    blog: blog.slice(
      Math.max(0, currentPageNum - 1),
      perPage * Math.max(0, currentPageNum - 1) + perPage
    ),
    totalPageCount,
  };
};

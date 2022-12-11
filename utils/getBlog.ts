import { allBlogs, Blog } from 'contentlayer/generated';

export type Props = {
  currentPageNum?: number;
  perPage?: number;
};
export const getBlog = ({ currentPageNum, perPage }: Props = {}): {
  blog: Blog[];
} => {
  const blog = allBlogs;

  if (!currentPageNum || !perPage) {
    return {
      blog,
    };
  }

  return {
    blog: blog.slice(
      Math.max(0, currentPageNum - 1),
      perPage * Math.max(0, currentPageNum - 1) + perPage
    ),
  };
};

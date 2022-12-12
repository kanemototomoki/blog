import { allBlogs, Blog } from 'contentlayer/generated';

export const PER_PAGE = 1;
export type Props = {
  currentPageNum?: number;
  perPage?: number;
};
/**
 * @desc 日付順(desc)でソートされた全blogを返却する
 */
export const getBlog = ({ currentPageNum, perPage = PER_PAGE }: Props = {}): {
  blog: Blog[];
  totalPageCount: number;
} => {
  const blog = allBlogs.sort((a, b) => {
    return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
  });

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

/**
 * @desc descでソートされたタグ一覧を返す
 */
export const getAllTags = (): string[] => {
  const tags = getBlog().blog.map((blog) => blog.tags).flat();
  const map = new Map<string, number>();

  for (let i = 0; i < tags.length; i++) {
    if (map.has(tags[i])) {
      map.set(tags[i], map.get(tags[i])! + 1);
    } else {
      map.set(tags[i], 1);
    }
  }

  // desc
  const result = [...map.entries()]
    .sort((a, b) => {
      return a[1] > b[1] ? -1 : 1;
    })
    .map((v) => v[0]);

  return [...new Set(result)];
};

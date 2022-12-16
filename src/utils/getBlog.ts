import { allBlogs, Blog } from 'contentlayer/generated';

export const PER_PAGE = 10;
export type Props = {
  currentPageCount?: number;
};
/**
 * @desc 日付順(desc)でソートされた全blogを返却する
 */
export const getAllBlog = ({ currentPageCount }: Props = {}): {
  blog: Blog[];
  totalPageCount: number;
} => {
  const blog = allBlogs.sort((a, b) => {
    return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
  });

  const totalPageCount = Math.ceil(blog.length / PER_PAGE);

  if (!currentPageCount) {
    return {
      blog,
      totalPageCount,
    };
  }

  return {
    blog: blog.slice(
      Math.max(0, currentPageCount * PER_PAGE) - PER_PAGE,
      Math.max(0, currentPageCount - 1) * PER_PAGE + PER_PAGE
    ),
    totalPageCount,
  };
};

/**
 * @desc 日付順(desc)でソート & 指定されたタグの全blogを返却する
 */
export const getBlogByTag = ({
  tag,
  currentPageCount,
}: Props & {
  tag: string;
}): {
  blog: Blog[];
  totalPageCount: number;
} => {
  const { blog } = getAllBlog();
  const matchedBlog = blog.filter((v) => v.tags.includes(tag));
  const totalPageCount = Math.ceil(matchedBlog.length / PER_PAGE);

  if (!currentPageCount) {
    return {
      blog,
      totalPageCount,
    };
  }

  return {
    blog: matchedBlog.slice(
      Math.max(0, currentPageCount * PER_PAGE) - PER_PAGE,
      Math.max(0, currentPageCount - 1) * PER_PAGE + PER_PAGE
    ),
    totalPageCount,
  };
};

/**
 * @desc descでソートされたタグ一覧を返す
 */
export const getAllTags = (): {
  tags: string[];
  all: {
    tag: string;
    totalPageCount: number;
  }[];
} => {
  const tags = getAllBlog()
    .blog.map((blog) => blog.tags)
    .flat();
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
    .map((v) => ({
      tag: v[0],
      totalPageCount: Math.ceil(v[1] / PER_PAGE),
    }));

  return {
    tags: [...new Set(result.map((v) => v.tag))],
    all: result,
  };
};

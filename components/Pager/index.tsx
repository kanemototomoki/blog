import { FC } from 'react';
import router from 'next/router';
import { Pagination } from '@mantine/core';
import { usePagination } from '@mantine/hooks';

export type Props = {
  totalPageCount: number;
  currentPageCount: number;
  pagination: ReturnType<typeof usePagination>;
  path: string;
};
export const Pager: FC<Props> = (props) => {
  const { totalPageCount, currentPageCount, pagination, path } = props;
  return (
    <Pagination
      sx={{
        justifyContent: 'center',
        marginTop: '20px',
      }}
      total={totalPageCount}
      page={currentPageCount}
      onChange={(num) => {
        pagination.setPage(num);
        router.push(`${path}${num}`);
      }}
    />
  );
};

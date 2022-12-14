import { ReactElement } from 'react';
import { Grid } from '@mantine/core';
import { SideContent } from '@src/components/SideContent';

/**
 * @desc /blog* のレイアウト
 */
export const LayoutBlog = ({ children }: { children: ReactElement }) => {
  return (
    <Grid>
      <Grid.Col span={3}>
        <SideContent blog={children.props.blog} />
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
};

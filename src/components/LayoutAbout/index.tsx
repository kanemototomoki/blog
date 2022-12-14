import { ReactElement } from 'react';
import { Grid } from '@mantine/core';

/**
 * @desc /about のレイアウト
 */
export const LayoutAbout = ({ children }: { children: ReactElement }) => {
  return (
    <Grid>
      <Grid.Col span={12}>{children}</Grid.Col>
    </Grid>
  );
};

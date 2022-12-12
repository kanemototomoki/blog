import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';

export type Props = {
  children: ReactNode;
};
export const StyleProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'dark',
        colors: {
          dark: [
            '#d5d7e0',
            '#acaebf',
            '#8c8fa3',
            '#666980',
            '#4d4f66',
            '#34354a',
            '#2b2c3d',
            '#1d1e30',
            '#0c0d21',
            '#01010a',
          ],
        },
        fontFamily:
          'Noto Sans JP, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      }}
    >
      {children}
    </MantineProvider>
  );
};

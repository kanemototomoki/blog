import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '@code-hike/mdx/dist/index.css';
import 'style/globals.css';
import { HeaderSearch as MyHeader } from '@components/Header';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

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
        <>
          <MyHeader
            links={[
              {
                link: '/blog',
                label: 'blog',
              },
            ]}
          />
          <main
            style={{
              maxWidth: '70vw',
              margin: 'auto',
              padding: '30px'
            }}
          >
            <Component {...pageProps} />
          </main>
        </>
      </MantineProvider>
    </>
  );
}

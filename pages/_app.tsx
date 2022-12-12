import '@code-hike/mdx/dist/index.css';
import 'style/globals.css';

import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid } from '@mantine/core';
import { AppHeader } from '@components/Header';
import { SideContent } from '@components/SideContent';
import { StyleProvider } from '@components/StyleProvider';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { route } = useRouter();
  const [activeTab, setActiveTab] = useState<'about' | 'blog'>('about');

  useEffect(() => {
    switch (route) {
      case '/blog/[[...page]]':
        setActiveTab('blog');
        break;
      case '/':
      default:
        setActiveTab('about');
    }
  }, [activeTab, route]);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <div
        style={{
          maxWidth: '80vw',
          margin: 'auto',
        }}
      >
        <StyleProvider>
          <AppHeader activeTab={activeTab} />
          <main
            style={{
              padding: '30px',
            }}
          >
            <Grid>
              <Grid.Col span={3}>
                <SideContent />
              </Grid.Col>
              <Grid.Col span={9}>
                <Component {...pageProps} />
              </Grid.Col>
            </Grid>
          </main>
        </StyleProvider>
      </div>
    </>
  );
}

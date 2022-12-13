import '@code-hike/mdx/dist/index.css';
import 'style/globals.css';

import { useEffect, useState, ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AppHeader } from '@components/Header';
import { StyleProvider } from '@components/StyleProvider';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { route } = useRouter();
  const [activeTab, setActiveTab] = useState<'about' | 'blog'>('about');

  useEffect(() => {
    const path = route.split('/')[1];
    switch (path) {
      case 'blog':
        setActiveTab('blog');
        break;
      case '/':
      default:
        setActiveTab('about');
    }
  }, [activeTab, route]);

  return getLayout(
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <StyleProvider>
        <div
          style={{
            maxWidth: '80vw',
            margin: 'auto',
          }}
        >
          <AppHeader activeTab={activeTab} />
          <main
            style={{
              padding: '30px',
            }}
          >
            <Component {...pageProps} />
          </main>
        </div>
      </StyleProvider>
    </>
  );
}

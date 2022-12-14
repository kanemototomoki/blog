import '@code-hike/mdx/dist/index.css';
import '@src/style/globals.css';

import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { LayoutBaseCenter } from '@src/components/LayoutBaseCenter';
import { StyleProvider } from '@src/components/StyleProvider';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <StyleProvider>
        <LayoutBaseCenter>
          <main
            style={{
              padding: '30px',
            }}
          >
            <Component {...pageProps} />
          </main>
        </LayoutBaseCenter>
      </StyleProvider>
    </>
  );
}

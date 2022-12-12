'use client';

import '@code-hike/mdx/dist/index.css';
import 'style/globals.css';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { Grid } from '@mantine/core';
import { AppHeader } from '@components/Header';
import { SideContent } from '@components/SideContent';
import { StyleProvider } from '@components/StyleProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'about' | 'blog'>('about');

  useEffect(() => {
    // console.warn({ pathname });
    switch (pathname) {
      case '/blog/[[...page]]':
        setActiveTab('blog');
        break;
      case '/':
      default:
        setActiveTab('about');
    }
  }, [activeTab, pathname]);

  return (
    <html lang='ja'>
      <body>
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
                  {children}
                </Grid.Col>
              </Grid>
            </main>
          </StyleProvider>
        </div>
      </body>
    </html>
  );
}

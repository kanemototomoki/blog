import type { ReactElement } from 'react';
import Head from 'next/head';
import type { NextPageWithLayout } from './_app';
import { LayoutAbout } from '@src/components/LayoutAbout';
import { Title, Text, Group, Grid } from '@mantine/core';
import Link from 'next/link';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Title order={1}>このサイトはいったい？</Title>
      <Group mt={10}>
        <Grid>
          <Grid.Col>
            <Text weight={700}>
              <Link href={'https://twitter.com/knmt_fe'}>@knmt_fe</Link> の blog
            </Text>
          </Grid.Col>
          <Grid.Col>
            <Text>最近はRustにハマってる</Text>
          </Grid.Col>
        </Grid>
      </Group>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <LayoutAbout>
        <>
          <Head>
            <title>about - knmt.dev</title>
            <meta name='description' content='blog by knmt' />
          </Head>
          {page}
        </>
      </LayoutAbout>
    </>
  );
};

export default Page;

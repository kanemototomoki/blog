import type { ReactElement } from 'react';
import Head from 'next/head';
import type { NextPageWithLayout } from './_app';
import { LayoutAbout } from '@components/LayoutAbout';
import { Title, Text, Group } from '@mantine/core';
import Link from 'next/link';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Title order={1}>誰のブログ？</Title>
      <Group mt={10}>
        <Text>
          <Link href={'https://twitter.com/knmt_fe'}>👉 @knmt_fe</Link>
        </Text>
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

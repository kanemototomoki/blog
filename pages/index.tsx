import type { NextPage } from 'next';
import Head from 'next/head';
import { HeaderSearch as MyHeader } from '@components/ui/Header';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>knmt-blog</title>
        <meta name='description' content='blog by knmt' />
      </Head>

      <MyHeader
        links={[
          {
            link: 'blog',
            label: 'blog',
          },
        ]}
      />
      <main>
        <h1>hello</h1>
      </main>
    </div>
  );
};

export default Home;

import type { NextPage } from 'next';

export const getStaticProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: '/blog/1',
    },
  };
};

const Page: NextPage = () => {
  return null;
};

export default Page;

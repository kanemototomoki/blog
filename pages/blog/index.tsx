import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/blog/1');
  }, [router]);
  return null;
};

export default Page;

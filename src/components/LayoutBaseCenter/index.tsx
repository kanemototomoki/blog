import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Center } from '@mantine/core';
import { AppHeader } from '@src/components/Header';

/**
 * @desc 全てのページ共通のレイアウト
 */
export const LayoutBaseCenter = ({ children }: { children: ReactElement }) => {
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
  return (
    <Center
      sx={{
        maxWidth: '80vw',
        margin: 'auto',
        display: 'block',
      }}
    >
      <AppHeader activeTab={activeTab} />
      {children}
    </Center>
  );
};

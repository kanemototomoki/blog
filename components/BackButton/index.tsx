import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons';

export const BackButton: FC = () => {
  const router = useRouter();
  return (
    <Button
      leftIcon={<IconArrowBack />}
      aria-label='戻る'
      onClick={() => router.back()}
      variant='outline'
      color='gray'
    >
      戻る
    </Button>
  );
};

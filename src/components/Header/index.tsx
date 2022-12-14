import { FC } from 'react';
import Link from 'next/link';
import { createStyles, Header, Group, Grid, Text, Flex } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    '&:hover': {
      backgroundColor: theme.colors.dark[3],
    },
  },
}));

export type Props = {
  activeTab: 'about' | 'blog';
};
export const AppHeader: FC<Props> = (props) => {
  const { classes } = useStyles();
  const { activeTab } = props;

  const items = [
    {
      tab: 'about',
      label: 'about',
      path: '/',
    },
    {
      tab: 'blog',
      label: 'blog',
      path: '/blog',
    },
  ].map((v, i) => {
    return (
      <Group
        key={v.tab}
        w={'fit-content'}
        ml={i > 0 ? 15 : 0}
        className={classes.item}
        sx={(theme) => {
          if (activeTab !== v.tab) {
            return {};
          }

          return {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
          };
        }}
      >
        <Link href={v.path}>
          <Text size='xl' fw={700} p={8}>
            {v.label}
          </Text>
        </Link>
      </Group>
    );
  });

  return (
    <Header height={56} className={classes.header} mb={0}>
      <div className={classes.inner}>
        <Group>
          <Group ml={20} spacing={5}>
            <Flex align='flex-start' direction='row'>
              {items}
            </Flex>
          </Group>
        </Group>
      </div>
    </Header>
  );
};

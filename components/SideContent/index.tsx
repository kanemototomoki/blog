import { FC, memo } from 'react';
import Link from 'next/link';
import {
  Card,
  Container,
  Text,
  createStyles,
  Group,
  Grid,
} from '@mantine/core';
import { getAllTags } from '@utils/getBlog';

export type Props = {};

const useStyles = createStyles((theme) => ({
  tag: {
    '&:hover': {
      backgroundColor: theme.colors.dark[3],
    },
  },
}));

const _SideContent: FC<Props> = (props) => {
  const { classes } = useStyles();
  const tags = getAllTags();

  const tagLinks = tags.map((tag) => {
    return (
      <Grid.Col
        key={tag}
        p={4}
        sx={{
          flexBasis: 'auto',
        }}
      >
        <Group
          key={tag}
          sx={(theme) => {
            return {
              display: 'inline-block',
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[5]
                  : theme.white,
            };
          }}
          className={classes.tag}
        >
          <Link href={tag}>
            <Text size='md' fw={500} p={4}>
              {tag}
            </Text>
          </Link>
        </Group>
      </Grid.Col>
    );
  });

  return (
    <Container px={0}>
      <Card
        withBorder
        radius='md'
        sx={(theme) => {
          return {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          };
        }}
      >
        <Text size='xl' fw={700}>
          # tags
        </Text>
        <Grid mt={15}>{tagLinks}</Grid>
      </Card>
    </Container>
  );
};

export const SideContent = memo(_SideContent);

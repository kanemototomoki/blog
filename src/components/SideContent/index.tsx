import { FC, memo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Card,
  Container,
  Text,
  createStyles,
  Group,
  Grid,
} from '@mantine/core';
import { Blog } from 'contentlayer/generated';
import { getAllTags } from '@src/utils/getBlog';
import { MdxTOC } from '@src/components/MdxTOC';

export type Props = {
  blog: Blog;
};

const useStyles = createStyles((theme) => ({
  tag: {
    '&:hover': {
      backgroundColor: theme.colors.dark[3],
    },
  },
}));

const _SideContent: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const { blog } = props;
  const { classes } = useStyles();
  const { tags } = getAllTags();
  const title = blog ? 'TOC' : '# tags';

  useEffect(() => {
    if (ref.current != null) {
      setTop(ref.current.getBoundingClientRect().top - 56);
    }
  }, []);

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
          <Link href={`/blog/tags/${tag}`}>
            <Text size='md' fw={500} p={4}>
              {tag}
            </Text>
          </Link>
        </Group>
      </Grid.Col>
    );
  });

  const element = blog ? <MdxTOC blog={blog} /> : tagLinks;

  return (
    <div ref={ref} style={{ position: 'sticky', top }}>
      <Container px={0}>
        <Card
          withBorder
          radius='md'
          sx={(theme) => {
            return {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.white,
            };
          }}
        >
          <Text size='xl' fw={700}>
            {title}
          </Text>
          <Grid mt={15}>{element}</Grid>
        </Card>
      </Container>
    </div>
  );
};

export const SideContent = memo(_SideContent);

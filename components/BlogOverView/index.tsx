import { createStyles, Card, Text, Container, Grid } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

interface BlogOverViewProps {
  tags: string[];
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export function BlogOverView({
  tags,
  title,
  url,
  createdAt,
  updatedAt,
}: BlogOverViewProps) {
  const { classes } = useStyles();

  const tagsText = tags.map((tag) => `#${tag}`).join(' ');
  return (
    <Container fluid sx={(theme) => ({})} px={0}>
      <Card withBorder radius='md' p={0} className={classes.card}>
        <Grid className={classes.body} align='center'>
          <Grid.Col span={12}>
            <Text className={classes.title} mt='xs' mb='xs'>
              <Link href={`/blog/${url}`}>{title}</Link>
            </Text>
          </Grid.Col>
          <Grid.Col span='auto'>
            <Text color='dimmed' weight={700} size='xs'>
              <p>{tagsText}</p>
            </Text>
          </Grid.Col>
          <Grid.Col
            span={6}
            sx={{
              textAlign: 'right',
            }}
          >
            <Text size='xs' color='dimmed'>
              created: {createdAt}
            </Text>
            <Text size='xs' color='dimmed'>
              updated: {updatedAt}
            </Text>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
}

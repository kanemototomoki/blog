import { FC } from 'react';
import { Blog } from 'contentlayer/generated';
import { Grid, Group } from '@mantine/core';

export type Props = {
  blog: Blog;
};
export const MdxTOC: FC<Props> = (props) => {
  const { headings } = props.blog;

  return (
    <Group>
      <Grid>
        {headings.map(
          (heading: { slug: string; level: number; text: string }) => {
            return (
              <Grid.Col
                key={`#${heading.slug}`}
                sx={{
                  textIndent: `${heading.level / 2}em`,
                }}
              >
                <a href={`#${heading.slug}`}>{heading.text}</a>
              </Grid.Col>
            );
          }
        )}
      </Grid>
    </Group>
  );
};

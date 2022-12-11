import { Container } from '@mantine/core';

export type Props = {
  children: React.ReactNode;
};
export function BlogListContainer({ children }: Props) {
  return (
    <Container fluid sx={{}}>
      {children}
    </Container>
  );
}

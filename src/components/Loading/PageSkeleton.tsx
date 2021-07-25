import { Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

function PageSkeleton(): JSX.Element {
  return (
    <Stack spacing={5}>
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
    </Stack>
  );
}

export default PageSkeleton;

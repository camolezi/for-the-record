import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

function LoadingSpinner(): JSX.Element {
  return (
    <Center>
      <Spinner size="xl" my={5} />
    </Center>
  );
}

export default LoadingSpinner;

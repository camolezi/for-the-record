import { Container } from '@chakra-ui/react';
import React from 'react';
import PageSkeleton from '../../components/Loading/PageSkeleton';
import { selectIsLoadingInitialState } from '../../modules/Authentication/state/UserSelectors';
import { useTypedSelector } from '../Store';

export default function WithInitialPageSkeleton({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const appIsLoading = useTypedSelector(selectIsLoadingInitialState);

  return (
    <>
      {appIsLoading ? (
        <Container maxW="container.sm" mt={5}>
          <PageSkeleton />
        </Container>
      ) : (
        children
      )}
    </>
  );
}

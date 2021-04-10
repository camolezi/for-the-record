import React from 'react';
import { Container } from '@chakra-ui/react';
import RecordPanel from '../modules/Recording/RecordPanel';

function RecordView(): JSX.Element {
  return (
    <Container maxW="container.xl" bg="#b5d2f5" centerContent>
      <RecordPanel />
    </Container>
  );
}

export default RecordView;

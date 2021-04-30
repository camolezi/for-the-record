import React from 'react';
import { Container } from '@chakra-ui/react';
import Calendar from '../components/Calendar/Calendar';

function CelendarView(): JSX.Element {
  return (
    <Container maxW="container.xl" centerContent height={['90%', '80%', '60%']}>
      <Calendar date={new Date()} />
    </Container>
  );
}

export default CelendarView;

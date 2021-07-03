import React from 'react';
import { Container } from '@chakra-ui/react';
import CelendarWidget from '../modules/Calendar/CalendarWIdget';

function CelendarView(): JSX.Element {
  return (
    <Container maxW="container.xl" centerContent height={['90%', '80%', '60%']}>
      <CelendarWidget />
    </Container>
  );
}

export default CelendarView;

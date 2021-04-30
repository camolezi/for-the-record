import React from 'react';
import { Container } from '@chakra-ui/react';
import CalendarMonth from '../components/Calendar/MonthCalendar/CalendarMonth';

function CelendarView(): JSX.Element {
  const mockMonth: number[] = Array.from(Array(31).keys(), (key) => key + 1);

  return (
    <Container maxW="container.xl" centerContent height={['90%', '80%', '60%']}>
      <CalendarMonth days={mockMonth} />
    </Container>
  );
}

export default CelendarView;

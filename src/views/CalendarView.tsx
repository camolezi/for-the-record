import React from 'react';
import { Box } from '@chakra-ui/react';
import CelendarWidget from '../modules/Calendar/CalendarWIdget';

function CelendarView(): JSX.Element {
  return (
    <Box centerContent boxSize="100%">
      <CelendarWidget />
    </Box>
  );
}

export default CelendarView;

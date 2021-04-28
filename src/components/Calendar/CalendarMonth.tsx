import React from 'react';
import {} from 'date-fns';
import { SimpleGrid } from '@chakra-ui/react';
import Tile from './Tile/Tile';

export interface CalendarMonthProps {
  text: string;
}

const Calendar: React.FC<CalendarMonthProps> = ({ text }) => {
  const days = [0, 1, 2, 3, 4, 5, 6];
  const tiles = days.map((day) => <Tile text={String(day)} />);

  return (
    <>
      <h1>{text}</h1>
      <SimpleGrid columns={7} spacingX={[2, 3, 5, 5]} spacingY={[1, 2, 3, 3]}>
        {tiles}
        {tiles}
        {tiles}
      </SimpleGrid>
    </>
  );
};

export default Calendar;

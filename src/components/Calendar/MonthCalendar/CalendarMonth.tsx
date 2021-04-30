import React from 'react';
import {} from 'date-fns';
import { SimpleGrid, Text } from '@chakra-ui/react';
import Tile from '../Tile/Tile';

export interface CalendarMonthProps {
  days: number[];
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ days }) => {
  const tiles = days.map((day) => <Tile text={String(day)} />);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const weekDaysTitles = weekDays.map((day) => (
    <Text bgColor="blue.600" textAlign="center">
      {day}
    </Text>
  ));

  return (
    <>
      <SimpleGrid
        width="100%"
        columns={7}
        spacingX={[2, 3, 5, 5]}
        spacingY={[2, 2, 3, 3]}
      >
        {weekDaysTitles}
        {tiles}
      </SimpleGrid>
    </>
  );
};

export default CalendarMonth;

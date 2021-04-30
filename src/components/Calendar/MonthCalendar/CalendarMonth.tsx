import React from 'react';
import {} from 'date-fns';
import { SimpleGrid, Text } from '@chakra-ui/react';
import Tile from '../Tile/Tile';
import {
  getWeekDayIndex,
  getWeekDays,
  WeekDay,
} from '../../../utils/DateTime/WeekDays';

export interface CalendarMonthProps {
  days: number[];
  startAtDay: WeekDay;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ days, startAtDay }) => {
  const tiles = days.map((day) => <Tile text={String(day)} />);

  const weekDays = getWeekDays();

  const weekDayOffset = getWeekDayIndex(startAtDay);

  const tilesOffset = new Array(weekDayOffset)
    .fill(0)
    .map(() => <Tile text="" />);

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
        {tilesOffset}
        {tiles}
      </SimpleGrid>
    </>
  );
};

export default CalendarMonth;

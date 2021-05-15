import React from 'react';
import {} from 'date-fns';
import { SimpleGrid, Text } from '@chakra-ui/react';
import Tile from '../Tile/Tile';
import {
  getWeekDayIndex,
  getWeekDays,
  WeekDay,
} from '../../../utils/DateTime/WeekDays';

type RecordInDays = {
  [dayNumber: number]: number;
};

export interface CalendarMonthProps {
  numberOfDays: number;
  startAtDay: WeekDay;
  recordsDays: RecordInDays;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  numberOfDays,
  startAtDay,
  recordsDays,
}) => {
  const tiles = Array.from(Array(numberOfDays).keys(), (key) => key + 1).map(
    (day) => <Tile text={String(day)} recordsNumber={recordsDays[day]} />
  );

  const weekDayOffset = getWeekDayIndex(startAtDay);
  const tilesOffset = new Array(weekDayOffset)
    .fill(0)
    .map(() => <Tile text="" />);

  const weekDays = getWeekDays();
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

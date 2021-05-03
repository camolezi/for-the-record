import React from 'react';
import { Center, Heading, HStack, Text } from '@chakra-ui/react';
import {
  formatToMonthYear,
  getFirstWeekDayInMonth,
  getNumberDaysInMonth,
} from '../../utils/DateTime/WeekDays';
import CalendarMonth from './MonthCalendar/CalendarMonth';
import MonthButton from './MonthCalendar/MonthButton';
import MotionBox from '../Motion/MotionBox';

export interface CalendarProps {
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const daysInMonth = getNumberDaysInMonth(date);

  const allDaysInMonth: number[] = Array.from(
    Array(daysInMonth).keys(),
    (key) => key + 1
  );

  const firstDayInMonth = getFirstWeekDayInMonth(date);

  const monthTitle = formatToMonthYear(date);

  return (
    <>
      <HStack justify="center" spacing={8} marginBottom={4}>
        <MonthButton aria-label="PreviousMonth">
          <Text textAlign="center">{'<'}</Text>
        </MonthButton>

        <Center>
          <MotionBox layout initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}>
            <Heading textAlign="center">{monthTitle}</Heading>
          </MotionBox>
        </Center>

        <MonthButton aria-label="NextMonth">
          <Text textAlign="center">{'>'}</Text>
        </MonthButton>
      </HStack>

      <CalendarMonth days={allDaysInMonth} startAtDay={firstDayInMonth} />
    </>
  );
};

export default Calendar;

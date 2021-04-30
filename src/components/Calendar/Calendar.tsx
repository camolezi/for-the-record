import React from 'react';
import { Heading } from '@chakra-ui/react';
import {
  formatToMonthYear,
  getFirstWeekDayInMonth,
  getNumberDaysInMonth,
} from '../../utils/DateTime/WeekDays';
import CalendarMonth from './MonthCalendar/CalendarMonth';

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
      <Heading marginBottom={4} textAlign="center">
        {monthTitle}
      </Heading>
      <CalendarMonth days={allDaysInMonth} startAtDay={firstDayInMonth} />
    </>
  );
};

export default Calendar;

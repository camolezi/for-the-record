import React, { useState } from 'react';
import { Center, Heading, HStack, Text } from '@chakra-ui/react';
import {
  formatToMonthYear,
  getFirstWeekDayInMonth,
  getNextMonth,
  getNumberDaysInMonth,
  getPreviousMonth,
} from '../../utils/DateTime/WeekDays';
import CalendarMonth from './MonthCalendar/CalendarMonth';
import MonthButton from './MonthCalendar/MonthButton';
import MotionBox from '../Motion/MotionBox';

export interface CalendarProps {
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  const [currentDate, setCurrentDate] = useState(date);

  const daysInMonth = getNumberDaysInMonth(currentDate);
  const allDaysInMonth: number[] = Array.from(
    Array(daysInMonth).keys(),
    (key) => key + 1
  );

  const firstDayInMonth = getFirstWeekDayInMonth(currentDate);
  const monthTitle = formatToMonthYear(currentDate);

  return (
    <>
      <HStack justify="center" spacing={8} marginBottom={4}>
        <MonthButton
          aria-label="PreviousMonth"
          onClick={async () => {
            setCurrentDate(getPreviousMonth(currentDate));
          }}
        >
          <Text textAlign="center">{'<'}</Text>
        </MonthButton>

        <Center>
          <MotionBox
            key={`CalendarTitle_${monthTitle}`}
            layout
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
          >
            <Heading textAlign="center">{monthTitle}</Heading>
          </MotionBox>
        </Center>

        <MonthButton
          aria-label="NextMonth"
          onClick={() => {
            setCurrentDate(getNextMonth(currentDate));
          }}
        >
          <Text textAlign="center">{'>'}</Text>
        </MonthButton>
      </HStack>

      <CalendarMonth
        key={`CalendarMonth_${monthTitle}`}
        days={allDaysInMonth}
        startAtDay={firstDayInMonth}
      />
    </>
  );
};

export default Calendar;

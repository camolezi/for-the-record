import React from 'react';
import { Center, Heading, HStack, Text } from '@chakra-ui/react';
import {
  formatToMonthYear,
  getFirstWeekDayInMonth,
  getNumberDaysInMonth,
} from '../../utils/DateTime/WeekDays';
import CalendarMonth, { RecordInDays } from './MonthCalendar/CalendarMonth';
import MonthButton from './MonthCalendar/MonthButton';
import MotionBox from '../Motion/MotionBox';

export interface CalendarProps {
  date: Date;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
  recordingDays: RecordInDays;
}

const Calendar: React.FC<CalendarProps> = ({
  date,
  onNextMonth,
  onPreviousMonth,
  recordingDays = {},
}) => {
  const daysInMonth = getNumberDaysInMonth(date);
  const firstDayInMonth = getFirstWeekDayInMonth(date);
  const monthTitle = formatToMonthYear(date);

  return (
    <>
      <HStack justify="center" spacing={8} marginBottom={4}>
        <MonthButton
          aria-label="PreviousMonth"
          onClick={() => onPreviousMonth()}
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

        <MonthButton aria-label="NextMonth" onClick={() => onNextMonth()}>
          <Text textAlign="center">{'>'}</Text>
        </MonthButton>
      </HStack>

      <CalendarMonth
        key={`CalendarMonth_${monthTitle}`}
        numberOfDays={daysInMonth}
        startAtDay={firstDayInMonth}
        recordsDays={recordingDays}
      />
    </>
  );
};

export default Calendar;

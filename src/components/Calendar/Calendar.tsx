import React from 'react';
import {} from 'date-fns';
import CalendarMonth from './MonthCalendar/CalendarMonth';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  const mockMonth: number[] = Array.from(Array(31).keys(), (key) => key + 1);

  return <CalendarMonth days={mockMonth} />;
};

export default Calendar;

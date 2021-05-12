import React, { useState } from 'react';
import { getNextMonth, getPreviousMonth } from '../../utils/DateTime/WeekDays';
import Calendar from './Calendar';

function CelendarWidget(): JSX.Element {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Calendar
      date={currentDate}
      onNextMonth={() => setCurrentDate(getNextMonth(currentDate))}
      onPreviousMonth={() => setCurrentDate(getPreviousMonth(currentDate))}
    />
  );
}

export default CelendarWidget;

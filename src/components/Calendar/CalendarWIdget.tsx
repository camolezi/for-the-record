import React, { useState, useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../app/Store';
import { getNextMonth, getPreviousMonth } from '../../utils/DateTime/WeekDays';
import { loadMonthRecordigns } from './actions/CalendarActions';
import Calendar from './Calendar';
import DayRecordingsDisplay from './DayRecordingsDisplay/DayRecordingsDisplay';
import {
  selectDayRecordingHeaders,
  selectMonthRecordingObject,
} from './store/CalendarSelectors';

function CelendarWidget(): JSX.Element {
  const dispatch = useTypedDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthRecordingObject = useTypedSelector(selectMonthRecordingObject);
  const dayRecordingHeaders = useTypedSelector(selectDayRecordingHeaders);

  useEffect(() => {
    dispatch(loadMonthRecordigns(currentDate));
  }, [currentDate, dispatch]);

  return (
    <>
      <Calendar
        date={currentDate}
        onNextMonth={() => setCurrentDate(getNextMonth(currentDate))}
        onPreviousMonth={() => setCurrentDate(getPreviousMonth(currentDate))}
        recordingDays={monthRecordingObject}
      />
      <DayRecordingsDisplay dayRecordingHeaders={dayRecordingHeaders} />
    </>
  );
}

export default CelendarWidget;

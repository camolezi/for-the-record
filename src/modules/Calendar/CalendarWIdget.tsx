import { Box, Stack } from '@chakra-ui/react';
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
    // TODO - Dispatch is slowing down calendar animation
    dispatch(loadMonthRecordigns(currentDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <Stack
      direction={['column', 'column', 'column', 'row']}
      spacing={3}
      m={[2, 2, 3, 5]}
      justify="center"
      align="stretch"
    >
      <Box width={['100%', '100%', '100%', '58%']} bg="purple.300">
        <Calendar
          date={currentDate}
          onNextMonth={() => setCurrentDate(getNextMonth(currentDate))}
          onPreviousMonth={() => setCurrentDate(getPreviousMonth(currentDate))}
          recordingDays={monthRecordingObject}
        />
      </Box>

      <Box width={['100%', '100%', '100%', '42%']}>
        <DayRecordingsDisplay dayRecordingHeaders={dayRecordingHeaders} />
      </Box>
    </Stack>
  );
}

export default CelendarWidget;

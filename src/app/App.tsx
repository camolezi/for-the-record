import { Box } from '@chakra-ui/react';
import React from 'react';

import { Routes, Route, Link } from 'react-router-dom';
import ColorModeButton from '../components/ColorModeButton';
import CalendarView from '../views/CalendarView';
import RecordView from '../views/RecordView';

function App(): JSX.Element {
  const recordView = (
    <Box height="80vh">
      <RecordView />
    </Box>
  );

  const calendarView = (
    <Box height="80vh">
      <CalendarView />
    </Box>
  );

  return (
    <>
      <Box height="7vh">
        <ColorModeButton />
        <Link to="calendar">calendar</Link>
      </Box>

      <Routes>
        <Route path="/*" element={recordView} />
        <Route path="calendar" element={calendarView} />
      </Routes>
    </>
  );
}

export default App;

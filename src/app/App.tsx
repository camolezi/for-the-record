import { Box } from '@chakra-ui/react';
import React from 'react';

import { Routes, Route, Link } from 'react-router-dom';
import ColorModeButton from '../components/ColorModeButton';
import CalendarView from '../views/CalendarView';
import CreateUserView from '../views/CreateUserView';
import LoginView from '../views/LoginView';
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

  const loginView = (
    <Box height="80vh">
      <LoginView />
    </Box>
  );

  const createUserView = (
    <Box height="80vh">
      <CreateUserView />
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
        <Route path="login" element={loginView} />
        <Route path="create" element={createUserView} />
      </Routes>
    </>
  );
}

export default App;

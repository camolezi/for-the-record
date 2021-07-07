import { Box, Link as UILink } from '@chakra-ui/react';
import React from 'react';

import { Routes, Route, Link } from 'react-router-dom';
import ColorModeButton from '../components/ColorModeButton';
import PlaybackPanel from '../modules/Playback/PlaybackPanel';
import CalendarView from '../views/CalendarView';
import CreateUserView from '../views/CreateUserView';
import LoginView from '../views/LoginView';
import RecordView from '../views/RecordView';
import LoadInitialState from './LoadInitialState/LoadInitialStateHook';

function App(): JSX.Element {
  LoadInitialState();

  const playBack = <PlaybackPanel />;

  const recordView = (
    <Box height="80vh">
      <RecordView />
      {playBack}
    </Box>
  );

  const calendarView = (
    <Box height="80vh">
      <CalendarView />
      {playBack}
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
        <Link to="calendar">
          <UILink>Calendar</UILink>
        </Link>
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

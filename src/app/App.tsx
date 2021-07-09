import { Box, Flex, Link as UILink, Spacer } from '@chakra-ui/react';
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

  const withPlaybackLayout = (page: React.ReactNode) => (
    <Flex height="93vh" direction="column">
      <Box overflow="scroll">{page}</Box>
      <Spacer />
      <Box>
        <PlaybackPanel />
      </Box>
    </Flex>
  );

  const recordView = withPlaybackLayout(<RecordView />);

  const calendarView = withPlaybackLayout(<CalendarView />);

  const loginView = (
    <Box height="93vh">
      <LoginView />
    </Box>
  );

  const createUserView = (
    <Box height="93vh">
      <CreateUserView />
    </Box>
  );

  return (
    <>
      <Box bg="red.400" height="7vh">
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

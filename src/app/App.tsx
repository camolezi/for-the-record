import { Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import AppHeader from '../components/Header/AppHeader';
import { OnlyLoggedIn } from '../modules/Authentication/OnlyLoggedIn';
import PlaybackPanel from '../modules/Playback/PlaybackPanel';
import CalendarView from '../views/CalendarView';
import CreateUserView from '../views/CreateUserView';
import LoginView from '../views/LoginView';
import RecordView from '../views/RecordView';
import LoadInitialState from './LoadInitialState/LoadInitialStateHook';

function App(): JSX.Element {
  LoadInitialState();

  const WithPlaybackLayout = ({ children }: { children: React.ReactNode }) => (
    <Flex height="93vh" direction="column">
      <Box overflow="scroll">{children}</Box>
      <Spacer />
      <Box>
        <PlaybackPanel />
      </Box>
    </Flex>
  );

  const recordView = (
    <OnlyLoggedIn>
      <WithPlaybackLayout>
        <RecordView />
      </WithPlaybackLayout>
    </OnlyLoggedIn>
  );

  const calendarView = (
    <WithPlaybackLayout>
      <CalendarView />
    </WithPlaybackLayout>
  );

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
      <Box as="nav" height="7vh">
        <AppHeader />
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

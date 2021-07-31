import { Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import AppHeader from '../components/Header/AppHeader';
import { OnlyLoggedIn } from '../modules/Authentication/OnlyLoggedIn';
import PlaybackPanel from '../modules/Playback/PlaybackPanel';
import CalendarView from '../views/CalendarView';
import CreateUserView from '../views/CreateUserView';
import LoginView from '../views/LoginView';
import OptionsView from '../views/OptionsView';
import RecordView from '../views/RecordView';
import LoadInitialState from './LoadInitialState/LoadInitialStateHook';
import WithInitialPageSkeleton from './LoadInitialState/WithInitialPageSkeleton';

function App(): JSX.Element {
  LoadInitialState();

  const WithPlaybackLayout = ({ children }: { children: React.ReactNode }) => (
    <Flex height="93vh" direction="column">
      <Box overflow="auto">{children}</Box>
      <Spacer />
      <Box>
        <PlaybackPanel />
      </Box>
    </Flex>
  );

  const recordView = (
    <WithInitialPageSkeleton>
      <OnlyLoggedIn>
        <WithPlaybackLayout>
          <RecordView />
        </WithPlaybackLayout>
      </OnlyLoggedIn>
    </WithInitialPageSkeleton>
  );

  const otionsView = (
    <WithInitialPageSkeleton>
      <OnlyLoggedIn>
        <WithPlaybackLayout>
          <OptionsView />
        </WithPlaybackLayout>
      </OnlyLoggedIn>
    </WithInitialPageSkeleton>
  );

  const calendarView = (
    <WithPlaybackLayout>
      <CalendarView />
    </WithPlaybackLayout>
  );

  const loginView = (
    <WithInitialPageSkeleton>
      <Box height="93vh">
        <LoginView />
      </Box>
    </WithInitialPageSkeleton>
  );

  const createUserView = (
    <WithInitialPageSkeleton>
      <Box height="93vh">
        <CreateUserView />
      </Box>
    </WithInitialPageSkeleton>
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
        <Route path="options" element={otionsView} />
      </Routes>
    </>
  );
}

export default App;

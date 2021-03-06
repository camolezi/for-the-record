import { Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Div100vh from 'react-div-100vh';
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

  const navBarHeight = ['10%', '10%', '7%'];

  const contentHeight = navBarHeight
    .map((value) => 100 - Number(value.replace('%', '')))
    .map((value) => `${String(value)}%`);

  const WithPlaybackLayout = ({ children }: { children: React.ReactNode }) => (
    <Flex height={contentHeight} direction="column">
      <Box overflow="auto">{children}</Box>
      <Spacer />
      <Box>
        <PlaybackPanel />
      </Box>
    </Flex>
  );

  const LoggedInPage = ({ children }: { children: React.ReactNode }) => (
    <WithInitialPageSkeleton>
      <OnlyLoggedIn>
        <WithPlaybackLayout>{children}</WithPlaybackLayout>
      </OnlyLoggedIn>
    </WithInitialPageSkeleton>
  );

  const recordView = (
    <LoggedInPage>
      <RecordView />
    </LoggedInPage>
  );

  const optionsView = (
    <LoggedInPage>
      <OptionsView />
    </LoggedInPage>
  );

  const calendarView = (
    <LoggedInPage>
      <CalendarView />
    </LoggedInPage>
  );

  const loginView = (
    <WithInitialPageSkeleton>
      <Box height={contentHeight}>
        <LoginView />
      </Box>
    </WithInitialPageSkeleton>
  );

  const createUserView = (
    <WithInitialPageSkeleton>
      <Box height={contentHeight}>
        <CreateUserView />
      </Box>
    </WithInitialPageSkeleton>
  );

  return (
    <Div100vh style={{ overflow: 'hidden' }}>
      <Box as="nav" height={navBarHeight}>
        <OnlyLoggedIn redirect={false}>
          <AppHeader />
        </OnlyLoggedIn>
      </Box>

      <Routes>
        <Route path="/*" element={recordView} />
        <Route path="calendar" element={calendarView} />
        <Route path="login" element={loginView} />
        <Route path="create" element={createUserView} />
        <Route path="options" element={optionsView} />
      </Routes>
    </Div100vh>
  );
}

export default App;

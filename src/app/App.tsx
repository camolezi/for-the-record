import { Box } from '@chakra-ui/react';
import React from 'react';
import ColorModeButton from '../components/ColorModeButton';
import RecordView from '../views/RecordView';

function App(): JSX.Element {
  return (
    <>
      <Box height="15vh">
        <ColorModeButton />
      </Box>

      <Box height="80vh">
        <RecordView />
      </Box>
    </>
  );
}

export default App;

import React from 'react';
import { Container, useColorModeValue } from '@chakra-ui/react';
import RecordPanel from '../modules/Recording/RecordPanel';
import PlaybackPanel from '../modules/Playback/PlaybackPanel';

function RecordView(): JSX.Element {
  const bgColor = useColorModeValue('grey.400', 'grey.700');
  return (
    <Container maxW="container.xl" bg={bgColor} centerContent>
      <RecordPanel />
      <PlaybackPanel />
    </Container>
  );
}

export default RecordView;

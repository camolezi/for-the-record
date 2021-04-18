import React, { useEffect } from 'react';
import { Container, useColorModeValue } from '@chakra-ui/react';
import RecordPanel from '../modules/Recording/RecordPanel';
import PlaybackPanel from '../modules/Playback/PlaybackPanel';
import { useTypedDispatch } from '../app/Store';
import { askForMicrophonePermission } from '../modules/Recording/RecordActions';

function RecordView(): JSX.Element {
  const bgColor = useColorModeValue('grey.400', 'grey.700');
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(askForMicrophonePermission());
  }, [dispatch]);

  return (
    <Container maxW="container.xl" bg={bgColor} centerContent>
      <RecordPanel />
      <PlaybackPanel />
    </Container>
  );
}

export default RecordView;

import React, { useEffect } from 'react';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import RecordPanel from '../modules/Recording/RecordPanel';
import PlaybackPanel from '../modules/Playback/PlaybackPanel';
import { useTypedDispatch } from '../app/Store';
import { askForMicrophonePermission } from '../modules/Recording/RecordActions';

function RecordView(): JSX.Element {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(askForMicrophonePermission());
  }, [dispatch]);

  return (
    <Container
      maxW="container.xl"
      centerContent
      height={['90vh', '80vh', '60vh']}
    >
      <Flex height="100%" direction="column">
        <RecordPanel />
        <Spacer />
        <PlaybackPanel />
      </Flex>
    </Container>
  );
}

export default RecordView;

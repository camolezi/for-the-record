import React, { useEffect } from 'react';
import { Container, Flex, Spacer } from '@chakra-ui/react';

import RecordPanel from '../modules/Recording/RecordPanel';
import { useTypedDispatch } from '../app/Store';
import { askForMicrophonePermission } from '../modules/Recording/RecordActions';

function RecordView(): JSX.Element {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(askForMicrophonePermission());
  }, [dispatch]);

  return (
    <Container overflow="hidden" maxW="container.xl" centerContent>
      <RecordPanel />
    </Container>
  );
}

export default RecordView;

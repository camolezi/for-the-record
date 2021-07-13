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
    <Container maxW="container.xl" centerContent height={['90%', '80%', '60%']}>
      <Flex height="100%" direction="column">
        <RecordPanel />
        <Spacer />
      </Flex>
    </Container>
  );
}

export default RecordView;

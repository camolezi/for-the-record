import React, { useEffect } from 'react';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import RecordPanel from '../modules/Recording/RecordPanel';
import { useTypedDispatch, useTypedSelector } from '../app/Store';
import { askForMicrophonePermission } from '../modules/Recording/RecordActions';
import { selectIsUserLoggedIn } from '../modules/Authentication/state/UserSelectors';
import { AsyncActionStatus } from '../utils/ReduxUtils/AsyncActionHelpers';

function RecordView(): JSX.Element {
  const dispatch = useTypedDispatch();
  const isUsedloggedIn = useTypedSelector(selectIsUserLoggedIn);

  useEffect(() => {
    if (isUsedloggedIn === AsyncActionStatus.Completed)
      dispatch(askForMicrophonePermission());
  }, [dispatch, isUsedloggedIn]);

  return (
    <Container maxW="container.xl" centerContent height={['90%', '80%', '60%']}>
      {isUsedloggedIn === AsyncActionStatus.Completed ? (
        <Flex height="100%" direction="column">
          <RecordPanel />
          <Spacer />
        </Flex>
      ) : (
        <h1>
          Not logged in <Link to="/login">Log in here</Link>
        </h1>
      )}
    </Container>
  );
}

export default RecordView;

import React from 'react';
import { Container } from '@chakra-ui/react';

import UserCreationForm from '../modules/Authentication/UserCreation/UserCreationForm';
import UserCreationResult from '../modules/Authentication/UserCreation/UserCreationResult';
import { selectIsUserCreated } from '../modules/Authentication/state/UserSelectors';
import { useTypedSelector } from '../app/Store';
import { AsyncActionStatus } from '../utils/ReduxUtils/AsyncActionHelpers';

function CreateUserView(): JSX.Element {
  const isUserCreated = useTypedSelector(selectIsUserCreated);
  return (
    <Container maxW="container.sm">
      {isUserCreated === AsyncActionStatus.NotStarted && <UserCreationForm />}
      {isUserCreated !== AsyncActionStatus.NotStarted && (
        <UserCreationResult isUserCreated={isUserCreated} />
      )}
    </Container>
  );
}

export default CreateUserView;

import React from 'react';
import { Container } from '@chakra-ui/react';

import UserCreationForm from '../modules/Authentication/UserCreation/UserCreationForm';

import { selectIsUserCreated } from '../modules/Authentication/state/UserSelectors';
import { useTypedSelector } from '../app/Store';
import { AsyncActionStatus } from '../utils/ReduxUtils/AsyncActionHelpers';
import RenderAsyncActions from '../utils/ReduxUtils/RenderAsyncActions';

function CreateUserView(): JSX.Element {
  const isUserCreated = useTypedSelector(selectIsUserCreated);
  return (
    <Container maxW="container.sm">
      <RenderAsyncActions
        actionStatus={isUserCreated}
        statusMap={{
          [AsyncActionStatus.NotStarted]: <UserCreationForm />,
          [AsyncActionStatus.Completed]: <h1>Successfully Created</h1>,
          [AsyncActionStatus.Rejected]: <h1>Failed to create user</h1>,
          [AsyncActionStatus.Pending]: <h1>Pending</h1>,
        }}
      />
    </Container>
  );
}

export default CreateUserView;

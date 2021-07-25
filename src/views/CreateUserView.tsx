import React from 'react';
import { Container, Heading, SlideFade } from '@chakra-ui/react';

import { Navigate } from 'react-router-dom';
import UserCreationForm from '../modules/Authentication/UserCreation/UserCreationForm';

import { selectIsUserCreated } from '../modules/Authentication/state/UserSelectors';
import { useTypedSelector } from '../app/Store';
import { AsyncActionStatus } from '../utils/ReduxUtils/AsyncActionHelpers';
import RenderAsyncActions from '../utils/ReduxUtils/RenderAsyncActions';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

function CreateUserView(): JSX.Element {
  const isUserCreated = useTypedSelector(selectIsUserCreated);

  const failedErrorMessage = (
    <SlideFade in offsetY="-50px">
      <Heading
        py={10}
        as="h6"
        size="xs"
        pb={5}
        color="red.300"
        textAlign="center"
      >
        Failed to create user :(. Please reload and try again.
      </Heading>
    </SlideFade>
  );

  return (
    <Container maxW="container.sm">
      <RenderAsyncActions
        actionStatus={isUserCreated}
        statusMap={{
          [AsyncActionStatus.NotStarted]: <UserCreationForm />,
          [AsyncActionStatus.Completed]: <Navigate to="/" replace />,
          [AsyncActionStatus.Rejected]: failedErrorMessage,
          [AsyncActionStatus.Pending]: <LoadingSpinner />,
        }}
      />
    </Container>
  );
}

export default CreateUserView;

import React from 'react';
import {
  Center,
  Container,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import UserLoginForms from '../modules/Authentication/UserLogin/UserLoginForms';
import { useTypedSelector } from '../app/Store';
import RenderAsyncActions from '../utils/ReduxUtils/RenderAsyncActions';
import {
  selectIsUserCreated,
  selectIsUserLoggedIn,
} from '../modules/Authentication/state/UserSelectors';
import { AsyncActionStatus } from '../utils/ReduxUtils/AsyncActionHelpers';

function LoginView(): JSX.Element {
  const isUsedloggedIn = useTypedSelector(selectIsUserLoggedIn);
  const isUserCreated = useTypedSelector(selectIsUserCreated);

  return (
    <Container maxW="container.sm">
      {isUserCreated === AsyncActionStatus.Completed ? (
        <RenderAsyncActions
          actionStatus={isUsedloggedIn}
          statusMap={{
            [AsyncActionStatus.NotStarted]: <UserLoginForms />,
            [AsyncActionStatus.Completed]: <Navigate to="/" replace />,
            [AsyncActionStatus.Rejected]: <h1>Incorrect Password</h1>,
            [AsyncActionStatus.Pending]: <h1>Pending</h1>,
          }}
        />
      ) : (
        <Center textAlign="center">
          <Heading as="h2" size="lg">
            Don&apos;t have a user?{'  '}
            <ChakraLink as="h2">
              <Link to="/create"> How about creating a new user?</Link>
            </ChakraLink>
          </Heading>
        </Center>
      )}
    </Container>
  );
}

export default LoginView;

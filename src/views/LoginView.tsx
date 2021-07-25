import React from 'react';
import {
  Center,
  Container,
  Heading,
  Link as ChakraLink,
  SlideFade,
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
import LoadingSpinner from '../components/Loading/LoadingSpinner';

function LoginView(): JSX.Element {
  const isUsedloggedIn = useTypedSelector(selectIsUserLoggedIn);
  const isUserCreated = useTypedSelector(selectIsUserCreated);

  const withIncorrectPassword = (children: React.ReactNode) => (
    <>
      <SlideFade in offsetY="-50px">
        <Heading as="h6" size="xs" pb={5} color="red.300">
          Incorrect Password
        </Heading>
        {children}
      </SlideFade>
    </>
  );

  const userLoginForm = (
    <RenderAsyncActions
      actionStatus={isUsedloggedIn}
      statusMap={{
        [AsyncActionStatus.NotStarted]: <UserLoginForms />,
        [AsyncActionStatus.Completed]: <Navigate to="/" replace />,
        [AsyncActionStatus.Rejected]: withIncorrectPassword(<UserLoginForms />),
        [AsyncActionStatus.Pending]: <LoadingSpinner />,
      }}
    />
  );

  return (
    <Container maxW="container.sm" mt={5}>
      {isUserCreated === AsyncActionStatus.Completed ? (
        userLoginForm
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

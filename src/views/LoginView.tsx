import React from 'react';
import {
  Center,
  Container,
  Divider,
  Heading,
  Link as ChakraLink,
  SlideFade,
  Text,
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
import MotionBox from '../components/Motion/MotionBox';

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

  return isUserCreated === AsyncActionStatus.Completed ? (
    <Container maxW="container.sm" mt={5}>
      {userLoginForm}
    </Container>
  ) : (
    <Container maxW="container.lg" mt={5}>
      <Center flexDirection="column" textAlign="center">
        <SlideFade in offsetY="-10em">
          <Heading as="h2" size="lg">
            Oh no, it seems like you don&apos;t have a local account! 🙈{' '}
            <MotionBox
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.8 }}
            >
              <ChakraLink mt={3} as="h2">
                <Link to="/create"> How about creating a new user? ✈️</Link>
              </ChakraLink>
            </MotionBox>
          </Heading>
          <Divider my={5} orientation="horizontal" />

          <Text my={3}>
            We don&apos;t use servers to store your credentials and data, all
            your information is stored locally 💾.
          </Text>

          <Text>
            Your password is used for authentication and to encrypt your data
            🔒.
          </Text>
        </SlideFade>
      </Center>
    </Container>
  );
}

export default LoginView;

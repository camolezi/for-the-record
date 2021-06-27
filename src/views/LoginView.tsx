import React from 'react';
import { Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
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
            [AsyncActionStatus.Completed]: <h1>Successfully Logged In :)</h1>,
            [AsyncActionStatus.Rejected]: <h1>Incorrect Password</h1>,
            [AsyncActionStatus.Pending]: <h1>Pending</h1>,
          }}
        />
      ) : (
        <h1>
          Don&apos;t have a user?{' '}
          <Link to="/create">How about creating a new user?</Link>
        </h1>
      )}
    </Container>
  );
}

export default LoginView;

import React from 'react';
import { Container } from '@chakra-ui/react';
import UserLoginForms from '../modules/Authentication/UserLogin/UserLoginForms';
import UserLoginResult from '../modules/Authentication/UserLogin/UserLoginResult';
import { useTypedSelector } from '../app/Store';
import RenderAsyncActions from '../utils/ReduxUtils/RenderAsyncActions';
import { selectIsUserLoggedIn } from '../modules/Authentication/state/UserSelectors';
import { AsyncActionStatus } from '../utils/ReduxUtils/AsyncActionHelpers';

function LoginView(): JSX.Element {
  const isUserCreated = useTypedSelector(selectIsUserLoggedIn);
  return (
    <Container maxW="container.sm">
      <RenderAsyncActions
        actionStatus={isUserCreated}
        statusMap={{
          [AsyncActionStatus.NotStarted]: <UserLoginForms />,
          [AsyncActionStatus.Completed]: (
            <UserLoginResult logInStatus={isUserCreated} />
          ),
          [AsyncActionStatus.Rejected]: <h1>Incorrect Password</h1>,
        }}
      />
    </Container>
  );
}

export default LoginView;

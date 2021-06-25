import React from 'react';
import { AsyncActionStatus } from '../../../utils/ReduxUtils/AsyncActionHelpers';

function UserLoginResult({
  logInStatus,
}: {
  logInStatus: AsyncActionStatus;
}): JSX.Element {
  return (
    <>
      {logInStatus === AsyncActionStatus.Completed && (
        <h1>Successfully Logged In :)</h1>
      )}
      {logInStatus === AsyncActionStatus.Pending && <h1>Pending</h1>}
    </>
  );
}

export default UserLoginResult;

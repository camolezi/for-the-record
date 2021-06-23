import React from 'react';
import { AsyncActionStatus } from '../../../utils/ReduxUtils/AsyncActionHelpers';

function UserCreationResult({
  isUserCreated,
}: {
  isUserCreated: AsyncActionStatus;
}): JSX.Element {
  return (
    <>
      {isUserCreated === AsyncActionStatus.Completed && (
        <h1>Successfully Created</h1>
      )}
      {isUserCreated === AsyncActionStatus.Pending && <h1>Pending</h1>}
    </>
  );
}

export default UserCreationResult;

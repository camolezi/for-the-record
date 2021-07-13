import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../app/Store';
import { AsyncActionStatus } from '../../utils/ReduxUtils/AsyncActionHelpers';
import { selectIsUserLoggedIn } from './state/UserSelectors';

export function OnlyLoggedIn({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const isUsedloggedIn = useTypedSelector(selectIsUserLoggedIn);

  return (
    <>
      {isUsedloggedIn === AsyncActionStatus.Completed ? (
        children
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

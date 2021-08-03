import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../app/Store';
import { AsyncActionStatus } from '../../utils/ReduxUtils/AsyncActionHelpers';
import { selectIsUserLoggedIn } from './state/UserSelectors';

export function OnlyLoggedIn({
  children,
  redirect = true,
}: {
  redirect?: boolean;
  children: React.ReactNode;
}): JSX.Element {
  const isUsedloggedIn = useTypedSelector(selectIsUserLoggedIn);

  return (
    <>
      {isUsedloggedIn === AsyncActionStatus.Completed
        ? children
        : redirect && <Navigate to="/login" replace />}
    </>
  );
}

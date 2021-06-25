import React from 'react';
import { AsyncActionStatus } from './AsyncActionHelpers';

export interface RenderAsyncActionsProps {
  actionStatus: AsyncActionStatus;
  statusMap: { [key in AsyncActionStatus]?: React.ReactNode };
}

function RenderAsyncActions({
  actionStatus,
  statusMap,
}: RenderAsyncActionsProps): JSX.Element {
  const toRender = statusMap[actionStatus];
  return <>{toRender}</>;
}

export default RenderAsyncActions;

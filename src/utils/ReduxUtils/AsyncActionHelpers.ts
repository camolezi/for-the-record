/* eslint-disable no-param-reassign */
import {
  ActionReducerMapBuilder,
  AnyAction,
  AsyncThunk,
} from '@reduxjs/toolkit';

export enum AsyncActionStatus {
  Completed,
  Pending,
  NotStarted,
  Rejected,
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

export function isFulfilledAction(
  action: AnyAction
): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

export function addPendingMatcher(
  fieldInSlice: string,
  actionName: string
): [
  (action: AnyAction) => action is PendingAction,
  (state: any, action: PendingAction) => void
] {
  return [
    isPendingAction,
    (state, action) => {
      if (action.type.includes(actionName) && state && state[fieldInSlice]) {
        state[fieldInSlice] = AsyncActionStatus.Pending;
      }
    },
  ];
}

export function addRejectedMatcher(
  fieldInSlice: string,
  actionName: string
): [
  (action: AnyAction) => action is RejectedAction,
  (state: any, action: RejectedAction) => void
] {
  return [
    isRejectedAction,
    (state, action) => {
      if (action.type.includes(actionName) && state && state[fieldInSlice]) {
        state[fieldInSlice] = AsyncActionStatus.Rejected;
      }
    },
  ];
}

export function addFulfilledMatcher(
  fieldInSlice: string,
  actionName: string
): [
  (action: AnyAction) => action is FulfilledAction,
  (state: any, action: FulfilledAction) => void
] {
  return [
    isFulfilledAction,
    (state, action) => {
      if (action.type.includes(actionName) && state && state[fieldInSlice]) {
        state[fieldInSlice] = AsyncActionStatus.Completed;
        if (typeof action.payload === 'boolean')
          if (action.payload === false)
            state[fieldInSlice] = AsyncActionStatus.Rejected;
      }
    },
  ];
}

export function addDefaultAsyncMatcher(
  builder: ActionReducerMapBuilder<unknown>,
  fieldInSlice: string,
  actionName: string
): void {
  builder
    .addMatcher(...addPendingMatcher(fieldInSlice, actionName))
    .addMatcher(...addFulfilledMatcher(fieldInSlice, actionName))
    .addMatcher(...addRejectedMatcher(fieldInSlice, actionName));
}

/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  addDefaultAsyncMatcher,
  AsyncActionStatus,
} from '../../../utils/ReduxUtils/AsyncActionHelpers';

import { UserState } from './UserTypes';

export const InitialUserState: UserState = {
  isLoggedIn: AsyncActionStatus.NotStarted,
  isUserCreated: AsyncActionStatus.NotStarted,
  name: '',
};

const UserSlice = createReducer(InitialUserState, (builder) => {
  addDefaultAsyncMatcher(builder, 'isLoggedIn', 'loginUser');
  addDefaultAsyncMatcher(builder, 'isUserCreated', 'createNewUser');
});

export default UserSlice;

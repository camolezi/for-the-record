/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  addDefaultAsyncMatcher,
  AsyncActionStatus,
} from '../../../utils/ReduxUtils/AsyncActionHelpers';

import { loginUser } from '../actions/UserActions';

import { UserState } from './UserTypes';

export const InitialUserState: UserState = {
  isLoggedIn: false,
  isUserCreated: AsyncActionStatus.NotStarted,
  name: '',
};

const UserSlice = createReducer(InitialUserState, (builder) => {
  builder.addCase(loginUser.fulfilled, (state, action) => {
    state.isLoggedIn = action.payload;
  });
  addDefaultAsyncMatcher(builder, 'isUserCreated');
});

export default UserSlice;

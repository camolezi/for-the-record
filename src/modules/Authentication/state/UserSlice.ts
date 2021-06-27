/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { loadInitialUserState } from '../../../app/LoadInitialState/LoadInitialStateActions';
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
  builder.addCase(
    loadInitialUserState.fulfilled,
    (state, action): UserState => {
      const initialState = action.payload;
      if (initialState) return initialState;
      return state;
    }
  );
  addDefaultAsyncMatcher(builder, 'isLoggedIn', 'loginUser');
  addDefaultAsyncMatcher(builder, 'isUserCreated', 'createNewUser');
});

export default UserSlice;

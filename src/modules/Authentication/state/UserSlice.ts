/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { createNewUser, loginUser } from '../actions/UserActions';

import { UserState } from './UserTypes';

export const InitialUserState: UserState = {
  isLoggedIn: false,
  isUserCreated: false,
  name: '',
};

const UserSlice = createReducer(InitialUserState, (builder) =>
  builder
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload;
    })
    .addCase(createNewUser.fulfilled, (state, action) => {
      state.isUserCreated = action.payload;
    })
);

export default UserSlice;

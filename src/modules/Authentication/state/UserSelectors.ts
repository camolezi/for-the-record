import { AppState } from '../../../app/Store';

export const selectIsUserCreated = (state: AppState) =>
  state.user.isUserCreated;

export const selectIsUserLoggedIn = (state: AppState) => state.user.isLoggedIn;

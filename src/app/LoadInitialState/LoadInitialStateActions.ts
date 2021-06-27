import { createAsyncThunk } from '@reduxjs/toolkit';
import authSession from '../../modules/Authentication/AuthSession';
import { UserState } from '../../modules/Authentication/state/UserTypes';
import { userdb } from '../../modules/Db/Databases';
import { AsyncActionStatus } from '../../utils/ReduxUtils/AsyncActionHelpers';
import { AddToCypressWindow } from '../../utils/testing/CypressUtils';

export const loadInitialUserState = createAsyncThunk<UserState | null>(
  'user/loadInitialState',
  async () => {
    const userJust = await userdb.getUser().run();
    const user = userJust.extract();
    const isLoggedIn = authSession.isAuthenticated();

    if (user) {
      return {
        isLoggedIn: isLoggedIn
          ? AsyncActionStatus.Completed
          : AsyncActionStatus.NotStarted,
        isUserCreated: AsyncActionStatus.Completed,
        name: user.name,
      };
    }

    return null;
  }
);

AddToCypressWindow('loadInitialUserState', loadInitialUserState);

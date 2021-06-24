import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddToCypressWindow } from '../../../utils/testing/CypressUtils';
import authSession from '../AuthSession';

export const createNewUser = createAsyncThunk<
  boolean,
  { name: string; password: string }
>('user/createNewUser', async ({ name, password }) => {
  const result = await authSession.createNewUser(name, password);
  if (result) return true;
  return false;
});

AddToCypressWindow('createNewUser', createNewUser);

export const loginUser = createAsyncThunk<boolean, string>(
  'user/loginUser',
  async (password) => {
    const result = await authSession.authenticate(password);
    return result;
  }
);

AddToCypressWindow('loginUser', loginUser);

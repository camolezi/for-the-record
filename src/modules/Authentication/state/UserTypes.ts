import { AsyncActionStatus } from '../../../utils/ReduxUtils/AsyncActionHelpers';

export interface UserState {
  isLoggedIn: AsyncActionStatus;
  name: string;
  isUserCreated: AsyncActionStatus;
}

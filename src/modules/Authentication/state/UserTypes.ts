import { AsyncActionStatus } from '../../../utils/ReduxUtils/AsyncActionHelpers';

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  isUserCreated: AsyncActionStatus;
}

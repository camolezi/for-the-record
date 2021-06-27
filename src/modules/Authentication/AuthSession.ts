import { AddToCypressWindow } from '../../utils/testing/CypressUtils';
import { CryptoKeyToStr } from '../Crypto/Authenticate';
import { userdb } from '../Db/Databases';
import { User } from '../Db/types';
import UserDb from '../Db/UserDb';
import { AuthenticateUser, CreateNewUser } from './Login';

export class AuthSession {
  private storage: Storage;

  private users: UserDb;

  private readonly authInfo = 'authInfo';

  constructor(storage: Storage, users: UserDb) {
    this.storage = storage;
    this.users = users;
  }

  private getAuthSession() {
    return this.storage.getItem(this.authInfo);
  }

  private setAuthSession(sessionInfo: string) {
    this.storage.setItem(this.authInfo, sessionInfo);
  }

  isAuthenticated(): boolean {
    return this.getAuthSession() !== null;
  }

  // getUserKey(): MaybeAsync<CryptoKey> {
  // //  return this.getAuthSession();
  // // TODO create function to convert string to crypto key
  // }

  authenticate(password: string): Promise<boolean> {
    return this.users
      .getUser()
      .chain((user) => AuthenticateUser(user, password))
      .chain(CryptoKeyToStr)
      .ifJust((key) => this.setAuthSession(key))
      .run()
      .then((result) => result.isJust());
  }

  createNewUser(name: string, password: string): Promise<User | null> {
    return CreateNewUser(name, password)
      .chain((user) => this.users.createUser(user))
      .run()
      .then((maybe) => maybe.extractNullable());
  }
}

const authSession = new AuthSession(window.sessionStorage, userdb);
AddToCypressWindow('authSession', authSession);

export default authSession;

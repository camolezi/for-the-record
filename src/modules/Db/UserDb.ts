import { MaybeAsync } from 'purify-ts/MaybeAsync';
import { getFirst } from '../../utils/FunctionalUtils';
import LocalDatabase from './LocalDatabase';
import { User } from './types';

export default class UserDb {
  private readonly database: LocalDatabase;

  constructor(database: LocalDatabase) {
    this.database = database;
  }

  clearUser(): MaybeAsync<number> {
    return MaybeAsync(() => this.database.user.toCollection().delete());
  }

  getUser(): MaybeAsync<User> {
    return MaybeAsync(() => this.database.user.toArray()).chain(getFirst);
  }

  createUser(user: User): MaybeAsync<User> {
    return MaybeAsync(() => this.database.user.add(user)).chain(() =>
      this.getUser()
    );
  }
}

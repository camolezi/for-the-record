import Dexie from 'dexie';
import { AudioEntry, User } from './types';

export default class LocalDatabase extends Dexie {
  readonly audioEntries: Dexie.Table<AudioEntry, Date>;

  readonly user: Dexie.Table<User, string>;

  constructor() {
    super('LocalDatabase');

    this.version(1).stores({
      audioEntries: 'date,description',
      user: 'name',
    });

    this.user = this.table('user');
    this.audioEntries = this.table('audioEntries');
  }
}

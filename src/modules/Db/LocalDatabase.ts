import Dexie from 'dexie';
import { AudioData, AudioEntryHeader, User } from './types';

export default class LocalDatabase extends Dexie {
  readonly audioEntries: Dexie.Table<AudioEntryHeader, Date>;

  readonly audioData: Dexie.Table<AudioData, Date>;

  readonly user: Dexie.Table<User, string>;

  constructor() {
    super('LocalDatabase');

    this.version(1).stores({
      audioEntries: 'date,description',
      user: 'name',
      audioData: 'date',
    });

    this.user = this.table('user');
    this.audioEntries = this.table('audioEntries');
    this.audioData = this.table('audioData');
  }
}

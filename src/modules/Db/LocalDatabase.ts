import Dexie from 'dexie';

export interface AudioEntry {
  date: Date;
  description: string;
  length: number;
  audio: Blob;
}

export interface User {
  name: string;
  hashPassword: string;
}

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

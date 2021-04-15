import Dexie from 'dexie';

export interface AudioEntry {
  date: Date;
  description: string;
  length: number;
  audio: Blob;
}

export default class AudioDatabase extends Dexie {
  readonly audioEntries: Dexie.Table<AudioEntry, Date>;

  constructor() {
    super('AudioDatabase');

    this.version(1).stores({
      audioEntries: 'date,description',
    });

    this.audioEntries = this.table('audioEntries');
  }
}

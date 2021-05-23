import LocalDatabase from './LocalDatabase';
import { AudioEntry } from './types';

export default class AudioEntriesDb {
  private readonly database: LocalDatabase;

  constructor(database: LocalDatabase) {
    this.database = database;
  }

  addEntry(entry: AudioEntry): Promise<Date> {
    return this.database.audioEntries.add(entry, entry.date);
  }

  getEntry(description: string): Promise<AudioEntry[]> {
    return this.database.audioEntries
      .where('description')
      .equalsIgnoreCase(description)
      .toArray();
  }
}

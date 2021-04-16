import AudioDatabase, { AudioEntry } from './AudioDatabase';

export class AudioEntries {
  private readonly database: AudioDatabase;

  constructor(database: AudioDatabase) {
    this.database = database;

    this.database.open();
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

const audioEntries = new AudioEntries(new AudioDatabase());
export default audioEntries;

import {
  getEndMonthDay,
  getFirstMonthDay,
} from '../../utils/DateTime/WeekDays';
import LocalDatabase from './LocalDatabase';
import { AudioEntry } from './types';

export default class AudioEntriesDb {
  private readonly database: LocalDatabase;

  constructor(database: LocalDatabase) {
    this.database = database;
  }

  clearAllEntries(): Promise<void> {
    return this.database.audioEntries.clear();
  }

  addEntry(entry: AudioEntry): Promise<Date> {
    return this.database.audioEntries.add(entry, entry.date);
  }

  getEntryByDescription(description: string): Promise<AudioEntry[]> {
    return this.database.audioEntries
      .where('description')
      .equalsIgnoreCase(description)
      .toArray();
  }

  getEntry(date: Date): Promise<AudioEntry | undefined> {
    return this.database.audioEntries.get(date);
  }

  getAllEntriesDates(): Promise<Date[]> {
    return this.database.audioEntries.toCollection().primaryKeys();
  }

  getMonthEntries(monthDate: Date): Promise<Date[]> {
    return this.database.audioEntries
      .where('date')
      .between(getFirstMonthDay(monthDate), getEndMonthDay(monthDate))
      .primaryKeys();
  }
}

import {
  getEndMonthDay,
  getEndOfDay,
  getFirstMonthDay,
  getStartOfDay,
} from '../../utils/DateTime/WeekDays';
import LocalDatabase from './LocalDatabase';
import { AudioEntry, AudioEntryHeader } from './types';

export default class AudioEntriesDb {
  private readonly database: LocalDatabase;

  constructor(database: LocalDatabase) {
    this.database = database;
  }

  async clearAllEntries(): Promise<void> {
    return this.database.audioEntries
      .clear()
      .then(() => this.database.audioData.clear());
  }

  addEntry(header: AudioEntry): Promise<Date> {
    return this.database.audioEntries
      .add({
        date: header.date,
        description: header.description,
        length: header.length,
      })
      .then(() =>
        this.database.audioData.add({ date: header.date, audio: header.audio })
      );
  }

  getEntryHeaderByDescription(
    description: string
  ): Promise<AudioEntryHeader[]> {
    return this.database.audioEntries
      .where('description')
      .equalsIgnoreCase(description)
      .toArray();
  }

  async getEntry(date: Date): Promise<AudioEntry | undefined> {
    const header = await this.database.audioEntries.get(date);
    const data = await this.database.audioData.get(date);
    if (header && data) return { ...header, ...data };
    return undefined;
  }

  getAllEntriesDates(): Promise<Date[]> {
    return this.database.audioEntries.toCollection().primaryKeys();
  }

  getMonthEntriesHeader(monthDate: Date): Promise<AudioEntryHeader[]> {
    return this.database.audioEntries
      .where('date')
      .between(getFirstMonthDay(monthDate), getEndMonthDay(monthDate))
      .toArray();
  }

  getDayEntriesHeader(day: Date): Promise<AudioEntryHeader[]> {
    return this.database.audioEntries
      .where('date')
      .between(getStartOfDay(day), getEndOfDay(day))
      .toArray();
  }
}

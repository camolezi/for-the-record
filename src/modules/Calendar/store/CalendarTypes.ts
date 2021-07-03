import { AudioEntryHeader } from '../../Db/types';

export interface CalendarState {
  selectedDay: number | null;
  recordings: Array<AudioEntryHeader>;
}

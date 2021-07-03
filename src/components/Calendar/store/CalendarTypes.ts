import { AudioEntryHeader } from '../../../modules/Db/types';

export interface CalendarState {
  selectedDay: number | null;
  recordings: Array<AudioEntryHeader>;
}

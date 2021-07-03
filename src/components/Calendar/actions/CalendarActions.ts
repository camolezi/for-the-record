import { createAsyncThunk } from '@reduxjs/toolkit';
import { audiodb } from '../../../modules/Db/Databases';
import { AudioEntryHeader } from '../../../modules/Db/types';

export const loadMonthRecordigns = createAsyncThunk<AudioEntryHeader[], Date>(
  'db/loadMonthRecordigns',
  (monthDate) => {
    return audiodb.getMonthEntriesHeader(monthDate);
  }
);

export const selectedDay = createAsyncThunk<number, number>(
  'db/selectedDay',
  (day) => {
    return day;
  }
);

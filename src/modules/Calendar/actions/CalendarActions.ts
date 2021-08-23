import { createAsyncThunk } from '@reduxjs/toolkit';
import { audiodb } from '../../Db/Databases';
import { AudioEntryHeader } from '../../Db/types';
import { createdAudioUrl } from '../../Playback/actions/PlaybackActions';

export const loadMonthRecordigns = createAsyncThunk<AudioEntryHeader[], Date>(
  'calendar/loadMonthRecordigns',
  async (monthDate) => {
    return audiodb.getMonthEntriesHeader(monthDate);
  }
);

export const selectedDay = createAsyncThunk(
  'calendar/selectedDay',
  (day: number) => {
    return day;
  }
);

export const loadAudioPlayback = createAsyncThunk(
  'calendar/loadAudioPlayback',
  async (date: Date, { dispatch }) => {
    const audioData = await audiodb.getEntry(date);
    if (audioData) dispatch(createdAudioUrl(audioData.audio));
  }
);
